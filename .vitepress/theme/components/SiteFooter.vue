<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import type { Game } from '../navigation'

const props = defineProps<{ game?: Game }>()

const { page } = useData()
const year = new Date().getFullYear()
const links = computed(() => props.game?.footerLinks ?? props.game?.links ?? [])
const isCurrent = (href: string) => page.value.relativePath.replace(/\.md$/, '.html') === href.slice(1)
</script>

<template>
  <footer class="pb-(--space-2)">
    <div class="masthead flex flex-wrap items-center justify-between gap-x-(--space-6) gap-y-(--space-2) border-t border-line py-(--space-6) text-sm leading-snug">
      <p class="m-0 text-ink-muted">© {{ year }} {{ game?.name ?? 'Inspira Games' }}</p>
      <nav v-if="links.length" class="flex flex-wrap gap-(--space-6)" aria-label="Footer">
        <a
          v-for="link in links"
          :key="link.href"
          class="text-ink-soft underline decoration-transparent underline-offset-(--space-1) transition-colors hover:text-ink hover:decoration-line-strong aria-[current=page]:text-ink aria-[current=page]:decoration-current"
          :href="withBase(link.href)"
          :aria-current="isCurrent(link.href) ? 'page' : undefined"
        >{{ link.label }}</a>
      </nav>
    </div>
  </footer>
</template>
