export interface BlogPost {
  url: string
  title: string
  description: string
  date: string
  author: string
  image: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
  caption: string
}

export function formatBlogDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`))
}
