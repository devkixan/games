<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { withBase } from 'vitepress'
import { studio, type Game } from '../navigation'
import StoreLinks from './StoreLinks.vue'
import GameTrailer from './GameTrailer.vue'
import { useYouTubeBackground } from '../composables/useYouTubeBackground'

const props = defineProps<{ game: Game; title: string; description?: string; kicker?: string }>()
const videoFrame = useTemplateRef<HTMLIFrameElement>('videoFrame')
const { videoUrl, isVideoPlaying, isPlayerReady, hasPlayerError, toggleVideo } = useYouTubeBackground(props.game.trailerVideoId, videoFrame)
const videoControlLabel = computed(() => {
  if (hasPlayerError.value) return 'Video unavailable'
  if (!isPlayerReady.value) return 'Loading video…'
  return isVideoPlaying.value ? 'Pause video' : 'Play video'
})
</script>

<template>
  <section class="game-home-hero" aria-labelledby="game-home-title">
    <div class="game-home-art" aria-hidden="true">
      <img v-if="!game.trailerVideoId && game.heroImage" class="game-home-image" :src="withBase(game.heroImage)" alt="" fetchpriority="high" />
      <div v-if="game.trailerVideoId" class="game-home-video" :style="{ '--game-video-ratio': game.trailerAspectRatio ?? 16 / 9 }">
        <iframe
          v-if="videoUrl"
          ref="videoFrame"
          class="game-home-video-player"
          :src="videoUrl"
          :title="`${game.name} background video`"
          tabindex="-1"
          allow="autoplay; encrypted-media"
          referrerpolicy="strict-origin-when-cross-origin"
        ></iframe>
      </div>
      <div class="game-home-blur"></div>
    </div>
    <button
      v-if="game.trailerVideoId"
      class="btn btn-secondary game-home-video-toggle"
      type="button"
      :disabled="!isPlayerReady"
      :aria-label="isPlayerReady ? (isVideoPlaying ? 'Pause background video' : 'Play background video') : videoControlLabel"
      @click="toggleVideo"
    >{{ videoControlLabel }}</button>
    <div class="masthead game-home-inner">
      <div class="game-home-copy">
        <p v-if="kicker" class="hero-kicker">{{ kicker }}</p>
        <h1 id="game-home-title" class="hero-title game-home-title">{{ title }}</h1>
        <p class="game-home-publisher">{{ studio.name }}</p>
        <p v-if="description" class="hero-lead game-home-description">{{ description }}</p>
      </div>
      <div class="game-home-actions">
        <StoreLinks class="game-home-stores" :game="game" size="md" />
        <GameTrailer :game-name="game.name" :video-id="game.trailerVideoId" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.game-home-hero {
  position: relative;
  isolation: isolate;
  background: var(--color-paper);
}
.game-home-art { position: absolute; inset: 0; z-index: -1; overflow: hidden; }
.game-home-art::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, var(--color-paper) 10%, var(--color-hero-shade) 45%, transparent 100%),
    linear-gradient(to top, var(--color-paper), transparent 80%);
}
.game-home-image { width: 100%; height: 100%; object-fit: cover; object-position: center; opacity: 0.65; }
.game-home-video { position: absolute; inset: 0; container-type: size; pointer-events: none; background: var(--color-paper); }
.game-home-video-player {
  position: absolute; top: 50%; left: 50%;
  width: max(100cqw, calc(100cqh * var(--game-video-ratio)));
  height: max(100cqh, calc(100cqw / var(--game-video-ratio)));
  transform: translate(-50%, -50%); border: 0;
}
.game-home-video-toggle { position: absolute; top: var(--space-4); right: var(--gutter); background: var(--color-paper); }
/* Blend two blur strengths so the artwork stays sharp at the top-right. */
.game-home-blur, .game-home-blur::after { position: absolute; inset: 0; }
.game-home-blur {
  backdrop-filter: blur(var(--game-hero-blur-soft));
  mask-image: linear-gradient(to top right, black 15%, transparent 85%);
}
.game-home-blur::after {
  content: '';
  backdrop-filter: blur(var(--game-hero-blur-strong));
  mask-image: linear-gradient(to top right, black, transparent 65%);
}
.game-home-inner {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: max(var(--game-hero-height), calc(100svh - var(--header-height)));
  box-sizing: border-box;
  padding-block: var(--space-12);
}
.game-home-copy { max-width: 80%; }
.game-home-title { color: var(--color-ink); font-size: var(--text-display-xl); line-height: var(--leading-heading); }
.game-home-publisher { margin: var(--space-5) 0 0; color: var(--game-accent); font-size: var(--text-xl); font-weight: var(--font-weight-regular); }
.game-home-description { margin-top: var(--space-2); color: var(--color-ink); }
.game-home-actions { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: var(--space-6); margin-top: var(--space-10); }
.game-home-stores { grid-template-columns: repeat(2, minmax(0, 1fr)); border: var(--rule-width) solid var(--color-line-strong); border-radius: var(--radius-md); overflow: hidden; background: var(--color-paper); }
.game-home-stores :deep(.store-link + .store-link) { border-top: 0; border-left: var(--rule-width) solid var(--color-line-strong); }

@media (max-width: 700px) {
  .game-home-art::after {
    background: linear-gradient(to top, var(--color-paper) 10%, var(--color-hero-shade) 55%, transparent 100%);
  }
  .game-home-inner { min-height: max(var(--game-hero-height-mobile), calc(100svh - var(--header-height))); padding-block: var(--space-12) var(--space-8); }
  .game-home-copy { max-width: 100%; }
  .game-home-actions { align-items: flex-start; flex-direction: column; }
  .game-home-stores { width: 100%; }
  .game-home-stores :deep(.store-link) { justify-content: center; padding-inline: var(--space-3); }
}
</style>
