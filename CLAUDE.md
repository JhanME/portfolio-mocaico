# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start dev server (localhost:3000)
- `npm run build` — Production build
- `npm run start` — Serve production build
- `npm run lint` — Run ESLint (flat config with next/core-web-vitals + next/typescript)

No test framework is configured.

## Architecture

Single-page portfolio site for a computer engineer, built with **Next.js 16** (App Router), **React 19**, **TypeScript**, and **Tailwind CSS v4**.

### Routing & Structure

There is only one route (`/`). The page is a scroll-based SPA with sections: Hero, About, Projects, Services, Footer. Navigation uses anchor links (`#inicio`, `#acerca`, `#proyectos`, `#servicios`).

- `app/layout.tsx` — Root layout with full SEO metadata, dark mode init script, Geist fonts
- `app/page.tsx` — Entire UI as a single `"use client"` component; all section markup, state, and content
- `app/globals.css` — Tailwind v4 imports, dark mode variant, `expandCircle`/`shrinkCircle` keyframes
- `app/robots.ts`, `app/sitemap.ts` — SEO metadata routes

### Key Patterns

- **All content data** lives in the `DATA` constant at the top of `page.tsx`. There is no CMS or external data source. **Important:** `DATA.services` entries contain JSX elements (Lucide icons) as the `icon` field — this object cannot be serialized to JSON or moved to a separate data file without refactoring.
- **Dark mode** uses `.dark` class on `<html>`, persisted to `localStorage`. A blocking inline `<script>` in `layout.tsx` reads `localStorage` before hydration to prevent flash-of-wrong-theme (FOUC). Both `<html>` and `<body>` have `suppressHydrationWarning` for this reason — do not remove these. The dark-mode toggle uses a CSS `clip-path` circle animation (`expandCircle` in `globals.css`).
- **Scroll spy** tracks active navbar section by comparing `window.scrollY + 150` against section `offsetTop`, with a special case to force `servicios` when the page bottom is reached.
- **Typewriter effect** cycles through `phrases` in `page.tsx` using `useState`/`useEffect` timers (no library).
- **`experienceMonths`** is computed dynamically from a hardcoded start date (`new Date(2026, 0, 5)`) inside the component — update this date when employment changes.
- **No API routes, no middleware, no external state management.** All state is local React hooks.

### Styling

Tailwind CSS v4 via `@tailwindcss/postcss`. Dark mode variant defined as `@variant dark (&:where(.dark, .dark *))` in `globals.css`. Fonts wired via `@theme` block: `--font-family-sans` and `--font-family-mono` map to the Geist CSS variables injected by `next/font/google`.

### Public Assets

All static files served from `/public`:
- `mocaico.jpeg`, `jhan2.jpeg` — profile photos used in Hero and About sections
- `algoritmia.png`, `fonekids.png`, `airguardian.png` — project card images
- `Jhan_Mocaico_CVv.pdf` — CV linked in the Hero download button
- `opengraph-image.png` — OG/Twitter card image (1200×630)

### Dependencies

- `lucide-react` — All icons
- `next/image` — Optimized images for projects and profile photos

### SEO

Canonical URL: `https://www.mocaico.dev`. Language is Spanish (`es`). Full Open Graph, Twitter cards metadata in `layout.tsx`. Person schema JSON-LD is rendered inline in `page.tsx` via `dangerouslySetInnerHTML`.

### Path Alias

`@/*` maps to the project root (configured in `tsconfig.json`).
