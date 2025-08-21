/**
 * SEO and metadata domain types
 * Contains types for search engine optimization and social media metadata
 */

export interface TwitterContent {
  readonly card?: string
  readonly site: string
  readonly creator: string
}

export interface ImageContent {
  readonly url: string
  readonly width?: number
  readonly height?: number
  readonly alt?: string
  readonly type?: string
}

export interface OpenGraphContent {
  readonly title: string
  readonly description: string
  readonly type?: string
  readonly url?: string
  readonly siteName?: string
  readonly locale?: string
  readonly image: ImageContent[] | string // Can be a URL or an object
}

export interface IconsContent {
  readonly icon: string // Path to icon in public folder
  readonly appleTouchIcon?: string // Optional Apple touch icon
  readonly maskIcon?: string // Optional mask icon for dark mode
  readonly favicon?: string // Optional favicon
}

export interface SEOContent {
  readonly title: string
  readonly description: string
  readonly url: string
  readonly icons: IconsContent | string
  readonly keywords: string[]
  readonly twitter: TwitterContent
  readonly openGraph: OpenGraphContent
}
