<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { formatBlogDate } from '../../../blog'

const { page, frontmatter } = useData()
const blogHref = computed(() => withBase(`/${page.value.relativePath.split('/')[0]}/blog.html`))
const dateLabel = computed(() => formatBlogDate(frontmatter.value.date))
</script>

<template>
  <div class="blog-article-intro">
    <nav class="blog-breadcrumb" aria-label="Breadcrumb">
      <a :href="blogHref">Blog</a><span aria-hidden="true"> / </span><span aria-current="page">{{ frontmatter.pageTitle }}</span>
    </nav>
    <p class="blog-meta">By {{ frontmatter.author }} · <time :datetime="frontmatter.date">{{ dateLabel }}</time></p>
    <figure class="blog-article-figure">
      <img :src="withBase(frontmatter.image)" :alt="frontmatter.imageAlt" :width="frontmatter.imageWidth" :height="frontmatter.imageHeight" decoding="async" />
      <figcaption>{{ frontmatter.caption }}</figcaption>
    </figure>
  </div>
</template>
