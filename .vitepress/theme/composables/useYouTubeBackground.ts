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

function loadPlayerApi(): Promise<PlayerConstructor> {
  if (window.YT?.Player) return Promise.resolve(window.YT.Player)
  if (playerApiReady) return playerApiReady

  playerApiReady = new Promise((resolve, reject) => {
    const previousReady = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      if (window.YT?.Player) resolve(window.YT.Player)
      previousReady?.()
    }

    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    script.async = true
    script.addEventListener('error', () => {
      playerApiReady = undefined
      reject(new Error('YouTube player API could not load'))
    }, { once: true })
    document.head.append(script)
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

  function handlePlayerError() {
    hasPlayerError.value = true
    isVideoPlaying.value = false
    isPlayerReady.value = false
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

    try {
      const Player = await loadPlayerApi()
      if (disposed || !iframe.value) return
      player = new Player(iframe.value, {
        events: {
          onReady: ({ target }) => {
            isPlayerReady.value = true
            target.mute()
            if (autoplay) target.playVideo()
          },
          onStateChange: ({ data }) => {
            if (data === 1 || data === 3) isVideoPlaying.value = true
            else if (data === 0 || data === 2 || data === 5) isVideoPlaying.value = false
          },
          onAutoplayBlocked: () => { isVideoPlaying.value = false },
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
    player?.destroy()
  })

  return { videoUrl, isVideoPlaying, isPlayerReady, hasPlayerError, toggleVideo }
}
