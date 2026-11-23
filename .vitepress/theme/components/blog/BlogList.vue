<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { data as posts } from '../../../blog.data'
import BlogCard from './BlogCard.vue'

const { page } = useData()
const gamePosts = computed(() => {
  const prefix = `/${page.value.relativePath.split('/')[0]}/blog/`
  return posts.filter((post) => post.url.startsWith(prefix))
})
</script>

<template>
  <section class="blog-list" aria-label="Blog articles">
    <BlogCard v-for="post in gamePosts" :key="post.url" :post="post" />
  </section>
</template>
