# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`cap-foundations` is the Cap design system package set, hosted inside `fluentui-contrib` as a nested Nx monorepo. It provides design tokens, color utilities, theme generation, and a runtime bootstrap for applying CSS custom properties.

## Packages

| Package                                   | Location                               | Description                                                        |
| ----------------------------------------- | -------------------------------------- | ------------------------------------------------------------------ |
| `@fluentui-contrib/cap-foundations-core`  | `packages/cap-foundations/core/`       | Static tokens, colors, surfaces, theme pipeline, runtime bootstrap |
| `@fluentui-contrib/cap-foundations-react` | `packages/cap-foundations/react/`      | React `ThemeProvider`, `useTheme` hook, and components             |
| `mock-pages` _(Phase 8+)_                 | `packages/cap-foundations/mock-pages/` | Storybook mock pages                                               |

## Common Commands

All commands are run from the `fluentui-contrib` root unless noted otherwise.

### Development

```bash
# Install all dependencies
yarn install

# core
yarn nx build cap-foundations-core
yarn nx type-check cap-foundations-core
yarn nx lint cap-foundations-core

# react
yarn nx build cap-foundations-react
yarn nx type-check cap-foundations-react
yarn nx lint cap-foundations-react
```

### Testing

```bash
# core (Jest, testEnvironment: node)
yarn nx test cap-foundations-core
yarn nx test cap-foundations-core --watch
yarn nx test cap-foundations-core --testFile=src/colors/dynamicSurface.test.ts

# react (Jest, testEnvironment: jsdom)
yarn nx test cap-foundations-react
```

### Build scripts

These scripts use ts-node in CJS mode (`tsconfig.scripts.json`):

```bash
# Generate CSS theme files (outputs to dist/themes/)
yarn nx run cap-foundations-core:build-themes

# Generate bootstrap bundle (outputs dist/bootstrap.js + dist/bootstrap.min.js)
yarn nx run cap-foundations-core:build-bootstrap
```

### Storybook

```bash
# Build theme CSS first (staticDir served at /themes in Storybook)
yarn nx run cap-foundations-core:build-themes

# Start Storybook (port 4401)
yarn nx run cap-foundations-react:storybook

# Build static Storybook
yarn nx run cap-foundations-react:build-storybook
```

### Nx project graph

```bash
# View dependency graph
yarn nx graph

# Show affected projects from a change
yarn nx affected:graph
```

## Architecture

### Token system

Tokens are CSS custom properties organized into:

- **Static tokens** (`spacing`, `typography`, `radii`, `shadows`, `animation`, `gradients`) — never change with theme
- **Dynamic tokens** (color groups `base`, `soft`, `softer`, `strong`, `stronger`, `primary`, `inverted`, `success`, `warning`, `danger`, `info`) — change with light/dark mode

The "stay within your color group" rule is fundamental: `--{group}-bg` must only be paired with `--{group}-fg` and `--{group}-border`. See `core/TOKEN_GUIDE.md`.

### Theme pipeline

1. **`theme-rules.json`** — defines hues, saturations, and lightness curves
2. **`generator.ts`** — reads rules and outputs CSS custom property values
3. **`build-themes.ts`** — script that writes `dist/themes/*.css` and `dist/themes/manifest.json`

Themes target `[data-theme="default-light"]` and `[data-theme="default-dark"]` selectors.

### Runtime bootstrap

`bootstrap.ts` provides `CapFoundations`, an SSR-safe API that:

- reads/writes `data-theme` and `data-mode` attributes
- persists user selection in localStorage (`key: "cap-foundations-theme"`)
- fires callbacks on theme changes

All browser globals are guarded: `typeof window !== 'undefined'`, `typeof document !== 'undefined'`, etc.

`inline-bootstrap.ts` generates an inline `<style>+<script>` HTML string for embedding in server-rendered HTML to prevent flicker.

## Important Development Notes

### SSR safety is mandatory

Every file in `src/runtime/` and `src/build/` must guard all browser APIs. The package is consumed in server-rendered environments. Patterns:

```typescript
// ✅ CORRECT
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', theme);
}

// ✅ CORRECT
const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('cap-foundations-theme') : null;

// ❌ WRONG - crashes in SSR
document.documentElement.setAttribute('data-theme', theme);
```

### ESLint and browser globals

This package uses `eslint-plugin-no-restricted-globals`. Do NOT reference browser globals without `typeof` guards. The ESLint config in `packages/cap-foundations/` enforces this.

### TypeScript compiler

The package uses **SWC** (not `tsc`) for compilation. `tsconfig.json` controls type-checking only. Do not rely on `tsc --emit`.

- `tsconfig.json` — main config for type-check target
- `tsconfig.scripts.json` — CJS mode for ts-node scripts (`esModuleInterop: true`, `module: commonjs`)

### Test runner

Tests use **Jest** with `@swc/jest` transformer (not Vitest). No `it.skipIf()` — use the pattern:

```typescript
const hasDom = typeof document !== 'undefined';
const itDom = hasDom ? it : it.skip;

itDom('manipulates DOM', () => { ... });
```

### JSON imports

Scripts that import `.json` files need:

- `resolveJsonModule: true` in their tsconfig
- `esModuleInterop: true` for default imports

```typescript
import defaultTheme from '../themes/definitions/default.json';
```

### No top-level await in CJS scripts

`tsconfig.scripts.json` uses `"module": "commonjs"`. Wrap async script entry points:

```typescript
// ✅ CORRECT
async function run() {
  await doWork();
}
run().catch(console.error);

// ❌ WRONG - not valid in CJS
await doWork();
```

### Package manager

This repo uses **Yarn 4** (Berry). Never use `npm` or `pnpm` commands here.

```bash
# Install
yarn install

# Add a dependency to cap-foundations-core
yarn workspace @fluentui-contrib/cap-foundations-core add some-package

# Add a dev dependency
yarn workspace @fluentui-contrib/cap-foundations-core add -D some-package
```

### Nx project names

| Package                                   | Nx project name         |
| ----------------------------------------- | ----------------------- |
| `@fluentui-contrib/cap-foundations-core`  | `cap-foundations-core`  |
| `@fluentui-contrib/cap-foundations-react` | `cap-foundations-react` |

```bash
yarn nx build cap-foundations-core
yarn nx build cap-foundations-react
```

## File Structure

```
packages/cap-foundations/
├── CLAUDE.md                  ← This file
├── README.md
├── docs/
│   └── TOKEN_CHEATSHEET.md    ← Quick token reference
├── core/                      ← @fluentui-contrib/cap-foundations-core
│   ├── TOKEN_GUIDE.md          ← Complete token documentation
│   ├── package.json
│   ├── project.json            ← Nx project config
│   ├── tsconfig.json
│   ├── tsconfig.scripts.json
│   └── src/
│       ├── index.ts
│       ├── tokens/             ← spacing, typography, radii, shadows, animation, gradients
│       ├── colors/             ← color utils, dynamic surfaces
│       ├── surfaces/           ← surface type definitions
│       ├── themes/             ← generator, definitions, schema
│       ├── runtime/            ← SSR-safe bootstrap API
│       ├── build/              ← inline-bootstrap (Node-safe)
│       └── scripts/            ← build-themes, build-bootstrap (ts-node)
└── react/                     ← @fluentui-contrib/cap-foundations-react
    ├── COMPONENT_GUIDE.md      ← Component authoring standards
    ├── package.json
    ├── project.json
    ├── tsconfig.json
    ├── .babelrc                ← Required by Storybook webpack
    ├── .storybook/             ← Storybook config (port 4401)
    ├── stories/                ← Story files (index.stories.tsx per component)
    └── src/
        ├── index.ts
        ├── css.d.ts            ← CSS Module type declaration
        ├── context/
        │   └── ThemeProvider.tsx
        └── styles/
            └── z-index.css
```

## Design Token Reference

- Quick reference: `docs/TOKEN_CHEATSHEET.md`
- Full guide: `core/TOKEN_GUIDE.md`
- Theme schema: `core/src/themes/schema/schema-definition.md`
- Theme authoring: `core/src/themes/theme-definition.md`

## React Package Notes

### Classic JSX runtime

`react` uses `"runtime": "classic"` in `.swcrc` / `tsconfig.json`. Every `.tsx` file must begin with:

```tsx
import * as React from 'react';
```

Never omit this import — the automatic runtime is not configured.

### ThemeProvider + useTheme

```tsx
import { ThemeProvider, useTheme } from '@fluentui-contrib/cap-foundations-react';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}

function ThemeSwitcher() {
  const { mode, resolvedMode, toggleMode } = useTheme();
  return <button onClick={toggleMode}>{resolvedMode}</button>;
}
```

`ThemeProvider` reads from `@fluentui-contrib/cap-foundations-core` bootstrap — no FluentUI dependency.

### CSS Modules

Component styles use CSS Modules (`*.module.css`). The type declaration is at `src/css.d.ts`. Never hardcode colors — use design tokens:

```css
/* ✅ */
background: var(--controlPrimary-bg);
padding: var(--space-2) var(--space-4);

/* ❌ */
background: #1a73e8;
```

### Component authoring

See `react/COMPONENT_GUIDE.md` for full standards including `displayName` requirement, sizing, token usage, accessibility, and story structure.

### Storybook

- Config: `react/.storybook/`
- Stories: `react/stories/<ComponentName>/index.stories.tsx`
- Port: 4401
- Theme CSS must be built first: `nx run cap-foundations-core:build-themes`
