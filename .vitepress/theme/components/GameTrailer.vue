<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ gameName: string; videoId?: string }>()
const videoUrl = computed(() => `https://www.youtube.com/watch?v=${props.videoId}`)
</script>

<template>
  <div class="game-trailer">
    <a
      v-if="videoId"
      class="trailer-button"
      :href="videoUrl"
      :aria-label="`Watch ${gameName} on YouTube`"
    >
      <svg class="trailer-play-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /></svg>
      <span>Watch on YouTube</span>
    </a>
    <button v-else class="trailer-button" type="button" disabled :aria-label="`${gameName} video coming soon`">
      <svg class="trailer-play-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /></svg>
      <span>Watch on YouTube<span class="trailer-soon">Coming soon</span></span>
    </button>
  </div>
</template>

<style scoped>
.trailer-button {
  display: inline-flex; align-items: center; gap: var(--space-3);
  min-height: var(--control-height); padding: var(--space-3) var(--space-6);
  border: var(--rule-width) solid var(--color-line-strong); border-radius: var(--radius-md);
  background: var(--color-paper); color: var(--color-ink);
  font: inherit; font-size: var(--text-lg); line-height: var(--leading-snug); cursor: pointer;
  transition: background-color var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out);
}
.trailer-button[href]:hover { background: var(--color-paper-hover); border-color: var(--game-accent); }
.trailer-button[href]:active { background: var(--color-paper-active); }
.trailer-button:disabled { color: var(--color-ink-soft); cursor: not-allowed; }
.trailer-play-icon { width: var(--space-6); height: var(--space-6); flex: none; }
.trailer-soon { display: block; font-size: var(--text-sm); }
</style>
