# cap-foundations

Umbrella for the Cap design system packages.

## Packages

| Package                                                     | Description                                                                  |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [`core`](./core) · `@fluentui-contrib/cap-foundations-core` | Static tokens, color utilities, theme generation pipeline, runtime bootstrap |
| `react` _(Phase 6+)_                                        | React components and `ThemeProvider` — depends on `core`                     |
| `icons` _(Phase 7+)_                                        | SVG icon components — depends on `react`                                     |
| `mock-pages` _(Phase 8+)_                                   | Storybook mock pages — depends on `core` + `react`                           |

## Dependency graph

```
mock-pages → react → core
                  → icons
```

## Quick-start (core only)

```bash
nx run cap-foundations-core:build
nx run cap-foundations-core:test
nx run cap-foundations-core:type-check
```
