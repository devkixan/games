<script setup lang="ts">
import type { Game } from '../navigation'

defineProps<{ game?: Game; size?: 'sm' | 'md' }>()

const stores = [
  {
    key: 'appStore' as const,
    label: 'App Store',
    viewBox: '0 0 384 512',
    path: 'M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8c-18.8-26.9-47.2-41.7-84.7-44.6c-35.5-2.8-74.3 20.7-88.5 20.7c-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2c25.2-.6 43-17.9 75.8-17.9c31.8 0 48.3 17.9 76.4 17.9c48.6-.7 90.4-82.5 102.6-119.3c-65.2-30.7-61.7-90-61.7-91.9m-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5c-24.1 1.4-52 16.4-67.9 34.9c-17.5 19.8-27.8 44.3-25.6 71.9c26.1 2 49.9-11.4 69.5-34.3',
  },
  {
    key: 'googlePlay' as const,
    label: 'Google Play',
    viewBox: '0 0 24 24',
    path: 'm12.954 11.616l2.957-2.957L6.36 3.291c-.633-.342-1.226-.39-1.746-.016zm3.461 3.462l3.074-1.729c.6-.336.929-.812.929-1.34c0-.527-.329-1.004-.928-1.34l-2.783-1.563l-3.133 3.132zM4.1 4.002c-.064.197-.1.417-.1.658v14.705c0 .381.084.709.236.97l8.097-8.098zm8.854 8.855L4.902 20.91q.232.09.495.09q.47 0 .968-.276l9.255-5.197z',
  },
]
</script>

<template>
  <div class="store-links" :class="`store-links-${size ?? 'sm'}`" role="group" aria-label="Download game">
    <template v-for="store in stores" :key="store.key">
      <a
        v-if="game?.downloads?.[store.key]"
        class="store-link"
        :href="game.downloads[store.key]"
        :aria-label="`Download on ${store.label}`"
      >
        <svg :viewBox="store.viewBox" aria-hidden="true"><path fill="currentColor" :d="store.path" /></svg>
        <span>{{ store.label }}</span>
      </a>
      <span
        v-else
        class="store-link"
        aria-disabled="true"
        :aria-label="`${store.label} download coming soon`"
        :title="`${store.label} download coming soon`"
      >
        <svg :viewBox="store.viewBox" aria-hidden="true"><path fill="currentColor" :d="store.path" /></svg>
        <span class="store-copy">
          <span>{{ store.label }}</span>
          <small v-if="size === 'md'" class="store-soon">Coming soon</small>
        </span>
      </span>
    </template>
  </div>
</template>
