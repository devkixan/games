<script setup lang="ts">
import { computed, shallowRef, useId, useTemplateRef } from 'vue'

const props = defineProps<{ gameName: string; videoId?: string }>()
const dialog = useTemplateRef<HTMLDialogElement>('dialog')
const isOpen = shallowRef(false)
const titleId = useId()
const videoUrl = computed(() => `https://www.youtube.com/watch?v=${props.videoId}`)
const embedUrl = computed(() => `https://www.youtube-nocookie.com/embed/${props.videoId}?autoplay=1&rel=0`)

function openTrailer() {
  if (!props.videoId || !dialog.value) return
  dialog.value.showModal()
  isOpen.value = true
}

function closeTrailer() {
  dialog.value?.close()
  isOpen.value = false
}

function closeOnBackdrop(event: MouseEvent) {
  if (event.target === event.currentTarget) closeTrailer()
}
</script>

<template>
  <div class="game-trailer">
    <button
      class="trailer-button"
      type="button"
      :disabled="!videoId"
      :aria-label="videoId ? `Watch ${gameName} trailer` : `${gameName} trailer coming soon`"
      :aria-haspopup="videoId ? 'dialog' : undefined"
      @click="openTrailer"
    >
      <svg class="trailer-play-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /></svg>
      <span>Trailer<span v-if="!videoId" class="trailer-soon">Coming soon</span></span>
    </button>
    <dialog
      v-if="videoId"
      ref="dialog"
      class="trailer-dialog"
      :aria-labelledby="titleId"
      @click="closeOnBackdrop"
      @close="isOpen = false"
    >
      <div class="trailer-dialog-content">
        <div class="trailer-dialog-header">
          <h2 :id="titleId" class="trailer-dialog-title">{{ gameName }} — Trailer</h2>
          <button class="btn btn-secondary" type="button" autofocus @click="closeTrailer">Close</button>
        </div>
        <iframe
          v-if="isOpen"
          class="trailer-player"
          :src="embedUrl"
          :title="`${gameName} trailer`"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        <a class="trailer-youtube" :href="videoUrl" target="_blank" rel="noopener noreferrer">Watch on YouTube<span class="sr-only"> (opens in new tab)</span></a>
      </div>
    </dialog>
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
.trailer-button:hover:enabled { background: var(--color-paper-hover); border-color: var(--game-accent); }
.trailer-button:active:enabled { background: var(--color-paper-active); }
.trailer-button:disabled { color: var(--color-ink-soft); cursor: not-allowed; }
.trailer-play-icon { width: var(--space-6); height: var(--space-6); flex: none; }
.trailer-soon { display: block; font-size: var(--text-sm); }
.trailer-dialog {
  width: min(var(--layout-max), calc(100% - 2 * var(--gutter)));
  max-height: calc(100dvh - 2 * var(--gutter));
  margin: auto; padding: 0;
  border: var(--rule-width) solid var(--color-line-strong);
  border-radius: var(--radius-lg);
  background: var(--color-paper); color: var(--color-ink);
}
.trailer-dialog::backdrop { background: var(--color-overlay); }
.trailer-dialog-content { padding: var(--space-5); }
.trailer-dialog-header { display: flex; align-items: center; justify-content: space-between; gap: var(--space-4); margin-bottom: var(--space-5); }
.trailer-dialog-title { margin: 0; font-size: var(--text-xl); line-height: var(--leading-snug); }
.trailer-player { display: block; width: 100%; aspect-ratio: 16 / 9; border: 0; background: var(--color-paper-sunk); }
.trailer-youtube { display: inline-flex; align-items: center; min-height: var(--control-height); margin-top: var(--space-3); color: var(--color-ink); font-size: var(--text-base); text-decoration: underline; text-underline-offset: var(--space-1); }
.trailer-youtube:hover { color: var(--color-inverse-hover); }
</style>
