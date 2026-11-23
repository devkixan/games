<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import BlogRelatedPosts from './components/blog/BlogRelatedPosts.vue'
import GameHomeHero from './components/GameHomeHero.vue'
import { games, studio } from './navigation'

const { page, frontmatter } = useData()
const game = computed(() => games.find((item) => page.value.relativePath.startsWith(item.prefix.slice(1))))
const isHome = computed(() => page.value.relativePath.endsWith('index.md'))
// Studio landing (root index): no header, centered name + games.
const isStudioHome = computed(() => isHome.value && !game.value)
const title = computed(() => frontmatter.value.pageTitle || page.value.title)
const themeStyle = computed(() => (game.value ? {
  '--game-accent': game.value.accentColor,
  ...(game.value.titleColor && { '--game-title': game.value.titleColor }),
} : undefined))
</script>

<template>
  <main v-if="page.isNotFound" class="error-page">
    <div>
      <p class="hero-kicker">Lost in the dark</p>
      <h1 class="hero-title">404</h1>
      <p class="hero-lead">Page not found.</p>
    </div>
  </main>
  <div v-else-if="isStudioHome" class="site studio-site">
    <main id="main-content" class="studio-home">
      <div class="studio-inner">
        <h1 class="studio-title">{{ title }}</h1>
        <p v-if="frontmatter.description" class="studio-sub">{{ frontmatter.description }}</p>
        <a class="studio-youtube" :href="studio.youtube" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8M9.6 15.6V8.4l6.2 3.6z"/></svg>
          Watch on YouTube<span class="sr-only"> (opens in new tab)</span>
        </a>
        <Content />
      </div>
    </main>
    <SiteFooter />
  </div>
  <div v-else class="site" :class="{ 'game-home-site': isHome && game }" :style="themeStyle">
    <a class="skip-link btn btn-primary" href="#main-content">Skip to content</a>
    <SiteHeader :game="game" />
    <main id="main-content" class="site-main">
      <GameHomeHero
        v-if="isHome && game && !frontmatter.hidePageIntro"
        :key="game.prefix"
        :game="game"
        :title="title"
        :description="frontmatter.description"
        :kicker="frontmatter.kicker"
      />
      <section v-else-if="!frontmatter.hidePageIntro" class="page-hero">
        <div class="masthead hero-inner">
          <p v-if="frontmatter.kicker" class="hero-kicker">{{ frontmatter.kicker }}</p>
          <h1 class="hero-title">{{ title }}</h1>
          <p v-if="frontmatter.description" class="hero-lead">{{ frontmatter.description }}</p>
        </div>
      </section>

      <div class="masthead page-content" :class="{ 'page-content-flush': frontmatter.hidePageIntro }">
        <Content />
        <BlogRelatedPosts v-if="frontmatter.blog" />
      </div>
    </main>
    <SiteFooter :game="game" />
  </div>
</template>
