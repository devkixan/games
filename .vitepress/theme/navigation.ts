import type { IconifyIcon } from '@iconify/vue'
import blockStackLogo from './assets/block-stack-logo-light.svg'
import snakeLogo from './assets/snake-logo-light.svg'
import paperBoatLogo from './assets/paper-boat-logo-light.svg'

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
   * Must reach 4.5:1 contrast on --color-paper (#000000). See design-guidelines skill.
   */
  accentColor: string
  /** Giant hero title colour. Large display only: must reach 3:1 on #000000. */
  titleColor?: string
  logo?: string
  /** One line shown on the Kixan home page. */
  tagline?: string
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

/** Studio-wide links, shown on the home page and in every footer. */
export const studio = {
  name: 'Kixan',
  username: '@devKixan',
  youtube: 'https://www.youtube.com/@devKixan',
}

export const games: Game[] = [
  {
    name: 'Paper Boat: River Rush',
    prefix: '/paper-boat/',
    accentColor: '#bedeef',
    titleColor: '#bedeef',
    logo: paperBoatLogo,
    tagline: 'A little paper boat. An endless river. How far will you go?',
    homeHref: '/paper-boat/index.html',
    links: readLinks(navigationFiles, '/paper-boat/navigations.md') ?? [],
    footerLinks: readLinks(footerFiles, '/paper-boat/footer.md'),
  },
  {
    name: 'Classic 90s Snake Game',
    prefix: '/classic-90s-snake-game/',
    accentColor: '#8fa866',
    titleColor: '#5f7d3a',
    logo: snakeLogo,
    tagline: 'The classic 90s snake, back for another round.',
    homeHref: '/classic-90s-snake-game/index.html',
    links: readLinks(navigationFiles, '/classic-90s-snake-game/navigations.md') ?? [],
    footerLinks: readLinks(footerFiles, '/classic-90s-snake-game/footer.md'),
  },
  {
    name: 'Block Stack: Skybound',
    prefix: '/blockstack-skybound/',
    accentColor: '#79aee0',
    titleColor: '#4f86b8',
    logo: blockStackLogo,
    tagline: 'One tap. One block. Build your tower skyward.',
    homeHref: '/blockstack-skybound/index.html',
    links: readLinks(navigationFiles, '/blockstack-skybound/navigations.md') ?? [],
    footerLinks: readLinks(footerFiles, '/blockstack-skybound/footer.md'),
  },
]

