# AGENTS.md — Coding Agent Guide for fluentui-contrib

Nx monorepo of `@fluentui-contrib/*` packages extending Microsoft's Fluent UI v9 design system.
Package manager: **Yarn 4** (`yarn@4.12.0`). Build orchestration: **Nx 22**. Node: `^20.19.0 || ^22.12.0`.

## Environment Setup

Use Corepack to ensure the expected Yarn version is active:

```sh
corepack enable
corepack prepare yarn@4.12.0 --activate
yarn --version
node --version
```

## Build / Lint / Test Commands

All commands run from the **repo root**. Never `cd` into a package folder.

```sh
# Run a target for a specific package (<name> = folder name under packages/)
yarn nx run <name>:build          # Build a package (SWC-based)
yarn nx run <name>:test           # Run all Jest tests for a package
yarn nx run <name>:lint           # Lint a package
yarn nx run <name>:type-check     # TypeScript type checking
yarn nx run <name>:storybook      # Start Storybook dev server

# Run a single test file
yarn nx run <name>:test -- --testPathPattern="ComponentName.test"

# Run a single test by name
yarn nx run <name>:test -- --testNamePattern="should render correctly"

# Run affected targets (compares against main branch)
yarn nx affected --target=build
yarn nx affected --target=test
yarn nx affected --target=lint

# Format check/write
yarn nx format:check --base=main
yarn nx format:write --base=main

# Playwright component tests (only packages that have them)
yarn nx run <name>:component-test

# Dependency version consistency
yarn check-dependencies
```

## Project Structure

```
packages/<name>/
  src/
    index.ts                      # Package entry point — explicit named exports (no `export *`)
    components/<ComponentName>/
      <ComponentName>.tsx          # Component definition
      <ComponentName>.types.ts     # Props, State, Slots types
      <ComponentName>.styles.ts    # makeStyles + style hook
      <ComponentName>.test.tsx     # Co-located Jest tests
      use<ComponentName>.ts        # State/logic hook
      render<ComponentName>.tsx    # Render function (Fluent v9 pattern)
      index.ts                     # Component barrel exports
  project.json                     # Nx project config with targets
  jest.config.ts                   # SWC-based Jest config
  tsconfig.json                    # Solution-style TS config
  tsconfig.lib.json                # Library build config
  tsconfig.spec.json               # Test config (commonjs, jest+node types)
  eslint.config.js                 # Extends root config
  .swcrc                           # SWC compiler options
```

## Code Style

### TypeScript

- **Strict mode** is enabled globally (`tsconfig.base.json` sets `"strict": true`)
- **Explicit return types** on all exported functions (`@typescript-eslint/explicit-module-boundary-types: error`); relaxed in test files
- **No `export *` in package index.ts** — use explicit named exports (enforced by `@rnx-kit/no-export-all`)
- Component-level barrel files may use `export *` or `export type *`
- Prefer `type` keyword for type-only re-exports: `export type { FooProps } from './Foo.types'`

### Formatting (Prettier)

- **Single quotes** (`singleQuote: true`)
- 2-space indentation (`.editorconfig`)
- Insert final newline, trim trailing whitespace
- Line length guideline: 120 characters (VS Code ruler)

### Imports

Order imports in groups separated by blank lines:

1. React: `import * as React from 'react'` (always namespace import for React)
2. Third-party libraries (`@dnd-kit/*`, etc.)
3. Fluent UI (`@fluentui/react-components`, `@fluentui/react-jsx-runtime`, etc.)
4. Internal/relative imports

### Naming Conventions

- **Components**: PascalCase (`DraggableDialog`, `ChatMessage`)
- **Hooks**: `use<Name>` (e.g., `useKeytipRef`, `useDraggableDialog`)
- **Fluent v9 hooks/render fns**: `_unstable` suffix (`useChat_unstable`, `renderChat_unstable`)
- **Types**: `<Component>Props`, `<Component>State`, `<Component>Slots`
- **Style hooks**: `use<Component>Styles_unstable`
- **CSS class names constant**: `<component>ClassNames` (e.g., `chatMessageClassNames`)
- **CSS class prefix**: `fui-<ComponentName>` (e.g., `fui-Chat`, `fui-ChatMessage__body`)
- **Display names**: Always set (`Component.displayName = 'ComponentName'`)
- **Files**: PascalCase for components (`ComponentName.tsx`), camelCase for hooks (`useHookName.ts`)

### Restricted Globals

Direct use of browser globals is **banned** in source files (eslint `no-restricted-globals`):
`window`, `document`, `navigator`, `location`, `performance`, `fetch`,
`setTimeout`/`setInterval`/`clearTimeout`/`clearInterval`,
`requestAnimationFrame`/`cancelAnimationFrame`,
`IntersectionObserver`, `MutationObserver`, `ResizeObserver`, `matchMedia`,
`getComputedStyle`, `customElements`, `devicePixelRatio`.

Access these via Fluent UI's `useFluent_unstable()` or equivalent context-based utilities.
This restriction is **turned off** in test/spec files.

Also avoid: `cancelIdleCallback`, `requestIdleCallback`, `setImmediate`, `clearImmediate`.

### Restricted Types

These React types are banned (eslint `@typescript-eslint/no-restricted-types`):

- `React.RefAttributes` → use `RefAttributes` (direct import)
- `JSX.Element` / `React.JSX.Element` → use `JSXElement`
- `JSX.IntrinsicElements` / `React.JSX.IntrinsicElements` → banned

## Testing

### Jest Unit Tests

- Test files: `<Name>.test.tsx` or `<Name>.test.ts`, **co-located** with source (not in `__tests__/`)
- Use `describe`/`it` blocks (not bare `test()`)
- Rendering: `import { render, screen } from '@testing-library/react'`
- Hooks: `import { renderHook, act } from '@testing-library/react'`
- User interaction: `import userEvent from '@testing-library/user-event'`
- Mocking: `jest.fn()`, `jest.mock()`, `jest.spyOn()`
- Test environment: jsdom (configured in jest preset)

### Test Scope Policy

- Start with the smallest relevant target, e.g. `yarn nx run <name>:test` or a single `--testPathPattern`
- If behavior might impact other packages, run affected tests: `yarn nx affected --target=test`
- For purely type-level/API changes, run `yarn nx run <name>:type-check`
- Don’t expand to whole-repo runs unless needed to validate the change

### React Version Compatibility

When changing shared hooks/types/utilities, validate compatibility in the versioned test apps:

- `apps/react-17-tests`
- `apps/react-18-tests`
- `apps/react-19-tests`

### Playwright Component Tests

- File: `<Name>.component-browser-spec.tsx` with companion `<Name>Example.component-browser-spec.tsx`
- Import from `@playwright/experimental-ct-react`
- Use `test`/`expect` from Playwright (not Jest)
- Run with: `yarn nx run <name>:component-test`

## Component Patterns

### Fluent v9 Slot-Based Pattern (preferred for complex components)

```tsx
// useComponent.ts — state hook
export const useComponent_unstable = (props: ComponentProps, ref: React.Ref<HTMLElement>): ComponentState => { ... };

// Component.styles.ts — style hook
export const useComponentStyles_unstable = (state: ComponentState): ComponentState => { ... };

// renderComponent.tsx — render function (uses Fluent JSX runtime)
/** @jsxRuntime classic */
/** @jsx createElement */
import { createElement } from '@fluentui/react-jsx-runtime';
export const renderComponent_unstable = (state: ComponentState) => { ... };

// Component.tsx — composing everything
export const Component: ForwardRefComponent<ComponentProps> = React.forwardRef((props, ref) => {
  const state = useComponent_unstable(props, ref);
  useComponentStyles_unstable(state);
  return renderComponent_unstable(state);
});
Component.displayName = 'Component';
```

### Simple Wrapper Pattern (for lightweight components)

```tsx
export const Component: React.FC<ComponentProps> = React.memo((props) => { ... });
Component.displayName = 'Component';
```

## Commits & Change Management

### Semantic Commits

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <short summary>
```

Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`.
Scope is typically the package name (e.g., `feat(react-keytips): add shortcut display`).

### Changesets (Beachball)

- Uses **Beachball** for versioning (independent per-package)
- **Before submitting a PR**, run `yarn change` to generate a changeset file describing your changes
- CI will fail (`npx beachball check`) if a changeset is missing for packages with source changes
- npm scope: `@fluentui-contrib/<package-name>`
- Files ignored for changeset requirements are defined in `beachball.config.js` (`ignorePatterns`)

## Scaffolding New Code

```sh
# New package
yarn nx generate @fluentui-contrib/nx-plugin:library <name>

# New component in existing package
yarn nx generate @fluentui-contrib/nx-plugin:component <package-name> <ComponentName>

# Add storybook to package
yarn nx generate @fluentui-contrib/nx-plugin:configure-storybook <name>

# Add Playwright component testing
yarn nx generate @fluentui-contrib/nx-plugin:playwright-component-configuration <name>
```
