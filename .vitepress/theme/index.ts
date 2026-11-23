import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import GameList from './components/GameList.vue'
import BlogList from './components/blog/BlogList.vue'
import BlogArticleIntro from './components/blog/BlogArticleIntro.vue'
import './style.css'

export default {
  Layout,
  enhanceApp({ app }) {
    app.component('GameList', GameList)
    app.component('BlogList', BlogList)
    app.component('BlogArticleIntro', BlogArticleIntro)
  },
} satisfies Theme
