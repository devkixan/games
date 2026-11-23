import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

// Full production root, including any deployment-specific base path.
const siteUrl = `${(process.env.SITE_URL || 'https://devkixan.com/').replace(/\/+$/, '')}/`
const absoluteUrl = (path: string) => new URL(path.replace(/^\//, ''), siteUrl).href

export default defineConfig({
  lang: 'en',
  title: 'Kixan',
  description: 'Small games by Kixan.',
  base: process.env.SITE_BASE || '/',
  cleanUrls: false,
  srcExclude: ['README.md', 'AGENTS.md', 'skills/**', '**/navigations.md', '**/footer.md'],
  sitemap: { hostname: siteUrl },
  transformPageData(pageData) {
    if (pageData.isNotFound) return
    const meta = pageData.frontmatter
    const url = absoluteUrl(pageData.relativePath.replace(/\.md$/, '.html'))
    const title = `${pageData.title} | Kixan`
    meta.head ??= []
    meta.head.push(
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:site_name', content: 'Kixan' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: pageData.description }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:type', content: meta.blog ? 'article' : 'website' }],
      ['meta', { name: 'twitter:card', content: meta.image ? 'summary_large_image' : 'summary' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: pageData.description }],
    )
    if (meta.image) {
      const image = absoluteUrl(meta.image)
      meta.head.push(
        ['meta', { property: 'og:image', content: image }],
        ['meta', { property: 'og:image:alt', content: meta.imageAlt }],
        ['meta', { property: 'og:image:width', content: String(meta.imageWidth) }],
        ['meta', { property: 'og:image:height', content: String(meta.imageHeight) }],
        ['meta', { name: 'twitter:image', content: image }],
        ['meta', { name: 'twitter:image:alt', content: meta.imageAlt }],
      )
    }
    if (meta.blog) {
      const blogUrl = absoluteUrl(`${pageData.relativePath.split('/')[0]}/blog.html`)
      meta.head.push(
        ['meta', { property: 'article:published_time', content: meta.date }],
        ['meta', { name: 'author', content: meta.author }],
        ['script', { type: 'application/ld+json' }, JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'BlogPosting',
              '@id': `${url}#article`,
              headline: meta.pageTitle,
              description: pageData.description,
              image: [absoluteUrl(meta.image)],
              datePublished: meta.date,
              author: { '@type': 'Organization', name: meta.author, url: siteUrl },
              publisher: { '@type': 'Organization', name: 'Kixan', url: siteUrl },
              mainEntityOfPage: { '@type': 'WebPage', '@id': url },
              inLanguage: 'en',
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Blog', item: blogUrl },
                { '@type': 'ListItem', position: 2, name: meta.pageTitle, item: url },
              ],
            },
          ],
        }).replace(/</g, '\\u003c')],
      )
    }
  },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', sizes: 'any', href: `${process.env.SITE_BASE || '/'}kixan-logo.svg` }],
    ['meta', { name: 'theme-color', content: '#000000' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;600;700&display=swap' }],
  ],
  vite: { plugins: [tailwindcss()] },
})
