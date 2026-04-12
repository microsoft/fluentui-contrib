# cap-foundations Migration — Progress Tracker

> Tracking implementation of cap-foundations-migration-PLAN

---

## Legend

| Symbol | Meaning            |
| ------ | ------------------ |
| ✅     | Complete           |
| 🔄     | In progress        |
| ⬜     | Not started        |
| ⏭️     | Skipped / deferred |

---

## Phase 0: Workspace Setup ✅

**Status**: Complete
**Date**: 2026-03-16

### Completed steps

- [x] Added `"packages/cap-foundations/*"` to `workspaces` in [fluentui-contrib/package.json](../fluentui-contrib/package.json)
- [x] Repurposed the empty `packages/cap-foundations/` placeholder — converted to umbrella folder
- [x] Moved all package config files into `packages/cap-foundations/core/`
- [x] Fixed all relative path depths in moved config files (`../../` → `../../../`)
- [x] Renamed project: `cap-foundations` → `cap-foundations-core`
- [x] Renamed npm package: `@fluentui-contrib/cap-foundations` → `@fluentui-contrib/cap-foundations-core`
- [x] Updated tsconfig.base.json alias: `@fluentui-contrib/cap-foundations-core` → `packages/cap-foundations/core/src/index.ts`
- [x] Ran `yarn install` to register the new workspace glob
- [x] Created `packages/cap-foundations/README.md` (umbrella docs)
- [x] Created `packages/cap-foundations/core/README.md` (package docs)

### Verification

| Command                                  | Result                                          |
| ---------------------------------------- | ----------------------------------------------- |
| `nx run cap-foundations-core:type-check` | ✅ Pass                                         |
| `nx run cap-foundations-core:build`      | ✅ Pass — SWC compiles `lib/` + `lib-commonjs/` |
| `nx run cap-foundations-core:test`       | ✅ Pass — no tests yet (passWithNoTests: true)  |

### Key files created / modified

| File                                                                                                                     | Change                                                            |
| ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| [fluentui-contrib/package.json](../fluentui-contrib/package.json)                                                        | Added `packages/cap-foundations/*` to workspaces                  |
| [fluentui-contrib/tsconfig.base.json](../fluentui-contrib/tsconfig.base.json)                                            | Updated alias to `cap-foundations-core` → `core/src/index.ts`     |
| [packages/cap-foundations/core/package.json](../fluentui-contrib/packages/cap-foundations/core/package.json)             | Renamed package, removed `private: true`                          |
| [packages/cap-foundations/core/project.json](../fluentui-contrib/packages/cap-foundations/core/project.json)             | Updated name, sourceRoot, paths                                   |
| [packages/cap-foundations/core/tsconfig.json](../fluentui-contrib/packages/cap-foundations/core/tsconfig.json)           | Fixed extends path                                                |
| [packages/cap-foundations/core/tsconfig.lib.json](../fluentui-contrib/packages/cap-foundations/core/tsconfig.lib.json)   | Fixed outDir                                                      |
| [packages/cap-foundations/core/tsconfig.spec.json](../fluentui-contrib/packages/cap-foundations/core/tsconfig.spec.json) | Fixed outDir                                                      |
| [packages/cap-foundations/core/eslint.config.js](../fluentui-contrib/packages/cap-foundations/core/eslint.config.js)     | Fixed require path                                                |
| [packages/cap-foundations/core/jest.config.cts](../fluentui-contrib/packages/cap-foundations/core/jest.config.cts)       | Fixed displayName, preset, coverageDirectory; changed env to node |
| [packages/cap-foundations/README.md](../fluentui-contrib/packages/cap-foundations/README.md)                             | Rewritten as umbrella docs                                        |
| [packages/cap-foundations/core/README.md](../fluentui-contrib/packages/cap-foundations/core/README.md)                   | Created                                                           |

---

## Phase 1: Static Token Foundation ✅

**Status**: Complete
**Date**: 2026-03-16
**Depends on**: Phase 0 ✅

### Steps

- [x] Port `spacing.ts`
- [x] Port `typography.ts`
- [x] Port `radii.ts`
- [x] Port `shadows.ts`
- [x] Port `animation.ts`
- [x] Port `gradients.ts`
- [x] Port `tokens/index.ts` barrel
- [x] Update `core/src/index.ts` to re-export `./tokens`
- [x] Verify `type-check` + `build` pass

**Source**: `ai-experiments/packages/ui-kit/core/src/tokens/`
**Target**: `packages/cap-foundations/core/src/tokens/`

### Verification

| Command                                  | Result                                           |
| ---------------------------------------- | ------------------------------------------------ |
| `nx run cap-foundations-core:type-check` | ✅ Pass                                          |
| `nx run cap-foundations-core:build`      | ✅ Pass — SWC compiles 8 files (7 token + index) |

### Notes

- No import substitutions needed — all token files are self-contained (no `@ui-kit/core` imports)
- `dist/lib/tokens/` contains all 6 individual token modules + barrel
- `staticTokens` aggregate object available at `@fluentui-contrib/cap-foundations-core`

---

## Phase 2: Color Utilities & Surface Definitions ✅

**Status**: Complete
**Date**: 2026-03-16
**Depends on**: Phase 1 ✅

### Steps

- [x] Port `colors/utils.ts`
- [x] Port `colors/dynamicSurface.ts`
- [x] Audit npm color deps — none needed (pure math, no external deps)
- [x] Port `surfaces/definitions.ts`
- [x] Port `surfaces/types.ts`
- [x] Port `surfaces/index.ts`
- [x] Port `themes/types.ts`
- [x] Wire all exports in `core/src/index.ts`
- [x] Port + convert `dynamicSurface.test.ts` (vitest → jest)
- [x] Verify type-check + build + test pass

**Source**: `ai-experiments/packages/ui-kit/core/src/colors/` + `surfaces/` + `themes/types.ts`

### Verification

| Command                                  | Result                                               |
| ---------------------------------------- | ---------------------------------------------------- |
| `nx run cap-foundations-core:type-check` | ✅ Pass                                              |
| `nx run cap-foundations-core:build`      | ✅ Pass — SWC compiles 15 files                      |
| `nx run cap-foundations-core:test`       | ✅ Pass — 28 passed, 4 skipped (DOM tests, node env) |

### Notes

- No npm dependencies needed — color math is pure TypeScript
- `injectSurfaceStyles` already had `typeof document === 'undefined'` guard (SSR-safe)
- `it.skipIf(!hasDom)` (Vitest) converted to `const itDom = hasDom ? it : it.skip` (Jest)
- 4 DOM-dependent tests correctly skip in `testEnvironment: node`

---

## Phase 3: Theme Generation Pipeline ✅

**Status**: Complete
**Date**: 2026-03-17
**Depends on**: Phase 2 ✅

### Steps

- [x] Port `themes/definitions/default.json`
- [x] Port `themes/generator.ts` (direct copy — all imports already in place)
- [x] Port `themes/schema/theme-rules.json`
- [x] Port `themes/definitions.ts` (adapted: only `default.json`, exports `defaultTheme` + `themes` array)
- [x] Create `themes/index.ts` (exports types, definitions, generator — no storage)
- [x] Port + adapt `scripts/build-themes.ts` (CJS `__dirname` instead of ESM `fileURLToPath(import.meta.url)`, no `.js` extension imports)
- [x] Create `tsconfig.scripts.json` (module: commonjs, resolveJsonModule, esModuleInterop for ts-node)
- [x] Add `resolveJsonModule: true` + `allowSyntheticDefaultImports: true` to `core/tsconfig.json` (for JSON type import)
- [x] Register `build-themes` Nx target in `project.json` (uses `npx ts-node --project tsconfig.scripts.json`)
- [x] Wire all theme exports in `core/src/index.ts`
- [x] Verify type-check + build + test + build-themes pass

**Source**: `ai-experiments/packages/ui-kit/core/src/themes/` + `scripts/build-themes.ts`
**Target**: `packages/cap-foundations/core/src/themes/` + `scripts/build-themes.ts`

### Verification

| Command                                    | Result                                                                                   |
| ------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `nx run cap-foundations-core:type-check`   | ✅ Pass                                                                                  |
| `nx run cap-foundations-core:build`        | ✅ Pass — SWC compiles 18 files                                                          |
| `nx run cap-foundations-core:test`         | ✅ Pass — 28 passed, 4 skipped                                                           |
| `nx run cap-foundations-core:build-themes` | ✅ Pass — generates default-light.css (35 KB) + default-dark.css (33 KB) + manifest.json |

### Notes

- `generator.ts` is a direct copy — all 1439 lines, all imports were already in the target package
- `definitions.ts` adapted: imports only `default.json`, exports `defaultTheme` and `themes` array (no 20-theme registry)
- `themes/index.ts` excludes `storage` (runtime theme storage not needed in core package)
- `build-themes.ts` adapted: CJS-compatible — uses `__dirname` natively (no `fileURLToPath`), drops `.js` from import paths
- ts-node runs with `tsconfig.scripts.json` (module: commonjs + esModuleInterop) to ensure JSON default imports work correctly
- `dist/themes/` output is git-ignored; generated as part of build pipeline
- CSS output: `[data-theme='default'][data-mode='light']` selector with all token custom properties + surface classes

---

## Phase 4: Runtime Bootstrap ✅

**Status**: Complete
**Date**: 2026-03-17
**Depends on**: Phase 3 ✅

### Steps

- [x] Port `runtime/bootstrap.ts` with SSR-safe wrappers (`typeof window !== 'undefined'`, etc.)
- [x] Port `runtime/index.ts`
- [x] Port `build/inline-bootstrap.ts` (Node-safe HTML generator)
- [x] Port + adapt `scripts/build-bootstrap.ts` (wrapped in `async run()` — CJS ts-node has no top-level await)
- [x] Register `build-bootstrap` Nx target in `project.json`
- [x] Export runtime API from `core/src/index.ts`
- [x] Verify type-check + build + test + build-bootstrap pass

**Source**: `ai-experiments/packages/ui-kit/core/src/runtime/` + `src/build/` + `scripts/build-bootstrap.ts`
**Target**: `packages/cap-foundations/core/src/runtime/` + `src/build/` + `scripts/build-bootstrap.ts`

### Verification

| Command                                       | Result                                                          |
| --------------------------------------------- | --------------------------------------------------------------- |
| `nx run cap-foundations-core:type-check`      | ✅ Pass                                                         |
| `nx run cap-foundations-core:build`           | ✅ Pass — SWC compiles 21 files                                 |
| `nx run cap-foundations-core:test`            | ✅ Pass — 28 passed, 4 skipped                                  |
| `nx run cap-foundations-core:build-bootstrap` | ✅ Pass — dist/bootstrap.js (12 KB) + bootstrap.min.js (7.7 KB) |

### Notes

- All `window`, `document`, `localStorage`, `matchMedia`, `getComputedStyle` calls guarded with `typeof X !== 'undefined'`
- `resolveMode()` returns `'light'` when called in Node (no `window.matchMedia`)
- `loadThemeCSS()` calls callback immediately and returns when `document` unavailable
- `applyToDOM()` and `init()` are no-ops in Node — no errors thrown
- `getInlineBootstrap()` / `getBootstrapScript()` in `build/inline-bootstrap.ts` are 100% Node-safe (no browser APIs)
- API renamed: `UIKit` → `CapFoundations`, `UIKitConfig` → `CapFoundationsConfig`, storage key `uikit-theme` → `cap-foundations-theme`
- `build-bootstrap.ts` adapted: top-level `await` replaced with explicit `async run()` function (CJS module mode in tsconfig.scripts.json)
- esbuild already present in workspace root `node_modules` — no additional dependency needed

---

## Phase 5: Documentation & AI Agents ✅

**Status**: Complete
**Date**: 2026-03-17
**Parallel with**: Phase 4

### Steps

- [x] Port + trim `TOKEN_GUIDE.md` → `core/TOKEN_GUIDE.md` (update all `@ui-kit/core` references)
- [x] Port + trim `TOKEN_CHEATSHEET.md` → `docs/TOKEN_CHEATSHEET.md`
- [x] Adapt `CLAUDE.md` → `packages/cap-foundations/CLAUDE.md` (strip non-DS content, add fluentui-contrib conventions)
- [x] Port `ui-token-auditor.md` → `.claude/agents/`
- [x] Port `react-component-architect.md` → `.claude/agents/`
- [x] Port `ui-design-systems-expert.md` → `.claude/agents/`
- [x] Port + adapt `coding-conventions.md` → `docs/coding-conventions.md`
- [x] Verify: grep for `@ui-kit` → zero matches across all ported docs

### Verification

| Check                                                   | Result          |
| ------------------------------------------------------- | --------------- |
| `@ui-kit` matches in `packages/cap-foundations/**/*.md` | ✅ Zero matches |

### Key files created

| File                                                                   | Description                                                                         |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `packages/cap-foundations/CLAUDE.md`                                   | AI guidance: commands, architecture, SSR rules, Yarn/Nx/Jest/SWC toolchain          |
| `packages/cap-foundations/core/TOKEN_GUIDE.md`                         | Full token reference: color groups, surfaces, static tokens, dynamic surfaces, a11y |
| `packages/cap-foundations/docs/TOKEN_CHEATSHEET.md`                    | Quick reference: groups, state variants, foreground variants, quick-lookup table    |
| `packages/cap-foundations/docs/coding-conventions.md`                  | TS/React/CSS conventions + SSR safety, Jest/SWC/Yarn/no-top-level-await rules       |
| `packages/cap-foundations/.claude/agents/ui-token-auditor.md`          | Audits CSS/HTML for token compliance and color-group violations                     |
| `packages/cap-foundations/.claude/agents/react-component-architect.md` | React component architecture, API design, performance, token integration            |
| `packages/cap-foundations/.claude/agents/ui-design-systems-expert.md`  | UI design, consistency reviews, accessibility validation, motion design             |

### Notes

- `TOKEN_CHEATSHEET.md` placed in `docs/` (not `core/docs/`) — keeps docs flat alongside `coding-conventions.md`
- All agent files reference `@fluentui-contrib/cap-foundations-core` and `docs/TOKEN_CHEATSHEET.md`
- `CLAUDE.md` covers SSR safety patterns, CJS wrap requirement for scripts, and `typeof` guard conventions

---

## Phase 6: React Package + Storybook Setup ✅

**Status**: Complete
**Date**: 2026-03-18
**Depends on**: Phase 4 ✅

### Steps

- [x] Create `packages/cap-foundations/react/package.json` (`@fluentui-contrib/cap-foundations-react`)
- [x] Create `project.json` with build / lint / test / type-check / storybook / build-storybook targets
- [x] Create `tsconfig.json` / `tsconfig.lib.json` / `tsconfig.spec.json`
- [x] Create `.swcrc` (identical to core, `runtime: "classic"`)
- [x] Create `jest.config.cts` (`testEnvironment: jsdom`, `[tj]sx?$` transform)
- [x] Create `eslint.config.js`
- [x] Create `.babelrc` (extends `../../../babel.config.json` — required by Storybook webpack)
- [x] Port `ThemeProvider.tsx` — imports `CapFoundationsThemeState` from core; `import * as React` for classic JSX runtime
- [x] Create `src/css.d.ts` (CSS Module type declaration)
- [x] Create `src/styles/z-index.css` (z-index custom properties scale)
- [x] Create `src/index.ts` — exports `ThemeProvider`, `useTheme`, `ThemeProviderProps`
- [x] Add `@fluentui-contrib/cap-foundations-react` path alias to `tsconfig.base.json`
- [x] Create `.storybook/main.ts` — extends root config via `../../../../.storybook/main`; `staticDirs` serves `core/dist/themes` at `/themes`
- [x] Create `.storybook/preview.tsx` — standalone decorator sets `data-theme="default"` + `data-mode="light"`; calls `CapFoundations.configure`
- [x] Create `.storybook/tsconfig.json`
- [x] Create `stories/overview/index.stories.tsx` (Token Verification story with live mode toggle)
- [x] Create `COMPONENT_GUIDE.md` (adapted from source with fluentui-contrib conventions)
- [x] Create `README.md`
- [x] Run `yarn install` to register new workspace package
- [x] Verify type-check + build + lint + test + storybook pass

### Verification

| Command                                   | Result                                                       |
| ----------------------------------------- | ------------------------------------------------------------ |
| `nx run cap-foundations-react:type-check` | ✅ Pass                                                      |
| `nx run cap-foundations-react:build`      | ✅ Pass — SWC compiles 3 files                               |
| `nx run cap-foundations-react:lint`       | ✅ Pass — 0 errors                                           |
| `nx run cap-foundations-react:test`       | ✅ Pass — no tests yet (passWithNoTests: true)               |
| `nx run cap-foundations-react:storybook`  | ✅ Starts at http://localhost:4401/ — Overview story visible |

### Notes

- Classic JSX runtime (`react` not `automatic`) — `import * as React from 'react'` required in all `.tsx` files
- `resolveJsonModule: true` + `allowSyntheticDefaultImports: true` added to `tsconfig.json` — required so type-checking react doesn't fail when following import chains into core's JSON-importing theme modules
- `react-dom` omitted from peerDependencies — not directly used
- `.babelrc` required in package root — Storybook webpack (Babel loader) looks for it relative to the package; three `../` levels up to root `babel.config.json`
- `.storybook/main.ts` uses `../../../../.storybook/main` (four levels) — package is nested one level deeper than flat `packages/react-*` packages
- Overview story is `.tsx` not `.mdx` — the MDX webpack loader from addon-docs was not applied to the nested path; TSX works without special loader config
- Storybook preview is standalone — does not spread root preview, avoids inheriting `FluentProvider` decorator; cap-foundations has no dependency on `@fluentui/react-components`
- `nx run cap-foundations-core:build-themes` must run before Storybook (theme CSS served as staticDir at `/themes`)

### Key files created

| File                                                                | Description                                                           |
| ------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `packages/cap-foundations/react/package.json`                       | Package manifest — peer: react; dep: core + @swc/helpers              |
| `packages/cap-foundations/react/project.json`                       | Nx targets: build, lint, test, type-check, storybook, build-storybook |
| `packages/cap-foundations/react/tsconfig.json`                      | jsx:react, resolveJsonModule, allowSyntheticDefaultImports            |
| `packages/cap-foundations/react/tsconfig.lib.json`                  | Includes `*.ts` + `*.tsx`                                             |
| `packages/cap-foundations/react/tsconfig.spec.json`                 | module:commonjs, jest+node types                                      |
| `packages/cap-foundations/react/.swcrc`                             | tsx:true, runtime:classic                                             |
| `packages/cap-foundations/react/jest.config.cts`                    | jsdom env, `[tj]sx?$` transform                                       |
| `packages/cap-foundations/react/eslint.config.js`                   | Extends root ESLint config                                            |
| `packages/cap-foundations/react/.babelrc`                           | Extends `../../../babel.config.json`                                  |
| `packages/cap-foundations/react/src/context/ThemeProvider.tsx`      | ThemeProvider + useTheme hook                                         |
| `packages/cap-foundations/react/src/css.d.ts`                       | CSS Module type declaration                                           |
| `packages/cap-foundations/react/src/styles/z-index.css`             | Z-index custom property scale                                         |
| `packages/cap-foundations/react/src/index.ts`                       | Public API barrel                                                     |
| `packages/cap-foundations/react/.storybook/main.ts`                 | staticDirs → core/dist/themes at /themes                              |
| `packages/cap-foundations/react/.storybook/preview.tsx`             | data-theme decorator + CapFoundations.configure                       |
| `packages/cap-foundations/react/.storybook/tsconfig.json`           | Storybook TS config                                                   |
| `packages/cap-foundations/react/stories/overview/index.stories.tsx` | Token verification story with live mode toggle                        |
| `packages/cap-foundations/react/COMPONENT_GUIDE.md`                 | Component authoring standards + fluentui-contrib conventions          |
| `packages/cap-foundations/react/README.md`                          | Package docs                                                          |
| `fluentui-contrib/tsconfig.base.json`                               | Added `@fluentui-contrib/cap-foundations-react` path alias            |

---

## Phase 7: First Component (Button) ✅

**Status**: Complete
**Date**: 2026-03-19
**Depends on**: Phase 6 ✅

### Steps

- [x] Add `@fluentui/react-icons` as peerDependency in `packages/cap-foundations/react/package.json`
- [x] Run the Button generation prompt using GitHub Copilot
- [x] Verify all expected output files were created
- [x] Fix lint issues: `no-restricted-globals` in `.storybook/preview.tsx`; `@nx/dependency-checks` override for test-only deps
- [x] Verify type-check + build + lint + test pass

### Verification

| Command                                   | Result                          |
| ----------------------------------------- | ------------------------------- |
| `nx run cap-foundations-react:type-check` | ✅ Pass                         |
| `nx run cap-foundations-react:build`      | ✅ Pass                         |
| `nx run cap-foundations-react:lint`       | ✅ Pass — 0 errors              |
| `nx run cap-foundations-react:test`       | ✅ Pass — 32 passed, 0 failed   |
| `nx run cap-foundations-react:storybook`  | ✅ Starts — Button stories visible |

### Key files created

| File                                                                          | Description                                         |
| ----------------------------------------------------------------------------- | --------------------------------------------------- |
| `packages/cap-foundations/react/src/components/Button/Button.tsx`             | Button component — variants, sizes, as prop, icons  |
| `packages/cap-foundations/react/src/components/Button/Button.module.css`      | CSS Module — control tokens, 28/36/44px heights     |
| `packages/cap-foundations/react/src/components/Button/index.ts`               | Barrel export                                       |
| `packages/cap-foundations/react/src/components/Button/Button.test.tsx`        | 32 Jest tests — render, variants, keyboard, anchor  |
| `packages/cap-foundations/react/stories/Button/index.stories.tsx`             | Storybook stories — all variants, sizes, icons      |

### Notes

- Component generated via AI prompt — not ported from `ai-experiments`
- `@fluentui/react-icons` removed from peerDependencies — package itself doesn't import it (stories only); not needed as peer
- `preview.tsx` is browser-only (Storybook context) — `/* eslint-disable no-restricted-globals */` is correct here
- `eslint.config.js` overrides `@nx/dependency-checks` to ignore `@testing-library/jest-dom` (test-only dep, correctly in devDependencies)

---

## Future Phases

| Phase   | Description                                | Status |
| ------- | ------------------------------------------ | ------ |
| Phase 8 | Mock pages + Storybook                     | ⬜     |
| Phase 9 | Expansion (more themes, hooks, components) | ⬜     |

---

## Notes & Decisions Log

| Date       | Note                                                                                                                                                              |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-03-16 | Decided to move existing `packages/cap-foundations/` config files into `core/` rather than running Nx generator + moving (same result, more predictable)          |
| 2026-03-16 | Changed `testEnvironment` from `jsdom` to `node` in `jest.config.cts` — core package has no browser DOM dependencies; SSR-safe wrappers used for any browser APIs |
| 2026-03-19 | Phase 7 Button generated via AI prompt (GitHub Copilot), not ported — validates the designer/AI authoring workflow |
| 2026-03-19 | `@fluentui/react-icons` kept out of peerDependencies — used only in stories, not in `src/`; `@nx/dependency-checks` rule override added for `@testing-library/jest-dom` |
