import { createContentLoader } from 'vitepress'
import type { BlogPost } from './blog'

declare const data: BlogPost[]
export { data }

export default createContentLoader('*/blog/*.md', {
  transform(pages): BlogPost[] {
    return pages.filter(({ frontmatter }) => frontmatter.blog).map(({ url, frontmatter }) => ({
      url,
      title: frontmatter.pageTitle,
      description: frontmatter.description,
      date: frontmatter.date,
      author: frontmatter.author,
      image: frontmatter.image,
      imageAlt: frontmatter.imageAlt,
      imageWidth: frontmatter.imageWidth,
      imageHeight: frontmatter.imageHeight,
      caption: frontmatter.caption,
    })).sort((a, b) => b.date.localeCompare(a.date))
  },
})
