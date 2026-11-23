<script setup lang="ts">
import { withBase } from 'vitepress'
import { formatBlogDate, type BlogPost } from '../../../blog'

withDefaults(defineProps<{ post: BlogPost; headingTag?: 'h2' | 'h3' }>(), {
  headingTag: 'h2',
})
</script>

<template>
  <article class="blog-card">
    <figure class="blog-card-figure">
      <img :src="withBase(post.image)" :alt="post.imageAlt" :width="post.imageWidth" :height="post.imageHeight" decoding="async" />
      <figcaption class="sr-only">{{ post.caption }}</figcaption>
    </figure>
    <div class="blog-card-content">
      <p class="blog-meta"><time :datetime="post.date">{{ formatBlogDate(post.date) }}</time> · {{ post.author }}</p>
      <component :is="headingTag" class="blog-card-title"><a class="blog-card-link" :href="withBase(post.url)">{{ post.title }}</a></component>
      <p class="blog-card-description">{{ post.description }}</p>
      <span class="blog-card-cta" aria-hidden="true">Read article</span>
    </div>
  </article>
</template>
