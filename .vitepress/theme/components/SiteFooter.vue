<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { studio, type Game } from '../navigation'

const props = defineProps<{ game?: Game }>()

const { page } = useData()
const year = new Date().getFullYear()
const links = computed(() => props.game?.footerLinks ?? props.game?.links ?? [])
const isCurrent = (href: string) => page.value.relativePath.replace(/\.md$/, '.html') === href.slice(1)
</script>

<template>
  <footer class="site-footer">
    <div class="masthead footer-inner">
      <p class="footer-copy">© {{ year }} {{ game?.name ?? studio.name }}. All rights reserved.</p>
      <nav class="footer-links" aria-label="Footer">
        <a
          v-for="link in links"
          :key="link.href"
          class="footer-link"
          :href="withBase(link.href)"
          :aria-current="isCurrent(link.href) ? 'page' : undefined"
        >{{ link.label }}</a>
        <a class="footer-link footer-youtube" :href="studio.youtube" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8M9.6 15.6V8.4l6.2 3.6z"/></svg>
          YouTube<span class="sr-only"> (opens in new tab)</span>
        </a>
      </nav>
    </div>
  </footer>
</template>
