/**
 * Core business domain types
 * Contains types for brand identity, team, and fundamental business entities
 */

export type ProjectsId = 'rengifo' | 'covico'

export interface BrandContent {
  readonly title: string
  readonly description: string
  readonly contact_email: string
  readonly url: UrlContent
  readonly projects: {
    rengifo: 'Conjunto Habitacional Rengifo'
    covico: 'Villa Covico'
  }
  readonly paths: {
    readonly hub: string
    readonly covico: string
    readonly rengifo: string
  }
  readonly social: SocialContent
}

export interface UrlContent {
  readonly base: string
  readonly covico: string
  readonly rengifo: string
}

export interface SocialContent {
  readonly instagram: string
}

export interface TeamMember {
  readonly name: string
  readonly role: string
  readonly description: string
}

export interface TeamContent {
  readonly members: TeamMember[]
  readonly collaborators: string[]
  readonly participants: string[]
}
