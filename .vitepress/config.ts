import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  title: 'Games',
  description: 'A little space for games and the people who play them.',
  base: process.env.SITE_BASE || '/',
  cleanUrls: false,
  srcExclude: ['README.md', '**/navigations.md', '**/footer.md'],
  head: [
    ['meta', { name: 'theme-color', content: '#f8f8f1' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap' }],
  ],
  vite: { plugins: [tailwindcss()] },
})
