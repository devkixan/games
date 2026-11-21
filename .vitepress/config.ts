import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  title: 'Kixan',
  description: 'Small games by Kixan.',
  base: process.env.SITE_BASE || '/',
  cleanUrls: false,
  srcExclude: ['README.md', '**/navigations.md', '**/footer.md'],
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '250x250', href: `${process.env.SITE_BASE || '/'}favicon.png` }],
    ['meta', { name: 'theme-color', content: '#000000' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;600;700&display=swap' }],
  ],
  vite: { plugins: [tailwindcss()] },
})
