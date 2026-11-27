# Theme Rules Schema Definition

This document describes the `theme-rules.json` schema — the single source of truth for all `@fluentui-contrib/cap-foundations-core` theming rules, token structure, color group logic, and derivation rules.

## Overview

The theme rules schema defines:

- **Semantic colors** — Fixed colors for consistent UX meaning across all themes
- **Color groups** — 11 named groups, each with 18 tokens (bg × 4, border × 4, fg × 10)
- **Feedback surfaces** — Soft tinted backgrounds for alerts and notifications
- **Special tokens** — Focus ring, text selection, links, scrollbar, skeleton, highlight
- **Component tokens** — Shortcut tokens for common component size/spacing patterns
- **Color derivation rules** — How secondary/accent/neutral are computed from the theme's primary color
- **Tonal surface overrides** — CSS class system that redefines tokens in a scoped context
- **Accessibility requirements** — WCAG contrast standards enforced by the generator
- **Theme input schema** — Structure that theme JSON files must follow

---

## Semantic Colors

Fixed colors that remain consistent across **all themes** for UX clarity. Users learn that green = success, red = danger, etc., regardless of the active theme.

```json
"semanticColors": {
  "success": { "base": "#16a34a" },
  "warning": { "base": "#f59e0b" },
  "danger":  { "base": "#dc2626" },
  "info":    { "base": "theme:primary" }
}
```

| Color     | Value           | Purpose                                          |
| --------- | --------------- | ------------------------------------------------ |
| `success` | `#16a34a`       | Positive outcomes, confirmations, completion     |
| `warning` | `#f59e0b`       | Caution states, attention needed, pending        |
| `danger`  | `#dc2626`       | Errors, destructive actions, critical states     |
| `info`    | `theme:primary` | Informational — tracks the theme's primary color |

> **Important:** `success`, `warning`, and `danger` are fixed and not customizable. `info` always matches the active theme's primary color.

---

## Color Groups

The color group system is the core of the theming engine. There are **11 named groups**, each generating **18 CSS custom properties**. When you pick a group as your component's background, you use only that group's foreground tokens — contrast is guaranteed.

### Group Names

| Group      | Description                                            |
| ---------- | ------------------------------------------------------ |
| `softer`   | Most subtle — closest to white (light) or black (dark) |
| `soft`     | Subtle — slight step toward white/black                |
| `base`     | Default page content, main surface                     |
| `strong`   | Emphasized — 10% darker (light) or lighter (dark)      |
| `stronger` | Maximum tonal emphasis                                 |
| `primary`  | Selection, active states, branded elements             |
| `inverted` | Opposite color scheme — for tooltips and callouts      |
| `success`  | Solid green — for success buttons and actions          |
| `warning`  | Solid amber — for warning buttons and actions          |
| `danger`   | Solid red — for destructive actions                    |
| `info`     | Solid primary — for informational actions              |

### Token Structure (18 per group)

Each group generates CSS variables prefixed with `--{group}-`:

```
Background tokens (4):
  --{group}-bg             Normal background
  --{group}-bg-hover       Hovered background
  --{group}-bg-pressed     Active / pressed background
  --{group}-bg-disabled    Disabled state background

Border tokens (4):
  --{group}-border          Normal border
  --{group}-border-hover    Hovered border
  --{group}-border-pressed  Pressed border
  --{group}-border-disabled Disabled border

Foreground tokens (10):
  --{group}-fg              Primary text
  --{group}-fg-soft         Secondary text (~70% opacity)
  --{group}-fg-softer       Tertiary text (~55% opacity)
  --{group}-fg-strong       Higher-contrast text
  --{group}-fg-stronger     Maximum contrast text
  --{group}-fg-primary      Primary-colored text / links
  --{group}-fg-danger       Danger-colored text
  --{group}-fg-success      Success-colored text
  --{group}-fg-warning      Warning-colored text
  --{group}-fg-info         Info-colored text
```

### Usage Pattern

```css
/* Pick one group for your surface background, use that group's tokens */
.my-card {
  background: var(--base-bg);
  color: var(--base-fg);
  border: 1px solid var(--base-border);
}

.my-card:hover {
  background: var(--base-bg-hover);
  border-color: var(--base-border-hover);
}

/* On a primary-colored button, fg tokens guarantee contrast */
.btn-primary {
  background: var(--primary-bg);
  color: var(--primary-fg);
  border-color: var(--primary-border);
}
```

### Group Derivation

Tonal groups (`softer` → `stronger`) are derived from the page background using lightness shifts. Semantic groups (`primary`, `success`, `warning`, `danger`, `info`) are derived from their respective semantic or theme color.

| Group      | Source color       | `bg` derivation (light / dark)                 |
| ---------- | ------------------ | ---------------------------------------------- |
| `softer`   | Page background    | `lighten(page.bg, 10)` / `darken(page.bg, 10)` |
| `soft`     | Page background    | `lighten(page.bg, 5)` / `darken(page.bg, 5)`   |
| `base`     | Page background    | `page.bg` (identity)                           |
| `strong`   | Page background    | `darken(page.bg, 10)` / `lighten(page.bg, 10)` |
| `stronger` | Page background    | `darken(page.bg, 20)` / `lighten(page.bg, 20)` |
| `primary`  | `theme:primary`    | `theme:primary`                                |
| `inverted` | Fixed defaults     | `#1a1a1a` (light) / `#fafafa` (dark)           |
| `success`  | `semantic:success` | `semantic:success`                             |
| `warning`  | `semantic:warning` | `semantic:warning`                             |
| `danger`   | `semantic:danger`  | `semantic:danger`                              |
| `info`     | `theme:primary`    | `theme:primary`                                |

---

## Feedback Surfaces

Feedback surfaces produce **soft tinted backgrounds** for alert components. They are distinct from color groups — the tint is subtle enough that the page background shows through.

| Token prefix          | Source color       | `bg` (light)                  | `bg` (dark)                   |
| --------------------- | ------------------ | ----------------------------- | ----------------------------- |
| `--feedback-success-` | `semantic:success` | `mix(page.bg, success, 0.12)` | `mix(page.bg, success, 0.18)` |
| `--feedback-warning-` | `semantic:warning` | `mix(page.bg, warning, 0.12)` | `mix(page.bg, warning, 0.18)` |
| `--feedback-danger-`  | `semantic:danger`  | `mix(page.bg, danger, 0.12)`  | `mix(page.bg, danger, 0.18)`  |
| `--feedback-info-`    | `theme:primary`    | `mix(page.bg, primary, 0.12)` | `mix(page.bg, primary, 0.18)` |

Each feedback prefix provides:

```
--feedback-{role}-bg        Tinted background
--feedback-{role}-bg-hover  Slightly more saturated hover state
--feedback-{role}-fg        Text color (WCAG AA 4.5:1 guaranteed against bg)
--feedback-{role}-border    Tinted border
```

---

## Derivation Syntax

Rules in `theme-rules.json` use a mini-language to describe how token values are computed.

### Reference Patterns

| Syntax             | Description                                 | Example                    |
| ------------------ | ------------------------------------------- | -------------------------- |
| `theme:primary`    | The active theme's primary color            | `"bg": "theme:primary"`    |
| `semantic:success` | A fixed semantic color                      | `"bg": "semantic:success"` |
| `page.bg`          | The resolved page background token          | `"bg": "page.bg"`          |
| `surface.{token}`  | A token resolved within the current surface | `"fg": "surface.base-bg"`  |
| `transparent`      | CSS `transparent`                           | `"border": "transparent"`  |

### Color Function Patterns

| Syntax                             | Description                                         |
| ---------------------------------- | --------------------------------------------------- |
| `darken(color, amount)`            | Darken by `amount` lightness points (0–100)         |
| `lighten(color, amount)`           | Lighten by `amount` lightness points (0–100)        |
| `mix(color1, color2, weight)`      | Blend two colors; `weight` is fraction of `color2`  |
| `contrast(token)`                  | `#ffffff` or `#000000` for best contrast with token |
| `contrastOpacity(token, opacity)`  | Same as `contrast()` but as `rgba(…, opacity/100)`  |
| `accessibleColor(color, bg)`       | Adjust `color` until it meets AA contrast on `bg`   |
| `shiftHue(color, degrees)`         | Rotate HSL hue by `degrees`                         |
| `desaturate(color, amount)`        | Reduce HSL saturation by `amount`                   |
| `adjustSaturation(color, amount)`  | Add/subtract HSL saturation (negative = desaturate) |
| `adjustTemperature(color, amount)` | Positive = warmer, negative = cooler                |

### Mode-Specific Rules

A derivation can specify different values for light and dark mode:

```json
"bg-hover": {
  "light": "darken(theme:primary, 8)",
  "dark":  "lighten(theme:primary, 8)"
}
```

When the rule is a plain string it applies to both modes:

```json
"bg": "theme:primary"
```

### Surface Override Derivations (CSS generation only)

Inside `theme-rules.json`'s `surfaces.types` entries, the `derive:` prefix triggers
run-time resolution during CSS generation — not at the generator's token pass:

```json
"base-fg": "derive:contrast(base-bg)"
```

This lets surface overrides reference tokens defined earlier in the same override block.

---

## Special Tokens

These tokens are generated at the theme level (not per-group) and are available everywhere.

### Focus Ring

```
--focus-ring         Color of focus ring  (derived from theme:primary)
--focus-ring-offset  Space between element and ring  (default: 2px)
--focus-ring-width   Thickness of ring               (default: 2px)
```

### Text Selection

```
--selection-bg    Background of selected text  (mix of primary + white)
--selection-text  Text color of selected text  (always #000000)
```

### Links

```
--link           Default link color     (theme:primary in light, lightened in dark)
--link-hover     Hover state
--link-pressed   Active/pressed state
--link-visited   Visited link color     (blend of primary + purple)
```

### Scrollbar

```
--scrollbar-track        Track background
--scrollbar-thumb        Thumb color
--scrollbar-thumb-hover  Thumb hover color
```

### Skeleton Loading

```
--skeleton-bg       Base color for skeleton placeholders
--skeleton-shimmer  Shimmer highlight overlay
```

### Text Highlight

```
--highlight-bg    Search / code highlight background  (mix of primary + white)
--highlight-text  Text color on highlighted span     (always #000000)
```

---

## Component Tokens

Fixed-size shortcut tokens for common component patterns.

```
--control-height-sm   28px
--control-height-md   36px
--control-height-lg   44px
--button-padding-x    var(--space-4)
--button-padding-y    var(--space-2)
--button-radius       var(--radius-md)
--input-padding-x     var(--space-3)
--card-padding        var(--space-4)
--modal-padding       var(--space-6)
--avatar-size-sm      24px
--avatar-size-md      32px
--avatar-size-lg      48px
```

These reference spacing tokens (`--space-*`) and radius tokens (`--radius-*`) defined in the static token layer.

---

## Color Derivation Rules

Auto-derived colors when optional theme fields are omitted:

| Rule                     | Formula                   | Description                                    |
| ------------------------ | ------------------------- | ---------------------------------------------- |
| `secondary-from-primary` | `shiftHue(primary, 15)`   | Secondary: primary hue rotated 15°             |
| `accent-from-primary`    | `shiftHue(primary, 180)`  | Accent: complementary (opposite) hue           |
| `neutral-from-primary`   | `desaturate(primary, 80)` | Neutral/gray: primary desaturated by 80 points |

---

## Tonal Surface System

Surfaces are CSS classes (`<div class="surface raised">`) that **reset and selectively override** color group tokens for a scoped context. This ensures nested components pick up the right colors without explicit prop drilling.

### How It Works

The theme selector emits internal CSS variables (`--_0`, `--_1`, …) that store the original theme-level values for every color group token. Every `.surface` class resets all group tokens back to these internal variables, then a modifier class (`.raised`, `.primary`, etc.) applies its specific overrides. This means any depth of surface nesting stays isolated.

```
[data-theme='default'][data-mode='light'] {
  --_0: #fafafa;   /* base-bg original */
  --_1: #f0f0f0;   /* base-bg-hover original */
  /* ... ~240 internal tokens ... */

  --base-bg: var(--_0);
  /* ... all public tokens ... */

  & .surface {
    --base-bg: var(--_0);  /* always reset to theme level */
    & .raised {
      --base-bg: #ffffff;  /* override specific token */
    }
  }
}
```

### Surface Modifiers

| Modifier   | Description                                                   |
| ---------- | ------------------------------------------------------------- |
| `base`     | Explicit reset to page defaults (same as `.surface` alone)    |
| `raised`   | Elevated content — cards, panels — brighter in light mode     |
| `sunken`   | Recessed areas — input wells, sidebars — dimmer in light mode |
| `soft`     | Subtle step toward white (light) / black (dark)               |
| `softer`   | Most subtle step toward white (light) / black (dark)          |
| `strong`   | Emphasized — darker (light) or lighter (dark) than page       |
| `stronger` | Maximum tonal emphasis                                        |
| `inverted` | Opposite color scheme — for tooltips, callouts                |
| `primary`  | Primary brand color background — for teaching bubbles, CTAs   |

Feedback modifiers map the feedback surface tokens onto `--base-*`:

| Modifier  | Maps to                |
| --------- | ---------------------- |
| `success` | `--feedback-success-*` |
| `warning` | `--feedback-warning-*` |
| `danger`  | `--feedback-danger-*`  |
| `info`    | `--feedback-info-*`    |

### Usage

```html
<!-- Cards float above the page -->
<div class="surface raised">
  <h2>Card title</h2>

  <!-- Primary button adapts for contrast on raised surface -->
  <button style="background: var(--primary-bg); color: var(--primary-fg);">Save</button>
</div>

<!-- Inverted tooltip -->
<div class="surface inverted" role="tooltip">Brief description</div>

<!-- Success alert using feedback surface -->
<div class="surface success" role="alert">File saved successfully.</div>
```

### Accessibility Enforcement

When the generator emits a surface class, it also computes per-surface overrides for all semantic color groups (`primary`, `success`, `warning`, `danger`, `info`). If the group's `bg` color has insufficient contrast (< 3:1) against the surface's `base-bg`, or if both colors share the same hue family, the generator flips the group's tokens to either white or near-black to restore legibility.

---

## Accessibility Requirements

WCAG contrast ratios enforced automatically by `generateThemeTokens` and `generateThemeCSS`.

### AA Level (default)

| Content type        | Minimum ratio |
| ------------------- | ------------- |
| Normal text         | 4.5 : 1       |
| Large text (18 px+) | 3.0 : 1       |
| UI components       | 3.0 : 1       |

### AAA Level (opt-in via `"accessibility": { "level": "AAA" }`)

| Content type        | Minimum ratio |
| ------------------- | ------------- |
| Normal text         | 7.0 : 1       |
| Large text (18 px+) | 4.5 : 1       |
| UI components       | 4.5 : 1       |

> **Note:** The generator uses a slightly elevated target (5.5:1) for dark-mode foreground tokens because blues and greens can appear perceptually dim even at 4.5:1.

---

## Theme Input Schema

Defines what a theme JSON file must contain. The generator validates this at load time via `validateTheme()`.

### Required Fields

| Field            | Type   | Constraints           | Description                    |
| ---------------- | ------ | --------------------- | ------------------------------ |
| `id`             | string | `/^[a-z][a-z0-9-]*$/` | Unique slug, e.g. `"my-theme"` |
| `name`           | string | —                     | Display name                   |
| `colors.primary` | string | hex color             | Primary brand color            |

### Optional Fields

| Field                  | Type   | Description                                                        |
| ---------------------- | ------ | ------------------------------------------------------------------ |
| `description`          | string | Human-readable description                                         |
| `colors.secondary`     | string | Secondary color (auto-derived: `shiftHue(primary, 15)` if omitted) |
| `colors.accent`        | string | Accent color (auto-derived: `shiftHue(primary, 180)` if omitted)   |
| `colors.neutral`       | string | Neutral/gray (auto-derived: `desaturate(primary, 80)` if omitted)  |
| `config.saturation`    | number | Adjust all color saturations (−100 to +100)                        |
| `config.temperature`   | number | Shift color warmth (positive = warmer, negative = cooler)          |
| `typography.fontSans`  | string | CSS font-family string for sans-serif stack                        |
| `typography.fontMono`  | string | CSS font-family string for monospace stack                         |
| `typography.fontSerif` | string | CSS font-family string for serif stack                             |
| `typography.baseSize`  | number | Base font size in pixels (default: 15)                             |
| `typography.scale`     | number | Font size scale multiplier (default: 1.0)                          |
| `radii.scale`          | number | Border radius multiplier (default: 1.0)                            |
| `radii.style`          | enum   | `"sharp"` \| `"subtle"` \| `"rounded"` \| `"pill"`                 |
| `accessibility.level`  | enum   | `"AA"` (default) \| `"AAA"`                                        |
| `overrides.light`      | object | Direct `--token: value` overrides for light mode                   |
| `overrides.dark`       | object | Direct `--token: value` overrides for dark mode                    |

### Minimal Example

```json
{
  "id": "ocean",
  "name": "Ocean",
  "description": "Cool blue tones inspired by deep water",
  "colors": {
    "primary": "#0284c7"
  },
  "accessibility": { "level": "AA" }
}
```

### Full Example

```json
{
  "id": "ocean",
  "name": "Ocean",
  "description": "Cool blue tones inspired by deep water",
  "colors": {
    "primary": "#0284c7",
    "secondary": "#0ea5e9",
    "accent": "#6366f1",
    "neutral": "#475569"
  },
  "config": {
    "saturation": 10,
    "temperature": -15
  },
  "typography": {
    "fontSans": "Inter, system-ui, sans-serif",
    "fontMono": "JetBrains Mono, monospace",
    "baseSize": 15
  },
  "radii": {
    "style": "rounded",
    "scale": 1.0
  },
  "accessibility": { "level": "AA" },
  "overrides": {
    "light": { "--page-bg": "#f0f9ff" },
    "dark": { "--page-bg": "#082f49" }
  }
}
```

---

## CSS Output Structure

The generator (`generateThemeCSS`) wraps all tokens inside a scoped selector:

```css
[data-theme='ocean'][data-mode='light'] {
  /* Internal preservation tokens (short names) */
  --_0: <base-bg>;
  --_1: <base-bg-hover>;
  /* ... ~240 internal tokens ... */

  /* All public tokens */
  --base-bg: <value>;
  --base-fg: <value>;
  /* ... ~300+ tokens ... */

  /* Base typography */
  & body {
    font-family: var(--font-sans);
    font-size: var(--text-base);
    color: var(--base-fg);
    background: var(--base-bg);
  }

  /* Tonal surface classes */
  & .surface { … }
  & .surface.raised { … }
  & .surface.inverted { … }
  & .surface.primary { … }
  /* … etc. */
}
```

Apply the theme by setting `data-theme` and `data-mode` on a root element:

```html
<html data-theme="ocean" data-mode="light">
  …
</html>
```

Switch modes at runtime:

```js
document.documentElement.setAttribute('data-mode', 'dark');
```
