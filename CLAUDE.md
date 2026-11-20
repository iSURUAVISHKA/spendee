# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Spendee is a personal-finance (spending tracker) web app: a client-only React 19 + TypeScript 6 + Vite 8 SPA. It is at an early scaffold stage: a login page, an app shell with a sidebar, and a placeholder home page.

## Commands

```bash
npm run dev            # Vite dev server with HMR
npm run build          # tsc -b (type-check) then vite build -> dist/
npm run lint           # ESLint over the repo
npm run format         # Prettier write
npm run format:check   # Prettier check
npm run preview        # serve the built dist/
```

There is no test runner set up yet. `npm run build` is the type-check gate. Node 22.22+ is required (React Router 8); 24 LTS is recommended.

## BEST_PRACTICES.md vs. the current code

`BEST_PRACTICES.md` is the documented architecture to grow into. Read it before adding features. It specifies:

- Folders `src/app/` (store, router), `src/pages/`, `src/modules/<domain>/` (transactions, categories, budgets) and `src/shared/`.
- Imports only flow `app → pages → modules → shared`. Code outside a module imports only from that module's `index.ts`.
- Redux Toolkit + RTK Query for state: one `createApi` in `shared/api/baseApi.ts` with `baseUrl: import.meta.env.VITE_API_URL`. Modules add endpoints with `enhanceEndpoints({ addTagTypes }).injectEndpoints(...)`. Server data lives only in the RTK Query cache. Slices hold only browser state shared across components, with past-tense action names (`searchChanged`). Use `useAppSelector` / `useAppDispatch` from `app/hooks.ts`.
- No route `loader`s or `action`s. RTK Query is the only data layer.
- PascalCase component folders and files, and named exports. Pages are thin files grouped in PascalCase area folders (`src/pages/Auth/LoginPage.tsx`). Each area's components, types and assets live in a matching module (`src/modules/auth/`).

New code follows `BEST_PRACTICES.md`. The rules in `.claude/rules/` (`structure.md` holds the layout, import chain and naming) and the skills in `.claude/skills/` are written for it.

**Part of the scaffold predates it and hasn't been migrated.** The pages, `src/modules/auth/` and `src/shared/` already follow it. Redux and RTK Query are not installed, and there is no `app/` folder yet. One file still sits outside the layout: `src/router.tsx` belongs in `src/app/`. Ask before moving it.

## Current architecture

- **Entry:** `src/main.tsx` renders `<BrowserRouter>` around `<AppRoutes />`, with global styles from `src/index.css`.
- **Routing:** declarative mode. `src/router.tsx` exports `AppRoutes`, which renders `<Routes>` with nested `<Route element={...}>` entries. Don't use `createBrowserRouter`/`RouterProvider` or data-mode APIs (`loader`, `action`, `useFetcher`, `useNavigation`, `useBlocker`). `/login` (`src/pages/Auth/LoginPage.tsx`) is a standalone page. Everything else is a child of `AppLayout` (`src/shared/components/AppLayout/AppLayout.tsx`: `Sidebar` from `src/shared/widgets/Sidebar/` plus `<Outlet />`). Import from `react-router`. `react-router-dom` is not used in v8 and must not be installed.
- **Leftovers:** `src/App.tsx` and `src/App.css` are the unused Vite template. Nothing imports them.
- **Path alias:** `@/*` → `src/*`. It is configured in both `vite.config.ts` and `tsconfig*.json`.

## UI and styling

- Tailwind CSS v4 through `@tailwindcss/vite`. There is no `tailwind.config`. The theme is defined in `src/index.css` (`@theme inline` maps CSS variables to Tailwind colors and radii).
- **Dark-only app.** `index.html` sets `class="dark"`, and `:root` in `index.css` holds the only theme values. Design colors are hex values. Tokens marked "Not in the design yet" are leftover shadcn defaults. Custom tokens include `--foreground-strong`, `--link`, `--income` and `--primary-gradient`. Each color value is defined once, so reuse the existing token instead of adding a duplicate.
- **Components are our own, built on Base UI** (`@base-ui/react`, unstyled and accessible). shadcn/ui is not used. Base UI's docs ship in `node_modules/@base-ui/react/docs/react/` and override anything you remember. Each component has its own PascalCase folder (`src/shared/components/Button/Button.tsx`, `Card/Card.tsx`). Wrap new Base UI primitives with the `add-base-ui` skill.
- Primary button: `Button`'s `primary` variant, which is also the default, has a 2px gradient outline from the `--primary-gradient` token and fills with the gradient on hover. Add new looks as variants in `Button/buttonVariants.ts`, not as new button components. `size="lg"` is the 48px (14px × 24px padding) size used on the login form.
- Icons: Hugeicons (`@hugeicons/react` + `@hugeicons/core-free-icons`).
- `cn()` from `@/shared/utils/cn` re-exports the `cn` package, which works like clsx + tailwind-merge.
- Font: Figtree Variable via `@fontsource-variable/figtree`.

## Code rules enforced by tooling

- `tsconfig.app.json` enables `verbatimModuleSyntax` (use `import type` for type-only imports), `erasableSyntaxOnly` (no `enum` or `namespace`; use union types), and `noUnusedLocals` / `noUnusedParameters`.
- ESLint forbids interface names prefixed with `I` (`IUser`). Unused vars are allowed only with a `_` prefix. Empty `catch` blocks are allowed.
- Prettier: no semicolons, single quotes, `printWidth` 100. `eslint-config-prettier` must stay last in `eslint.config.js`.
