# cap-foundations

Umbrella for the Cap design system packages.

## Packages

| Package                                                        | Description                                                                  |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [`core`](./core) · `@fluentui-contrib/cap-foundations-core`    | Static tokens, color utilities, theme generation pipeline, runtime bootstrap |
| [`react`](./react) · `@fluentui-contrib/cap-foundations-react` | React `ThemeProvider`, `useTheme`, and components — depends on `core`        |
| `icons` _(Phase 8+)_                                           | SVG icon components — depends on `react`                                     |
| `mock-pages` _(Phase 9+)_                                      | Storybook mock pages — depends on `core` + `react`                           |

## Dependency graph

```
mock-pages → react → core
                  → icons
```

## Quick-start

```bash
# core
nx run cap-foundations-core:build
nx run cap-foundations-core:test
nx run cap-foundations-core:type-check

# react
nx run cap-foundations-react:build
nx run cap-foundations-react:test
nx run cap-foundations-react:type-check

# Storybook (build themes first)
nx run cap-foundations-core:build-themes
nx run cap-foundations-react:storybook
```
