# Project Overview

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

# Building and Running

The following scripts are available in `package.json` to run, build, and manage the project.

- **Run in development mode**:
  ```bash
  pnpm dev
  ```
- **Create a production build**:
  ```bash
  pnpm build
  ```
- **Start the production server**:
  ```bash
  pnpm start
  ```
- **Lint the codebase**:
  ```bash
  pnpm lint
  ```

# Development Conventions

- **Project Structure**: The project follows the Next.js `app` directory structure. It is organized into sub-projects for different neighborhoods, such as `(hub)`, `conjuntohabitacionalrengifo`, and `villacovico`.
- **Path Aliases**: The project uses path aliases for cleaner imports, configured in `tsconfig.json`. For example, `@/*` points to the root directory.
- **Content Management**: Content is decoupled from the UI code and is managed in dedicated `content` folders within each sub-project. This makes it easier to update information without touching the application logic.
- **Styling**: The project uses Tailwind CSS for styling, with a `globals.css` file for base styles.
- **Types**: TypeScript types are defined in `.d.ts` files within the `types` directories, ensuring type safety across the application.
