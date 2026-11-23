import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { setImmediate } from 'node:timers/promises'
import { test } from 'node:test'
import ts from 'typescript'
import { createRenderer, shallowRef } from 'vue'

const source = await readFile(new URL('../.vitepress/theme/composables/useYouTubeBackground.ts', import.meta.url), 'utf8')
const compiled = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 },
}).outputText.replace("from 'vue'", `from ${JSON.stringify(import.meta.resolve('vue'))}`)
let moduleId = 0

// A host component runs real Vue mount/unmount hooks without a browser or SDK.
const { createApp } = createRenderer({
  createComment: () => ({}), insert() {}, remove() {},
  parentNode: () => null, nextSibling: () => null,
})

async function setup(t, { reducedMotion = false, apiLoaded = true } = {}) {
  const timers = new Map()
  t.mock.method(globalThis, 'setTimeout', (callback) => {
    const id = Symbol()
    timers.set(id, callback)
    return id
  })
  t.mock.method(globalThis, 'clearTimeout', (id) => { timers.delete(id) })
  const scripts = []
  const players = []
  class Player {
    constructor(iframe, { events }) {
      this.events = events
      this.playVideo = t.mock.fn()
      this.pauseVideo = t.mock.fn()
      this.mute = t.mock.fn()
      this.destroy = t.mock.fn()
      players.push(this)
    }
  }
  const window = {
    location: { origin: 'https://example.com' },
    matchMedia: () => ({ matches: reducedMotion }),
    YT: apiLoaded ? { Player } : undefined,
  }
  const document = {
    createElement: () => {
      const listeners = new Map()
      return {
        addEventListener: (name, callback) => listeners.set(name, callback),
        removeEventListener: (name) => listeners.delete(name),
        remove: t.mock.fn(),
        fail: () => listeners.get('error')?.(),
      }
    },
    head: { append: (script) => scripts.push(script) },
  }
  const oldWindow = Object.getOwnPropertyDescriptor(globalThis, 'window')
  const oldDocument = Object.getOwnPropertyDescriptor(globalThis, 'document')
  Object.defineProperty(globalThis, 'window', { configurable: true, value: window })
  Object.defineProperty(globalThis, 'document', { configurable: true, value: document })
  const apps = []
  t.after(() => {
    apps.forEach((app) => app.unmount())
    if (oldWindow) Object.defineProperty(globalThis, 'window', oldWindow)
    else delete globalThis.window
    if (oldDocument) Object.defineProperty(globalThis, 'document', oldDocument)
    else delete globalThis.document
  })
  const { useYouTubeBackground } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}#${moduleId++}`)
  function mount(videoId = 'test-video') {
    let state
    const app = createApp({
      setup() {
        state = useYouTubeBackground(videoId, shallowRef({}))
        return () => null
      },
    })
    app.mount({})
    apps.push(app)
    return { state, unmount: () => { app.unmount(); apps.splice(apps.indexOf(app), 1) } }
  }
  function expireTimers() {
    const pending = [...timers.entries()]
    for (const [id, callback] of pending) {
      if (timers.delete(id)) callback()
    }
  }
  return { mount, expireTimers, timers, scripts, players, window, Player }
}

test('plays muted video and toggles the same player without reloading', async (t) => {
  const { mount, players, timers } = await setup(t)
  const { state } = mount()
  await setImmediate()
  const [player] = players
  const url = state.videoUrl.value
  player.events.onReady({ target: player })
  assert.equal(player.mute.mock.callCount(), 1)
  assert.equal(player.playVideo.mock.callCount(), 1)
  assert.equal(state.isPlayerReady.value, true)
  assert.equal(timers.size, 0)
  player.events.onStateChange({ data: 1 })
  state.toggleVideo()
  assert.equal(player.pauseVideo.mock.callCount(), 1)
  player.events.onStateChange({ data: 2 })
  state.toggleVideo()
  assert.equal(player.playVideo.mock.callCount(), 2)
  assert.equal(state.videoUrl.value, url)
})

test('reduced motion disables autoplay but allows manual playback', async (t) => {
  const { mount, players } = await setup(t, { reducedMotion: true })
  const { state } = mount()
  await setImmediate()
  const [player] = players
  assert.equal(new URL(state.videoUrl.value).searchParams.get('autoplay'), '0')
  player.events.onReady({ target: player })
  assert.equal(player.playVideo.mock.callCount(), 0)
  state.toggleVideo()
  assert.equal(player.playVideo.mock.callCount(), 1)
})

test('a stalled API becomes unavailable and a subsequent visit can retry', async (t) => {
  const { mount, expireTimers, scripts, window, Player, players } = await setup(t, { apiLoaded: false })
  const previousReady = t.mock.fn()
  window.onYouTubeIframeAPIReady = previousReady
  const first = mount()
  await setImmediate()
  expireTimers()
  await setImmediate()
  assert.equal(first.state.hasPlayerError.value, true)
  assert.equal(first.state.videoUrl.value, undefined)
  assert.equal(scripts[0].remove.mock.callCount(), 1)
  assert.equal(window.onYouTubeIframeAPIReady, previousReady)
  first.unmount()
  const second = mount()
  await setImmediate()
  assert.equal(scripts.length, 2)
  window.YT = { Player }
  window.onYouTubeIframeAPIReady()
  await setImmediate()
  players[0].events.onReady({ target: players[0] })
  assert.equal(second.state.isPlayerReady.value, true)
  assert.equal(previousReady.mock.callCount(), 1)
})

test('script errors clear shared loading state for a retry', async (t) => {
  const { mount, scripts } = await setup(t, { apiLoaded: false })
  const first = mount()
  await setImmediate()
  scripts[0].fail()
  await setImmediate()
  assert.equal(first.state.hasPlayerError.value, true)
  first.unmount()
  mount()
  await setImmediate()
  assert.equal(scripts.length, 2)
})

test('an unresponsive iframe stops playback and ignores late ready events', async (t) => {
  const { mount, players, expireTimers } = await setup(t)
  const { state } = mount()
  await setImmediate()
  const [player] = players
  expireTimers()
  assert.equal(state.hasPlayerError.value, true)
  assert.equal(state.videoUrl.value, undefined)
  assert.equal(player.destroy.mock.callCount(), 1)
  player.events.onReady({ target: player })
  player.events.onStateChange({ data: 1 })
  assert.equal(state.isPlayerReady.value, false)
  assert.equal(state.isVideoPlaying.value, false)
  assert.equal(player.playVideo.mock.callCount(), 0)
})

test('navigation destroys the player and ignores queued SDK callbacks', async (t) => {
  const { mount, players, timers } = await setup(t)
  const { state, unmount } = mount()
  await setImmediate()
  const [player] = players
  unmount()
  assert.equal(player.destroy.mock.callCount(), 1)
  assert.equal(timers.size, 0)
  player.events.onReady({ target: player })
  player.events.onStateChange({ data: 1 })
  player.events.onError()
  assert.equal(player.playVideo.mock.callCount(), 0)
  assert.equal(state.isPlayerReady.value, false)
  assert.equal(state.isVideoPlaying.value, false)
  assert.equal(state.hasPlayerError.value, false)
})

test('navigation before API readiness never creates a player', async (t) => {
  const { mount, window, Player, players } = await setup(t, { apiLoaded: false })
  const { unmount } = mount()
  await setImmediate()
  unmount()
  window.YT = { Player }
  window.onYouTubeIframeAPIReady()
  await setImmediate()
  assert.equal(players.length, 0)
})
