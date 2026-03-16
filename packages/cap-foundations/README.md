# cap-foundations

Umbrella for the Cap design system packages inside `fluentui-contrib`.

## Packages

| Package | Description |
|---------|-------------|
| [`core`](./core) · `@fluentui-contrib/cap-foundations-core` | Static tokens, color utilities, theme generation pipeline, runtime bootstrap |
| `react` *(Phase 6+)* | React components and `ThemeProvider` — depends on `core` |
| `icons` *(Phase 7+)* | SVG icon components — depends on `react` |
| `mock-pages` *(Phase 8+)* | Storybook mock pages — depends on `core` + `react` |

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
