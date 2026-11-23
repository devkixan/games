<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { data as posts } from '../../../blog.data'
import BlogCard from './BlogCard.vue'

const { page } = useData()
const relatedPosts = computed(() => {
  const currentUrl = `/${page.value.relativePath.replace(/\.md$/, '.html')}`
  return posts.filter((post) => post.url !== currentUrl).slice(0, 2)
})
</script>

<template>
  <section v-if="relatedPosts.length" class="blog-related" aria-labelledby="blog-related-title">
    <h2 id="blog-related-title" class="blog-related-title">You may also like</h2>
    <div class="blog-list blog-related-grid">
      <BlogCard v-for="post in relatedPosts" :key="post.url" :post="post" heading-tag="h3" />
    </div>
  </section>
</template>
