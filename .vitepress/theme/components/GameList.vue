<script setup lang="ts">
import { withBase } from 'vitepress'
import { games } from '../navigation'
import StoreLinks from './StoreLinks.vue'
</script>

<template>
  <section class="game-list" aria-label="Games">
    <article
      v-for="game in games"
      :key="game.prefix"
      class="game-card"
      :style="{ '--game-title': game.titleColor, '--game-accent': game.accentColor }"
    >
      <img v-if="game.logo" class="game-card-logo" :src="game.logo" alt="" />
      <h2 class="game-card-name">
        <!-- Stretched link: tapping anywhere on the card (except the store buttons) opens the game page. -->
        <a class="game-card-link" :href="withBase(game.homeHref ?? `${game.prefix}index.html`)">{{ game.name }}</a>
      </h2>
      <p v-if="game.tagline" class="game-card-tagline">{{ game.tagline }}</p>
      <StoreLinks class="game-card-stores" :game="game" size="md" />
    </article>
  </section>
</template>
