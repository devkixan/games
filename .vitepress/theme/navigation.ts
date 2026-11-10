import type { IconifyIcon } from '@iconify/vue'
import blockStackLogo from './assets/block-stack-logo-light.svg'
import snakeLogo from './assets/snake-logo-dark.svg'

export interface NavLink {
  label: string
  href: string
  icon?: IconifyIcon
}

export interface Game {
  name: string
  prefix: string
  /**
   * Per-game accent used for links, focus ring and current-page underline.
   * Must reach 4.5:1 contrast on --color-paper (#f8f8f1). See design-guidelines skill.
   */
  accentColor: string
  brandColor?: string
  brandTextColor?: string
  brandHoverColor?: string
  brandLineColor?: string
  logo?: string
  homeHref?: string
  downloads?: { appStore?: string; googlePlay?: string }
  links: NavLink[]
  footerLinks?: NavLink[]
}

// Each game's Markdown files contain a list of links. Vite loads them at build
// time so the same configuration is available during SSR and client navigation.
const navigationFiles = import.meta.glob('/**/navigations.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
const footerFiles = import.meta.glob('/**/footer.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

function readLinks(files: Record<string, string>, path: string): NavLink[] | undefined {
  const content = files[path]
  if (content === undefined) return undefined
  return content.split(/\r?\n/).flatMap((line, index) => {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) return []
    const match = trimmed.match(/^- \[([^\]]+)\]\(([^\s)]+)\)$/)
    if (!match) throw new Error(`Invalid link in ${path} on line ${index + 1}`)
    return [{ label: match[1], href: match[2] }]
  })
}

export const games: Game[] = [
  {
    name: 'Classic 90s Snake Game',
    prefix: '/classic-90s-snake-game/',
    accentColor: '#34623a',
    brandColor: '#8FA866',
    brandTextColor: '#252522',
    brandHoverColor: '#a1b77c',
    brandLineColor: 'rgb(37 37 34 / 0.5)',
    logo: snakeLogo,
    homeHref: '/classic-90s-snake-game/privacy-policy.html',
    links: readLinks(navigationFiles, '/classic-90s-snake-game/navigations.md') ?? [],
    footerLinks: readLinks(footerFiles, '/classic-90s-snake-game/footer.md'),
  },
  {
    name: 'Block Stack Skybound',
    prefix: '/blockstack-skybound/',
    accentColor: '#b3472d',
    logo: blockStackLogo,
    homeHref: '/blockstack-skybound/privacy-policy.html',
    links: readLinks(navigationFiles, '/blockstack-skybound/navigations.md') ?? [],
    footerLinks: readLinks(footerFiles, '/blockstack-skybound/footer.md'),
  },
]

