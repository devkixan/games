<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useData, withBase } from 'vitepress'
import { games, studio, type Game } from '../navigation'
import StoreLinks from './StoreLinks.vue'

const props = defineProps<{ game?: Game }>()
const { page } = useData()
// Studio pages (no game) link to each game's home.
const links = computed(() => props.game?.links ?? games.map((g) => ({ label: g.name, href: g.homeHref ?? `${g.prefix}index.html` })))
const menu = ref<HTMLDetailsElement>()
// Close the mobile menu after client-side navigation.
watch(() => page.value.relativePath, () => { if (menu.value) menu.value.open = false })
const isCurrent = (href: string) => page.value.relativePath.replace(/\.md$/, '.html') === href.slice(1)
</script>

<template>
  <header class="site-header">
    <div class="masthead masthead-bar">
      <div class="header-brands">
        <a class="wordmark" :href="withBase('/index.html')" :aria-label="`${studio.name} home`">
          <img class="wordmark-logo" :src="withBase('/favicon.png')" alt="" width="40" height="40" />
        </a>
        <template v-if="game">
          <span class="header-brand-divider" aria-hidden="true"></span>
          <a class="wordmark" :href="withBase(game.homeHref ?? `${game.prefix}index.html`)" :aria-label="`${game.name} home`">
            <img v-if="game.logo" class="wordmark-logo" :src="game.logo" alt="" />
            <span v-else aria-hidden="true">{{ game.name }}</span>
          </a>
        </template>
      </div>

      <nav class="top-nav" :aria-label="game ? `${game.name} pages` : 'Main navigation'">
        <a v-for="link in links" :key="link.href" class="nav-link" :href="withBase(link.href)" :aria-current="isCurrent(link.href) ? 'page' : undefined">{{ link.label }}</a>
      </nav>

      <StoreLinks class="header-stores" :game="game" size="sm" />

      <details ref="menu" class="mobile-nav">
        <summary aria-label="Menu"><span class="menu-icon" aria-hidden="true"><i></i><i></i><i></i></span></summary>
        <nav :aria-label="game ? `${game.name} pages` : 'Main navigation'">
          <a v-for="link in links" :key="link.href" class="nav-link" :href="withBase(link.href)" :aria-current="isCurrent(link.href) ? 'page' : undefined">{{ link.label }}</a>
          <StoreLinks :game="game" size="sm" />
        </nav>
      </details>
    </div>
  </header>
</template>
