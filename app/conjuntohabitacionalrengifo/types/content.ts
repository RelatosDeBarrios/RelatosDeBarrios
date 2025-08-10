/**
 * Type definitions for Rengifo content package
 *
 * This file contains all type definitions for the Rengifo project content
 */

import {
  Card,
  Credits,
  GalleryContent,
  ImageType,
  Section,
  SocialLink,
  VideoType,
} from '@/types/general'

export type RengifoSections = 'hero' | 'docs' | 'photos' | 'resources'
export type Docs = 'planimetries' | 'survey'
export type Photos =
  | 'photos'
  | 'activities'
  | 'aerials'
  | 'exterior'
  | 'interior'
export type Resources = 'book' | 'documentary'

export type RengifoCard<T> = Omit<Card<T>, 'bg'> & { bg: ImageType }

export interface DocsContent extends Section<RengifoSections, Docs> {
  cards: Record<Docs, RengifoCard<Docs>>
}

export interface PhotoContent extends Section<RengifoSections, never> {
  gallery: GalleryContent<Exclude<Photos, 'exterior' | 'interior'>>
  cards: Record<Photos, RengifoCard<Photos>>
}
export interface ResourcesContent extends Section<RengifoSections, Resources> {
  cards: Record<Resources, RengifoCard<Resources>>
}

export type HeroAction = {
  id: string
  label: string
  href: string
}

export interface HeroContent extends Section<'hero'> {
  subTitle: string
  actions: HeroAction[]
  video: VideoType
}

export interface FooterContent extends Section<'footer'> {
  utilityImages: {
    bg: ImageType
  }
  socialLinks: SocialLink[]
  credits: Credits
}
