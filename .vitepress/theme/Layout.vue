<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import { games } from './navigation'

const { page, frontmatter } = useData()
const game = computed(() => games.find((item) => page.value.relativePath.startsWith(item.prefix.slice(1))))
const themeStyle = computed(() => (game.value ? {
  '--game-accent': game.value.accentColor,
  ...(game.value.brandColor && { '--color-brand': game.value.brandColor }),
  ...(game.value.brandTextColor && { '--color-on-brand': game.value.brandTextColor }),
  ...(game.value.brandHoverColor && { '--color-brand-hover': game.value.brandHoverColor }),
  ...(game.value.brandLineColor && { '--color-on-brand-line': game.value.brandLineColor }),
} : undefined))
</script>

<template>
  <main v-if="page.isNotFound" class="error-page box-border grid min-h-dvh place-items-center p-6">
    <div class="w-full max-w-96 border-2 border-current px-6 py-10 text-center">
      <h1 class="m-0 text-[clamp(4rem,20vw,7rem)] leading-none">404</h1>
      <p class="mt-4 text-lg">Page not found</p>
    </div>
  </main>
  <div v-else :style="themeStyle">
    <a class="skip-link btn btn-primary" href="#main-content">Skip to content</a>
    <SiteHeader :game="game" />
    <main id="main-content" class="min-h-[65vh]">
      <div class="layout layout-prose pt-(--space-8)">
        <h1 class="m-0 text-display-xs leading-heading tracking-heading font-bold text-ink text-balance">{{ frontmatter.pageTitle || page.title }}</h1>
        <p v-if="frontmatter.description" class="mt-(--space-5) text-xl leading-body text-ink-soft max-[700px]:text-lg">{{ frontmatter.description }}</p>
      </div>
      <div class="layout layout-prose pt-(--space-10) pb-(--space-24) max-[700px]:pt-(--space-8) max-[700px]:pb-(--space-16)">
        <Content />
      </div>
    </main>
    <SiteFooter :game="game" />
  </div>
</template>

<style scoped>
:global(body:has(.error-page)) {
  padding-top: 0;
}

</style>
