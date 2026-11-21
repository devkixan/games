import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import GameList from './components/GameList.vue'
import './style.css'

export default {
  Layout,
  enhanceApp({ app }) {
    app.component('GameList', GameList)
  },
} satisfies Theme
