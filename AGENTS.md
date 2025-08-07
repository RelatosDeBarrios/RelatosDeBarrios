# AGENTS.md

## Project Overview

This is a Next.js web project called "Relatos de Barrios". Its main purpose is to document and showcase the industrial and architectural heritage of neighborhoods in La Serena and Coquimbo, Chile. The project highlights specific areas like "Villa Covico" and "Conjunto Habitacional Rengifo", presenting historical information, architectural plans, and digital archives.

The project is built with a modern web stack, including:

- **Framework**: Next.js (with Turbopack)
- **Language**: TypeScript
- **UI Library**: React
- **Styling**: Tailwind CSS
- **Animation**: GSAP (GreenSock Animation Platform)
- **State Management**: Zustand
- **Linting**: ESLint
- **Package Manager**: pnpm

## Technical Overview & Architecture Rules

- **Project Structure:**
  - Monorepo-style Next.js project with multiple sub-apps under `app/`.
  - Each app (e.g., `hub`, `conjuntohabitacionalrengifo`, `villacovico`) is self-contained with its own pages, components, content, and styles.
  - Shared logic and types are in root-level `utils/` and `types/`.
  - Public assets are organized by app and type under `public/`.
- **Architecture Rules:**
  - Use path aliases (`@/hub/*`, `@/rengifo/*`, `@/covico/*`) for imports.
  - Group components by feature/section within each app.
  - Place shared utilities and types in the root folders.
  - Keep static content/config in `content/` folders.
  - Organize assets by app and type.
  - Enforce strict typing and explicit error handling.

## Build, Lint, and Test

- **Build:** `pnpm build` (Next.js build)
- **Dev:** `pnpm dev` (local dev server)
- **Lint:** `pnpm lint` (Next.js/ESLint)
- **Test:** _No test script defined; add one if tests are introduced._
- **Single test:** _Not applicable unless a test runner is added._

## Code Style Guidelines

- **Formatting:**
  - Use Prettier (2 spaces, print width 80, single quotes, no semicolons, trailing commas where valid)
  - Tailwind CSS classes sorted by Prettier plugin
- **Imports:**
  - Use path aliases (`@/hub/*`, `@/rengifo/*`, `@/covico/*`)
  - Prefer absolute imports over relative where possible
- **Types:**
  - TypeScript strict mode enabled; always type function arguments and return values
- **Naming:**
  - Use camelCase for variables/functions, PascalCase for components/types
- **Error Handling:**
  - Prefer explicit error handling; avoid silent failures
- **Linting:**
  - Follows Next.js core-web-vitals and TypeScript ESLint rules

_If you add tests, update this file with test commands and conventions._
