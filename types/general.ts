export type ImageType = {
  src: string
  width: number
  height: number
  alt: string
}

export type VideoType = {
  src: string
  autoplay: boolean
  loop: boolean
  muted: boolean
  preload: string
}

export type NavigationItem<T> = {
  id: T
  label: string
}

export interface Section<T, C extends string = string> {
  id: T
  title: string
  subTitle?: string
  description?: string
  utilityImages?: {
    [key: string]: ImageType
  }
  cards?: Record<C, Card<C>>
  gallery?: GalleryContent<C>
}

export interface GalleryImage extends ImageType {
  name?: string
}

export type GalleryCollection<C> = {
  id: C
  images: GalleryImage[]
}

export type GalleryContent<C extends string> = Record<C, GalleryCollection<C>>

export type Credits = {
  collaborators: ImageType[]
  developer?: {
    text: string
    href: string
  }
}

export type SocialLink = {
  id: string
  name: string
  href: string
  icon: string
}

export type Card<T> = {
  id: T
  title: string
  subTitle?: string
  bg: ImageType | VideoType
  disabled?: boolean
  href?: URL | string
}

export type NavigationContent<T> = NavigationItem<T>[]
