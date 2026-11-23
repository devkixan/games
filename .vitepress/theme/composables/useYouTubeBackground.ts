import { nextTick, onBeforeUnmount, onMounted, shallowRef, type ShallowRef } from 'vue'

interface YouTubePlayer {
  playVideo(): void
  pauseVideo(): void
  mute(): void
  destroy(): void
}

interface PlayerOptions {
  events: {
    onReady: (event: { target: YouTubePlayer }) => void
    onStateChange: (event: { data: number }) => void
    onAutoplayBlocked: () => void
    onError: () => void
  }
}

type PlayerConstructor = new (iframe: HTMLIFrameElement, options: PlayerOptions) => YouTubePlayer

declare global {
  interface Window {
    YT?: { Player: PlayerConstructor }
    onYouTubeIframeAPIReady?: () => void
  }
}

let playerApiReady: Promise<PlayerConstructor> | undefined
const PLAYER_LOAD_TIMEOUT_MS = 15_000

function loadPlayerApi(): Promise<PlayerConstructor> {
  if (window.YT?.Player) return Promise.resolve(window.YT.Player)
  if (playerApiReady) return playerApiReady

  playerApiReady = new Promise<PlayerConstructor>((resolve, reject) => {
    const previousReady = window.onYouTubeIframeAPIReady
    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    script.async = true

    function cleanup() {
      clearTimeout(timeout)
      script.removeEventListener('error', fail)
      if (window.onYouTubeIframeAPIReady === ready) {
        window.onYouTubeIframeAPIReady = previousReady
      }
    }
    function fail() {
      cleanup()
      script.remove()
      reject(new Error('YouTube player API could not load'))
    }
    function ready() {
      if (!window.YT?.Player) return
      cleanup()
      resolve(window.YT.Player)
      previousReady?.()
    }

    const timeout = setTimeout(fail, PLAYER_LOAD_TIMEOUT_MS)
    window.onYouTubeIframeAPIReady = ready
    script.addEventListener('error', fail, { once: true })
    document.head.append(script)
  }).catch((error) => {
    playerApiReady = undefined
    throw error
  })
  return playerApiReady
}

/** Keep the iframe mounted so pausing preserves its current frame and position. */
export function useYouTubeBackground(videoId: string | undefined, iframe: Readonly<ShallowRef<HTMLIFrameElement | null>>) {
  const videoUrl = shallowRef<string>()
  const isVideoPlaying = shallowRef(false)
  const isPlayerReady = shallowRef(false)
  const hasPlayerError = shallowRef(false)
  let player: YouTubePlayer | undefined
  let disposed = false
  let readyTimeout: ReturnType<typeof setTimeout> | undefined

  function handlePlayerError() {
    if (disposed) return
    clearTimeout(readyTimeout)
    hasPlayerError.value = true
    isVideoPlaying.value = false
    isPlayerReady.value = false
    // Stop an autoplaying embed when its controls cannot be connected.
    videoUrl.value = undefined
    player?.destroy()
    player = undefined
  }

  onMounted(async () => {
    if (!videoId) return
    const autoplay = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const params = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      mute: '1', controls: '0', loop: '1', playlist: videoId,
      playsinline: '1', disablekb: '1', fs: '0', rel: '0',
      enablejsapi: '1', origin: window.location.origin,
    })
    videoUrl.value = `https://www.youtube-nocookie.com/embed/${videoId}?${params}`
    await nextTick()
    if (disposed) return

    try {
      const Player = await loadPlayerApi()
      if (disposed || !iframe.value) return
      readyTimeout = setTimeout(handlePlayerError, PLAYER_LOAD_TIMEOUT_MS)
      player = new Player(iframe.value, {
        events: {
          onReady: ({ target }) => {
            if (disposed || hasPlayerError.value) return
            clearTimeout(readyTimeout)
            isPlayerReady.value = true
            target.mute()
            if (autoplay) target.playVideo()
          },
          onStateChange: ({ data }) => {
            if (disposed || hasPlayerError.value) return
            if (data === 1 || data === 3) isVideoPlaying.value = true
            else if (data === 0 || data === 2 || data === 5) isVideoPlaying.value = false
          },
          onAutoplayBlocked: () => {
            if (!disposed) isVideoPlaying.value = false
          },
          onError: handlePlayerError,
        },
      })
    } catch {
      if (!disposed) handlePlayerError()
    }
  })

  function toggleVideo() {
    if (!player || !isPlayerReady.value) return
    if (isVideoPlaying.value) player.pauseVideo()
    else player.playVideo()
  }

  onBeforeUnmount(() => {
    disposed = true
    clearTimeout(readyTimeout)
    player?.destroy()
  })

  return { videoUrl, isVideoPlaying, isPlayerReady, hasPlayerError, toggleVideo }
}
