# Theme Definition Guide

This document describes how to create theme JSON files for `@fluentui-contrib/cap-foundations-core`. Themes are defined as JSON files in `src/themes/definitions/` and processed by the generator to produce CSS.

## Quick Start

Minimal theme definition:

```json
{
  "id": "my-theme",
  "name": "My Theme",
  "colors": {
    "primary": "#3b82f6"
  }
}
```

That's it! The generator derives all other colors and tokens automatically.

---

## Complete Theme Structure

```json
{
  "id": "my-theme",
  "name": "My Theme",
  "description": "A custom theme with blue primary color",

  "colors": {
    "primary": "#3b82f6",
    "secondary": "#6366f1",
    "accent": "#f59e0b",
    "neutral": "#64748b"
  },

  "config": {
    "saturation": 0,
    "temperature": 0,
    "contrastBoost": 0
  },

  "typography": {
    "fontSans": "'Inter', sans-serif",
    "fontMono": "'JetBrains Mono', monospace",
    "fontSerif": "'Merriweather', serif",
    "scale": 1.0,
    "baseSize": 15
  },

  "spacing": {
    "scale": 1.0,
    "baseUnit": 4
  },

  "radii": {
    "scale": 1.0,
    "style": "rounded"
  },

  "animation": {
    "scale": 1.0,
    "reduceMotion": false
  },

  "accessibility": {
    "level": "AA"
  },

  "overrides": {
    "light": {
      "--base-bg": "#fafafa"
    },
    "dark": {
      "--base-bg": "#0a0a0a"
    }
  }
}
```

---

## Property Reference

### `id` (required)

Unique identifier for the theme. Used in CSS selectors and generated file names.

- **Type:** `string`
- **Pattern:** `^[a-z][a-z0-9-]*$` (lowercase letters and hyphens only)
- **Examples:** `"default"`, `"high-contrast"`, `"ocean-breeze"`

```json
"id": "ocean-breeze"
```

### `name` (required)

Human-readable display name shown in UI and the manifest.

- **Type:** `string`
- **Examples:** `"Ocean Breeze"`, `"High Contrast"`, `"GitHub Dark"`

```json
"name": "Ocean Breeze"
```

### `description` (optional)

Brief description of the theme's visual style. Included in `manifest.json`.

- **Type:** `string`

```json
"description": "Cool blues and aquatic tones inspired by the ocean"
```

---

## Colors

### `colors.primary` (required)

The main brand color. This is the **only required color** — all others can be derived automatically.

- **Type:** `string` (hex, e.g. `"#2563eb"`)
- **Used for:** Primary buttons (`--primary-bg`), links (`--link`), focus rings (`--focus-ring`), selected states

```json
"colors": {
  "primary": "#2563eb"
}
```

### `colors.secondary` (optional)

Secondary brand color for complementary UI elements.

- **Type:** `string` (hex)
- **Default:** Derived by shifting the primary hue 15°: `shiftHue(primary, 15)`
- **Used for:** Complementary accents, secondary highlights

```json
"colors": {
  "primary":   "#2563eb",
  "secondary": "#7c3aed"
}
```

### `colors.accent` (optional)

Accent/pop color for special callouts and badges.

- **Type:** `string` (hex)
- **Default:** Derived as the complementary color: `shiftHue(primary, 180)`
- **Used for:** Highlights, badges, Copilot flair gradients

```json
"colors": {
  "primary": "#2563eb",
  "accent":  "#f59e0b"
}
```

### `colors.neutral` (optional)

Base neutral/gray for UI chrome.

- **Type:** `string` (hex)
- **Default:** Derived by heavily desaturating primary: `desaturate(primary, 80)`
- **Used for:** Borders, disabled states, muted text

```json
"colors": {
  "primary": "#2563eb",
  "neutral": "#64748b"
}
```

---

## Config (Color Adjustments)

Fine-tune how the primary color palette is processed before tokens are generated.

### `config.saturation`

Adjust the saturation of all derived colors.

- **Type:** `number`
- **Range:** `−100` to `100`
- **Default:** `0`
- **Effect:** Positive → more vibrant. Negative → more muted.

```json
"config": { "saturation": 20 }
```

### `config.temperature`

Shift color temperature across the palette.

- **Type:** `number`
- **Range:** `−100` to `100`
- **Default:** `0`
- **Effect:** Positive → warmer (red/yellow). Negative → cooler (blue).

```json
"config": { "temperature": -15 }
```

### `config.contrastBoost`

Increase contrast between foreground and background tokens.

- **Type:** `number`
- **Range:** `0` to `100`
- **Default:** `0`
- **Effect:** Higher values push foreground colors harder toward black (light) or white (dark).

```json
"config": { "contrastBoost": 20 }
```

---

## Typography

Customize the font stack and type scale.

### `typography.fontSans`

Primary sans-serif font stack.

- **Type:** `string`
- **Default:** `'Segoe UI Web', 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif`

```json
"typography": { "fontSans": "'Inter', -apple-system, sans-serif" }
```

### `typography.fontMono`

Monospace font stack for code and pre-formatted text.

- **Type:** `string`
- **Default:** `'JetBrains Mono', 'Fira Code', 'Consolas', monospace`

```json
"typography": { "fontMono": "'Fira Code', monospace" }
```

### `typography.fontSerif`

Serif font stack for editorial/display content.

- **Type:** `string`
- **Default:** `'Merriweather', Georgia, 'Times New Roman', serif`

```json
"typography": { "fontSerif": "'Playfair Display', Georgia, serif" }
```

### `typography.scale`

Multiplier applied to every generated font-size token.

- **Type:** `number`
- **Default:** `1.0`
- **Effect:** `0.9` = 90% of defaults, `1.1` = 110%.

```json
"typography": { "scale": 1.1 }
```

### `typography.baseSize`

Root font size in pixels from which the type scale is calculated.

- **Type:** `number`
- **Default:** `15`

```json
"typography": { "baseSize": 16 }
```

---

## Spacing

Customize the spacing scale.

### `spacing.scale`

Multiplier applied to all `--space-*` tokens.

- **Type:** `number`
- **Default:** `1.0`
- **Effect:** `0.8` = compact, `1.2` = spacious.

```json
"spacing": { "scale": 0.9 }
```

### `spacing.baseUnit`

Base grid unit in pixels (all spacing tokens are multiples of this).

- **Type:** `number`
- **Default:** `4`

```json
"spacing": { "baseUnit": 4 }
```

---

## Border Radius

### `radii.scale`

Multiplier applied to all `--radius-*` tokens.

- **Type:** `number`
- **Default:** `1.0`

```json
"radii": { "scale": 1.5 }
```

### `radii.style`

Preset border-radius personality.

- **Type:** `"sharp"` | `"subtle"` | `"rounded"` | `"pill"`
- **Default:** `"rounded"`

| Style     | Effect                        |
| --------- | ----------------------------- |
| `sharp`   | No rounding (0 px)            |
| `subtle`  | Minimal rounding (2 px base)  |
| `rounded` | Standard rounding (4 px base) |
| `pill`    | Heavy rounding (8 px base)    |

```json
"radii": { "style": "pill" }
```

---

## Animation

### `animation.scale`

Multiplier applied to all `--duration-*` tokens.

- **Type:** `number`
- **Default:** `1.0`
- **Effect:** `0.5` = faster animations, `2.0` = slower.

```json
"animation": { "scale": 0.8 }
```

### `animation.reduceMotion`

Set to `true` to collapse all durations to `0ms` (respects `prefers-reduced-motion` users).

- **Type:** `boolean`
- **Default:** `false`

```json
"animation": { "reduceMotion": true }
```

---

## Accessibility

### `accessibility.level`

Target WCAG contrast standard. The generator enforces the selected ratios across all text and UI component tokens.

- **Type:** `"AA"` | `"AAA"`
- **Default:** `"AA"`

| Level | Normal text | Large text | UI components |
| ----- | ----------- | ---------- | ------------- |
| AA    | 4.5 : 1     | 3.0 : 1    | 3.0 : 1       |
| AAA   | 7.0 : 1     | 4.5 : 1    | 4.5 : 1       |

```json
"accessibility": { "level": "AAA" }
```

---

## Overrides

Directly set any generated CSS variable for a specific mode, bypassing derivation. Useful for fine-tuning edge cases or setting exact brand values.

### `overrides.light`

```json
"overrides": {
  "light": {
    "--base-bg":  "#ffffff",
    "--base-fg":  "#1a1a1a",
    "--focus-ring-width": "3px"
  }
}
```

### `overrides.dark`

```json
"overrides": {
  "dark": {
    "--base-bg":  "#0a0a0a",
    "--base-fg":  "#e5e5e5",
    "--focus-ring-width": "3px"
  }
}
```

### Commonly Overridden Tokens

**Color groups (tonal):**

- `--base-bg`, `--base-fg`, `--base-border`
- `--raised-bg`, `--sunken-bg`
- `--soft-bg`, `--strong-bg`, `--stronger-bg`

**Color groups (semantic):**

- `--primary-bg`, `--primary-fg`
- `--success-bg`, `--warning-bg`, `--danger-bg`

**Special tokens:**

- `--focus-ring`, `--focus-ring-width`
- `--link`, `--link-hover`
- `--selection-bg`, `--selection-text`

**Sizing and shape:**

- `--radius-sm`, `--radius-md`, `--radius-lg`
- `--shadow-sm`, `--shadow-md`, `--shadow-lg`

---

## Example Themes

### Minimal Theme

```json
{
  "id": "minimal",
  "name": "Minimal",
  "description": "Clean and understated",
  "colors": {
    "primary": "#374151"
  },
  "config": {
    "saturation": -20
  }
}
```

### High Contrast Theme

```json
{
  "id": "high-contrast",
  "name": "High Contrast",
  "description": "AAA-compliant for maximum accessibility",
  "colors": {
    "primary": "#0052cc"
  },
  "accessibility": {
    "level": "AAA"
  },
  "overrides": {
    "light": {
      "--base-fg": "#000000",
      "--base-bg": "#ffffff",
      "--focus-ring-width": "3px"
    },
    "dark": {
      "--base-fg": "#ffffff",
      "--base-bg": "#000000",
      "--focus-ring-width": "3px"
    }
  }
}
```

### Terminal Theme

```json
{
  "id": "terminal",
  "name": "Terminal",
  "description": "Green-on-black hacker aesthetic",
  "colors": {
    "primary": "#22c55e",
    "secondary": "#10b981",
    "accent": "#06b6d4"
  },
  "typography": {
    "fontSans": "'JetBrains Mono', monospace"
  },
  "overrides": {
    "dark": {
      "--base-bg": "#0a0a0a",
      "--base-fg": "#22c55e"
    }
  }
}
```

### Ocean Theme

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
    "baseSize": 15
  },
  "radii": {
    "style": "rounded",
    "scale": 1.0
  },
  "accessibility": { "level": "AA" },
  "overrides": {
    "light": { "--base-bg": "#f0f9ff" },
    "dark": { "--base-bg": "#082f49" }
  }
}
```

---

## Adding a New Theme

1. **Create a JSON file** in `src/themes/definitions/`:

   ```
   packages/cap-foundations/core/src/themes/definitions/my-theme.json
   ```

2. **Add the required fields:**

   ```json
   {
     "id": "my-theme",
     "name": "My Theme",
     "colors": {
       "primary": "#hexcolor"
     }
   }
   ```

3. **Generate CSS:**

   ```bash
   yarn nx run cap-foundations-core:build-themes
   ```

4. **Inspect the output** in `dist/themes/`:

   - `my-theme-light.css`
   - `my-theme-dark.css`
   - `manifest.json` (updated)

5. **Use in your application:**

   ```html
   <html data-theme="my-theme" data-mode="light"></html>
   ```

   Switch mode at runtime:

   ```js
   document.documentElement.setAttribute('data-mode', 'dark');
   ```

---

## CSS Output

Each theme definition generates two CSS files and an updated `manifest.json`:

| File             | Contents                        |
| ---------------- | ------------------------------- |
| `{id}-light.css` | All tokens scoped to light mode |
| `{id}-dark.css`  | All tokens scoped to dark mode  |
| `manifest.json`  | Theme registry with metadata    |

The generated CSS uses attribute selectors for zero-specificity scoping:

```css
[data-theme='my-theme'][data-mode='light'] {
  /* ~300+ CSS custom properties */
  --base-bg: #fafafa;
  --base-fg: #171717;
  /* … */

  & .surface {
    /* Tonal surface resets + modifiers */
  }
}
```

---

## Color Groups vs Surfaces

### Color Groups

Color groups are the token naming system. There are **11 groups** (`softer`, `soft`, `base`, `strong`, `stronger`, `primary`, `inverted`, `success`, `warning`, `danger`, `info`), each with **18 tokens** per group:

```
--{group}-bg           background
--{group}-fg           primary foreground text
--{group}-border       border
--{group}-fg-primary   primary-colored link/accent text
…
```

Pick **one group** for your component's background, then use **only that group's** foreground tokens — contrast is guaranteed.

```css
/* Use base group */
.my-card {
  background: var(--base-bg);
  color: var(--base-fg);
  border: 1px solid var(--base-border);
}

/* Use primary group for a CTA button */
.btn-primary {
  background: var(--primary-bg);
  color: var(--primary-fg);
}
```

### Surfaces

Surfaces are CSS classes (`<div class="surface raised">`) that **reset** all color group tokens to their theme-level originals and then apply modifier-specific overrides. They create isolated scoped areas where nested components automatically get contextually correct colors.

```html
<!-- Card elevated above page -->
<div class="surface raised">
  <p>Text automatically uses raised surface colors.</p>

  <!-- Button uses primary group tokens that still contrast on the raised bg -->
  <button style="background: var(--primary-bg); color: var(--primary-fg);">Save</button>
</div>

<!-- Tooltip with inverted scheme -->
<div class="surface inverted" role="tooltip">Brief description</div>

<!-- Success alert -->
<div class="surface success" role="alert">Operation completed.</div>
```

See [schema-definition.md](./schema/schema-definition.md) for the complete color group and surface system documentation.
