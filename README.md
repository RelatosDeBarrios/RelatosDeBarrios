# Relatos de Barrios

A multi-app Next.js monorepo showcasing neighborhood stories through interactive galleries and immersive experiences.

## 🏗️ Project Architecture

This is a monorepo-style Next.js application containing multiple independent apps under a single codebase:

- **`app/hub/`** - Landing hub connecting all neighborhood projects
- **`app/conjuntohabitacionalrengifo/`** - Conjunto Habitacional Rengifo project
- **`app/villacovico/`** - Villa Covico project

Each app is self-contained with its own pages, components, content, styles, and logic, while sharing common utilities and types at the root level.

## 🛠️ Technology Stack

| Category         | Technology                  |
| ---------------- | --------------------------- |
| Framework        | Next.js 15 (with Turbopack) |
| Language         | TypeScript (strict mode)    |
| UI Library       | React 19                    |
| Styling          | Tailwind CSS                |
| Animation        | GSAP (GreenSock)            |
| State Management | Zustand                     |
| Validation       | Zod                         |
| Package Manager  | pnpm                        |
| Linting          | ESLint + Prettier           |

## 📁 Project Structure

```
RelatosDeBarrios/
├── app/                          # Next.js app directory
│   ├── hub/                      # Landing hub app
│   ├── conjuntohabitacionalrengifo/  # Rengifo project
│   └── villacovico/              # Covico project
├── content/                      # Shared content/config
├── hooks/                        # Shared React hooks
├── public/                       # Static assets (by app)
├── styles/                       # Global styles
├── types/                        # Shared TypeScript types
└── utils/                        # Shared utilities
```

### Path Aliases

```typescript
@/hub/*       → app/hub/*
@/rengifo/*   → app/conjuntohabitacionalrengifo/*
@/covico/*    → app/villacovico/*
@/*           → root/*
```

## 🖼️ Gallery System Architecture

The project uses a **factory pattern** for creating independent, reusable gallery stores with **type factories** for section-specific type safety—all while sharing a single global store instance.

### Core Components

#### 1. **Factory Function** (`/hooks/createGalleryStore.ts`)

Creates Zustand stores with consistent gallery logic:

```typescript
const store = createGalleryStore()
```

**Store State:**

- `currentGalleryId: string | null` - Current gallery identifier
- `currentImageIndex: number` - Current image position
- `isGalleryOpen: boolean` - Gallery open/closed state

**Store Actions:**

- `openGallery(id, startIndex)` - Open gallery at specific image
- `closeGallery()` - Close and reset gallery
- `setImageIndex(index)` - Navigate to image
- `nextImage()` - Navigate forward (circular)
- `prevImage()` - Navigate backward (circular)

#### 2. **Per-App Store Instances**

Each app creates its own singleton store:

**Rengifo (Simple):** `/app/conjuntohabitacionalrengifo/store/galleryStore.ts`

```typescript
import { createGalleryStore } from '@/hooks/createGalleryStore'
export const useGalleryStore = createGalleryStore()
```

**Covico (Advanced with Type Factory):** `/app/villacovico/feature/gallery/store/covicoGalleryStore.ts`

```typescript
import { createGalleryStore } from '@/hooks/createGalleryStore'

// Single global store instance
export const useCovicoGallery = createGalleryStore()

// Type factory for section-specific hooks
export function createCovicoGallery<TGalleryItems extends string = string>() {
  return useCovicoGallery as UseBoundStore<
    StoreApi<{
      currentGalleryId: TGalleryItems | null
      // ... rest of store interface
    }>
  >
}
```

#### 3. **Type Factory Pattern** (Advanced)

The type factory allows multiple sections to use the **same global store** while maintaining **section-specific type safety** with zero runtime overhead.

**Benefits:**

- ✅ Single source of truth (one store instance)
- ✅ Section-scoped autocomplete for gallery IDs
- ✅ Type safety prevents using wrong gallery IDs
- ✅ Zero runtime overhead (compile-time only)

**Example Usage:**

```typescript
// Visual Archive section
// /sections/visual-archive/hooks/useVisualArchiveGallery.ts
import { createCovicoGallery } from '@/covico/feature/gallery/store/covicoGalleryStore'
import type { VisualArchiveGalleryItems } from '../types'

export const useVisualArchiveGallery = createCovicoGallery<VisualArchiveGalleryItems>()

// Plans section
// /sections/plans/store/usePlansGallery.ts
import { createCovicoGallery } from '@/covico/feature/gallery/store/covicoGalleryStore'
import { PlanType } from '../types'

export const usePlansGallery = createCovicoGallery<PlanType>()
```

**In Components:**

```typescript
// Visual Archive component
const openGallery = useVisualArchiveGallery((state) => state.openGallery)
openGallery('illustration-1', 0) // ✅ Type-safe, autocomplete works
openGallery('plan-a', 0) // ❌ Type error: wrong gallery ID

// Plans component
const openGallery = usePlansGallery((state) => state.openGallery)
openGallery('plan-a', 0) // ✅ Type-safe, autocomplete works
openGallery('illustration-1', 0) // ❌ Type error: wrong gallery ID
```

**Both hooks share the SAME store instance**, so opening a gallery from any section updates the same global state. The type factory is purely a compile-time type cast.

#### 4. **Content Structure**

Gallery data is defined in static configuration files:

```typescript
// /app/conjuntohabitacionalrengifo/content/photos.ts
export const PHOTOS_CONTENT = {
  sections: [
    {
      id: 'actividades',
      title: 'Actividades Colectivas',
      images: ['ACT-01.jpg', 'ACT-02.jpg', ...],
      // ...
    },
    // More sections...
  ]
}
```

#### 5. **Component Integration**

Components trigger gallery opening via store actions:

```typescript
const openGallery = useGalleryStore(state => state.openGallery)

<button onClick={() => openGallery('actividades', 0)}>
  Open Gallery
</button>
```

### Data Flow

```
Content (photos.ts)
    ↓
Store Instance (galleryStore.ts)
    ↓
Type Factory (createCovicoGallery<T>) [optional, for type safety]
    ↓
Section-Specific Hooks (useVisualArchiveGallery, usePlansGallery)
    ↓
Trigger Components (OpenGalleryCard.tsx)
    ↓
Gallery Component (Gallery.tsx)
    ↓
User Interaction (navigation)
    ↓
Store Actions (nextImage, prevImage)
    ↓
All sections reflect changes (single store instance)
```

### Circular Navigation

The system uses utility functions from `/utils/circular.ts`:

- `getNextCircular(current, total)` - Wraparound forward navigation
- `getPreviousCircular(current, total)` - Wraparound backward navigation

This ensures seamless navigation: last image → first image, first image → last image.

### Adding a New Gallery

#### Simple Approach (Single Gallery)

1. **Create content configuration:**

   ```typescript
   // content/galleries.ts
   export const MY_GALLERY = {
     id: 'my-gallery',
     images: ['img1.jpg', 'img2.jpg'],
   }
   ```

2. **Create store instance:**

   ```typescript
   // store/myGalleryStore.ts
   import { createGalleryStore } from '@/hooks/createGalleryStore'
   export const useMyGalleryStore = createGalleryStore()
   ```

3. **Create gallery component:**

   ```typescript
   // components/MyGallery.tsx
   import { useMyGalleryStore } from '../store/myGalleryStore'
   import { MY_GALLERY } from '../content/galleries'

   export function MyGallery() {
     const { currentGalleryId, currentImageIndex, closeGallery } = useMyGalleryStore()
     // Implement gallery UI...
   }
   ```

4. **Add trigger component:**
   ```typescript
   const openGallery = useMyGalleryStore(state => state.openGallery)
   <button onClick={() => openGallery('my-gallery', 0)}>Open</button>
   ```

#### Advanced Approach (Multiple Sections with Type Safety)

1. **Create global store with type factory:**

   ```typescript
   // store/myAppGalleryStore.ts
   import { createGalleryStore } from '@/hooks/createGalleryStore'
   import type { StoreApi, UseBoundStore } from 'zustand'

   export const useMyAppGallery = createGalleryStore()

   export function createMyAppGallery<TGalleryItems extends string = string>() {
     return useMyAppGallery as UseBoundStore<
       StoreApi<{
         currentGalleryId: TGalleryItems | null
         currentImageIndex: number
         isGalleryOpen: boolean
         openGallery: (galleryId: TGalleryItems, startIndex?: number) => void
         closeGallery: () => void
         // ... other actions
       }>
     >
   }
   ```

2. **Define section types:**

   ```typescript
   // sections/section-a/types.ts
   export type SectionAGalleryItems = 'gallery-1' | 'gallery-2'

   // sections/section-b/types.ts
   export type SectionBGalleryItems = 'gallery-a' | 'gallery-b'
   ```

3. **Create typed section hooks:**

   ```typescript
   // sections/section-a/hooks/useSectionAGallery.ts
   import { createMyAppGallery } from '@/store/myAppGalleryStore'
   import type { SectionAGalleryItems } from '../types'

   export const useSectionAGallery = createMyAppGallery<SectionAGalleryItems>()

   // sections/section-b/hooks/useSectionBGallery.ts
   import { createMyAppGallery } from '@/store/myAppGalleryStore'
   import type { SectionBGalleryItems } from '../types'

   export const useSectionBGallery = createMyAppGallery<SectionBGalleryItems>()
   ```

4. **Use in components with type safety:**

   ```typescript
   // sections/section-a/components/GalleryTrigger.tsx
   import { useSectionAGallery } from '../hooks/useSectionAGallery'

   export function GalleryTrigger() {
     const openGallery = useSectionAGallery(state => state.openGallery)
     return (
       <button onClick={() => openGallery('gallery-1', 0)}>
         {/* TypeScript autocomplete: 'gallery-1' | 'gallery-2' */}
       </button>
     )
   }
   ```

## 🚀 Development

### Prerequisites

- Node.js 18+
- pnpm 8+

### Setup

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Run linting
pnpm lint

# Type checking
pnpm type
```

### Development Server

```bash
pnpm dev
```

Access apps at:

- Hub: `http://localhost:3000`
- Rengifo: `http://localhost:3000/conjuntohabitacionalrengifo`
- Covico: `http://localhost:3000/villacovico`

## 📝 Code Style Guidelines

### TypeScript

- **Strict mode enabled** - All code must pass strict type checking
- **Explicit typing** - Always type function parameters and return values
- **No `any` types** - Use specific types or `unknown`

### Imports

```typescript
// ✅ Use path aliases
import { Component } from '@/hub/components/Component'

// ❌ Avoid deep relative paths
import { Component } from '../../../components/Component'
```

### Formatting

- **Indentation:** 2 spaces
- **Print width:** 80 characters
- **Quotes:** Single quotes
- **Semicolons:** None (omit)
- **Trailing commas:** ES5 standard

### Naming Conventions

- **Variables/Functions:** `camelCase`
- **Components/Types:** `PascalCase`
- **Constants:** `UPPER_SNAKE_CASE`
- **Files:** `kebab-case.tsx` or `PascalCase.tsx` for components

### Component Structure

```typescript
// 1. Imports
import { useState } from 'react'
import { useStore } from '../store'

// 2. Types
interface ComponentProps {
  title: string
}

// 3. Component
export function Component({ title }: ComponentProps) {
  // Hooks
  const [state, setState] = useState()

  // Handlers
  const handleClick = () => {}

  // Render
  return <div>{title}</div>
}
```

## 🏛️ Architecture Principles

1. **Separation of Concerns**
   - Each app is self-contained
   - Shared logic in root utilities
   - Content separated from components

2. **Factory Pattern for State**
   - Reusable store creation
   - Per-app singleton instances
   - Consistent API across apps
   - Type factories for section-specific type safety

3. **Type Safety**
   - Strict TypeScript configuration
   - Explicit type definitions
   - Zod for runtime validation
   - Compile-time type factories for zero-overhead safety

4. **Asset Organization**
   - Assets organized by app under `public/`
   - Logical grouping by type/feature
   - Optimized formats (webp, svg)

5. **Performance**
   - Turbopack for fast builds
   - Optimized images and assets
   - Component-level code splitting
   - Zero-runtime overhead type casting

## 📦 Key Dependencies

### Core

- `next@15.1.6` - React framework
- `react@19.0.0` - UI library
- `react-dom@19.0.0` - React renderer

### State & Data

- `zustand@5.0.2` - State management
- `zod@3.24.1` - Schema validation
- `@vercel/blob@0.27.0` - Blob storage

### Animation & UI

- `gsap@3.12.7` - Animation library
- `framer-motion@12.0.0` - Motion primitives
- `tailwindcss@3.4.17` - Utility-first CSS

### Development

- `typescript@5.7.3` - Type system
- `eslint@9.18.0` - Linting
- `prettier@3.4.2` - Code formatting

## 🔧 Configuration Files

- **`next.config.ts`** - Next.js configuration
- **`tsconfig.json`** - TypeScript configuration & path aliases
- **`tailwind.config.ts`** - Tailwind CSS configuration
- **`eslint.config.mjs`** - ESLint rules
- **`.prettierrc`** - Prettier formatting rules
- **`vercel.json`** - Vercel deployment configuration

## 🌐 Deployment

The project is configured for deployment on Vercel with:

- Automatic builds on push
- Environment variable management
- Optimized production builds

```bash
# Build for production
pnpm build

# Preview production build locally
pnpm start
```

## 📄 License

[Add license information]

## 👥 Contributors

[Add contributor information]
