<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import type { Game } from '../navigation'

const props = defineProps<{ game?: Game }>()
const { page } = useData()
const tabs = computed(() => props.game?.links ?? [])
const homeLabel = computed(() => (props.game ? `${props.game.name} home` : 'Inspira Games home'))
const homeHref = computed(() => (props.game?.homeHref ?? '/blockstack-skybound/index.html'))
const wordmark = computed(() => {
  const words = (props.game?.name ?? 'inspira games').split(' ')
  return { strong: words.slice(0, -1).join(' '), light: words.at(-1) }
})
const isCurrent = (href: string) => page.value.relativePath.replace(/\.md$/, '.html') === href.slice(1)
</script>

<template>
  <header class="site-header fixed inset-x-0 top-0 z-20 bg-paper py-(--space-2) max-[700px]:sticky">
    <div class="masthead mx-auto w-[min(var(--masthead-max),calc(100%-2*var(--gutter)))]">
      <div class="masthead-bar on-brand flex min-h-(--header-height) items-center justify-between gap-(--space-4) bg-brand px-(--space-4) text-on-brand">
        <a class="wordmark" :href="withBase(homeHref)" :aria-label="homeLabel">
          <img v-if="game?.logo" class="block h-(--space-12) w-auto" :src="game.logo" alt="" />
          <template v-else>
            <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
            <span aria-hidden="true">{{ wordmark.strong }} <span class="wordmark-light">{{ wordmark.light }}</span></span>
          </template>
        </a>
        <div class="download-links" role="group" aria-label="Download game">
          <div class="download-heading">Download game</div>
          <component :is="game?.downloads?.appStore ? 'a' : 'button'" class="download-icon" :href="game?.downloads?.appStore" :type="game?.downloads?.appStore ? undefined : 'button'" :disabled="game?.downloads?.appStore ? undefined : true" :aria-label="game?.downloads?.appStore ? 'Download on App Store' : 'App Store download coming soon'" :title="game?.downloads?.appStore ? 'Download on App Store' : 'App Store download coming soon'"><svg viewBox="0 0 448 512" aria-hidden="true"><path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48M127 384.5c-5.5 9.6-17.8 12.8-27.3 7.3c-9.6-5.5-12.8-17.8-7.3-27.3l14.3-24.7q24.15-7.35 39.6 11.4zm138.9-53.9H84c-11 0-20-9-20-20s9-20 20-20h51l65.4-113.2l-20.5-35.4c-5.5-9.6-2.2-21.8 7.3-27.3c9.6-5.5 21.8-2.2 27.3 7.3l8.9 15.4l8.9-15.4c5.5-9.6 17.8-12.8 27.3-7.3c9.6 5.5 12.8 17.8 7.3 27.3l-85.8 148.6h62.1c20.2 0 31.5 23.7 22.7 40m98.1 0h-29l19.6 33.9c5.5 9.6 2.2 21.8-7.3 27.3c-9.6 5.5-21.8 2.2-27.3-7.3c-32.9-56.9-57.5-99.7-74-128.1c-16.7-29-4.8-58 7.1-67.8c13.1 22.7 32.7 56.7 58.9 102h52c11 0 20 9 20 20c0 11.1-9 20-20 20"/></svg><span>App Store</span></component>
          <component :is="game?.downloads?.googlePlay ? 'a' : 'button'" class="download-icon" :href="game?.downloads?.googlePlay" :type="game?.downloads?.googlePlay ? undefined : 'button'" :disabled="game?.downloads?.googlePlay ? undefined : true" :aria-label="game?.downloads?.googlePlay ? 'Download on Google Play' : 'Google Play download coming soon'" :title="game?.downloads?.googlePlay ? 'Download on Google Play' : 'Google Play download coming soon'"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m12.954 11.616l2.957-2.957L6.36 3.291c-.633-.342-1.226-.39-1.746-.016zm3.461 3.462l3.074-1.729c.6-.336.929-.812.929-1.34c0-.527-.329-1.004-.928-1.34l-2.783-1.563l-3.133 3.132zM4.1 4.002c-.064.197-.1.417-.1.658v14.705c0 .381.084.709.236.97l8.097-8.098zm8.854 8.855L4.902 20.91q.232.09.495.09q.47 0 .968-.276l9.255-5.197z"/></svg><span>Google Play</span></component>
        </div>
      </div>
      <details class="mobile-nav hidden max-[700px]:relative max-[700px]:mt-(--space-2) max-[700px]:block max-[700px]:border max-[700px]:border-line-strong max-[700px]:bg-paper">
        <summary><span class="menu-icon" aria-hidden="true"><i></i><i></i><i></i></span> Go to menu</summary>
        <nav :aria-label="game ? `${game.name} pages` : 'Main navigation'">
          <a v-for="link in tabs" :key="link.href" class="tab-link" :href="withBase(link.href)" :aria-current="isCurrent(link.href) ? 'page' : undefined">{{ link.label }}</a>
        </nav>
      </details>
      <nav class="tab-nav mt-(--space-2) grid auto-cols-fr grid-flow-col border border-line-strong bg-paper max-[700px]:hidden" :aria-label="game ? `${game.name} pages` : 'Main navigation'">
        <a v-for="link in tabs" :key="link.href" class="tab-link" :href="withBase(link.href)" :aria-current="isCurrent(link.href) ? 'page' : undefined">{{ link.label }}</a>
      </nav>
    </div>
  </header>
</template>
