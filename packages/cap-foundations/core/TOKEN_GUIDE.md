# Cap Foundations Token Guide

This guide provides a comprehensive reference for using Cap Foundations design tokens. Tokens are CSS custom properties that ensure consistent styling and accessibility across all components.

For a quick reference, see `docs/TOKEN_CHEATSHEET.md`.

Package: `@fluentui-contrib/cap-foundations-core`

---

## The Golden Rule: Stay Within Your Color Group

**Pick a color group for your background, use ONLY that group's tokens for text and borders. Contrast is guaranteed.**

```css
/* ✅ CORRECT - all tokens from the same group */
.primary-button {
  background: var(--primary-bg);
  color: var(--primary-fg);
  border: 1px solid var(--primary-border);
}

/* ❌ WRONG - mixing groups breaks contrast */
.broken {
  background: var(--primary-bg);
  color: var(--base-fg); /* May not be readable! */
}
```

This is the core accessibility principle of the token system. Each color group contains foreground tokens that are calculated specifically for that group's background. Mixing tokens from different groups does not guarantee accessible contrast.

---

## Color Groups

The color group system provides 18 tokens per group. Each group includes:

- **4 background states**: `bg`, `bg-hover`, `bg-pressed`, `bg-disabled`
- **4 border states**: `border`, `border-hover`, `border-pressed`, `border-disabled`
- **10 foreground variants**: `fg`, `fg-soft`, `fg-softer`, `fg-strong`, `fg-stronger`, `fg-primary`, `fg-danger`, `fg-success`, `fg-warning`, `fg-info`

### Tonal Groups

Tonal groups create visual hierarchy through lightness variation:

| Group      | Description                     | Usage                                       |
| ---------- | ------------------------------- | ------------------------------------------- |
| `softer`   | Darkest in light mode, recessed | Input backgrounds, wells, code blocks       |
| `soft`     | Slightly elevated               | Cards, panels, alternating rows             |
| `base`     | Page background                 | Default starting point                      |
| `strong`   | Emphasized                      | Default buttons, highlights                 |
| `stronger` | Maximum emphasis                | Very strong emphasis without semantic color |

### Semantic Groups

Semantic groups carry meaning through color:

| Group      | Description        | Usage                                             |
| ---------- | ------------------ | ------------------------------------------------- |
| `primary`  | Brand color        | Primary buttons, selected states, active elements |
| `inverted` | Opposite scheme    | Tooltips (dark in light mode, light in dark mode) |
| `success`  | Positive outcomes  | Success toasts, confirmations                     |
| `warning`  | Caution states     | Warning toasts, attention needed                  |
| `danger`   | Errors/destructive | Error toasts, destructive alerts                  |
| `info`     | Informational      | Info toasts, neutral status                       |

---

## Token Structure

### Background Tokens

```css
--{group}-bg              /* Default background */
--{group}-bg-hover        /* Hover state */
--{group}-bg-pressed      /* Active/pressed state */
--{group}-bg-disabled     /* Disabled state */
```

### Border Tokens

```css
--{group}-border          /* Default border */
--{group}-border-hover    /* Hover state */
--{group}-border-pressed  /* Active/pressed state */
--{group}-border-disabled /* Disabled state */
```

### Foreground Tokens (Text)

```css
--{group}-fg              /* Primary text */
--{group}-fg-soft         /* Secondary text (less contrast) */
--{group}-fg-softer       /* Tertiary text (subtle) */
--{group}-fg-strong       /* Emphasized text */
--{group}-fg-stronger     /* Maximum emphasis */
```

### Semantic Foreground Tokens

Each group includes semantic foreground colors that are guaranteed accessible on that group's background:

```css
--{group}-fg-primary      /* Accent/link color on this background */
--{group}-fg-danger       /* Error color on this background */
--{group}-fg-success      /* Success color on this background */
--{group}-fg-warning      /* Warning color on this background */
--{group}-fg-info         /* Info color on this background */
```

**Example:**

```css
.card {
  background: var(--soft-bg);
}

/* Need a primary-colored link on the soft background? */
.card-link {
  color: var(--soft-fg-primary); /* Guaranteed accessible on --soft-bg */
}

/* NOT this - contrast is not guaranteed */
.card-link {
  color: var(--primary-fg); /* Wrong! --primary-fg is for --primary-bg */
}
```

---

## Surfaces

Surfaces are CSS classes that reset and override color group tokens for specific visual contexts. They solve a critical accessibility problem: **ensuring components remain readable when placed on different backgrounds**.

### The Reset/Override Pattern

Every `.surface` element:

1. **Resets ALL tokens** to page defaults
2. **Applies overrides** specific to that surface variant
3. **Nested surfaces automatically reset** - no compounding issues

```html
<!-- Components inside a surface automatically get appropriate token values -->
<div class="surface raised">
  <button>This button works correctly</button>
</div>

<!-- Nested surfaces reset properly -->
<div class="surface sunken">
  <p>Sunken area</p>
  <div class="surface raised">
    <p>Raised card inside - tokens reset, no compounding</p>
  </div>
</div>
```

### Tonal Surfaces

| Surface             | Usage                                   |
| ------------------- | --------------------------------------- |
| `.surface.base`     | Explicit reset to page defaults         |
| `.surface.raised`   | Cards, panels, dialogs, modals          |
| `.surface.sunken`   | Input wells, sidebars, recessed areas   |
| `.surface.section`  | Command areas, region separation        |
| `.surface.section2` | Secondary region emphasis               |
| `.surface.section3` | Tertiary region emphasis                |
| `.surface.inverted` | Tooltips, callouts (opposite scheme)    |
| `.surface.primary`  | Teaching bubbles, branded hero sections |

### Feedback Surfaces

| Surface            | Usage                         |
| ------------------ | ----------------------------- |
| `.surface.success` | Success toasts, notifications |
| `.surface.warning` | Warning toasts, notifications |
| `.surface.danger`  | Error toasts, notifications   |
| `.surface.info`    | Info toasts, notifications    |

---

## Quick Reference

### When to Use Which Tokens

| I want to style... | Use these tokens                                            |
| ------------------ | ----------------------------------------------------------- |
| Page background    | `--base-bg`                                                 |
| Card/panel         | `--soft-bg`, `--soft-fg`, `--soft-border`                   |
| Input field        | `--softer-bg`, `--softer-fg`, `--softer-border`             |
| Primary button     | `--primary-bg`, `--primary-fg`                              |
| Default button     | `--strong-bg`, `--strong-fg`, `--strong-border`             |
| Outline button     | `--base-bg`, `--base-fg`, `--base-border`                   |
| Tooltip            | `--inverted-bg`, `--inverted-fg`                            |
| Primary text       | `--base-fg`                                                 |
| Secondary text     | `--base-fg-soft`                                            |
| Tertiary text      | `--base-fg-softer`                                          |
| Emphasized text    | `--base-fg-strong`                                          |
| Links on page      | `--base-fg-primary`                                         |
| Error text on page | `--base-fg-danger`                                          |
| Borders            | `--base-border`                                             |
| Focus ring         | `--focus-ring`, `--focus-ring-width`, `--focus-ring-offset` |

---

## Static Tokens

These tokens don't change based on color mode and can be used anywhere.

### Spacing (4px Grid)

```css
--space-1              /* 4px */
--space-2              /* 8px */
--space-3              /* 12px */
--space-4              /* 16px - base unit */
--space-5              /* 20px */
--space-6              /* 24px */
--space-8              /* 32px */
--space-10             /* 40px */
--space-12             /* 48px */
--space-16             /* 64px */
--space-20             /* 80px */
--space-24             /* 96px */
```

### Typography

```css
/* Font Families */
--font-sans            /* System sans-serif stack */
--font-mono            /* Monospace font stack */
--font-serif           /* Serif font stack */

/* Font Sizes */
--text-xs              /* 11px */
--text-sm              /* 13px */
--text-base            /* 15px - default */
--text-lg              /* 17px */
--text-xl              /* 20px */
--text-2xl             /* 24px */
--text-3xl             /* 30px */
--text-4xl             /* 36px */

/* Font Weights */
--weight-normal        /* 400 */
--weight-medium        /* 500 */
--weight-semibold      /* 600 */
--weight-bold          /* 700 */

/* Line Heights */
--leading-tight        /* 1.25 */
--leading-snug         /* 1.375 */
--leading-normal       /* 1.5 */
--leading-relaxed      /* 1.625 */
--leading-loose        /* 1.75 */
```

### Border Radius

```css
--radius-sm            /* 2px */
--radius-md            /* 4px - default for buttons */
--radius-lg            /* 8px - default for cards */
--radius-xl            /* 12px */
--radius-2xl           /* 16px */
--radius-full          /* 9999px - pill/circle */
```

### Animation

```css
/* Durations */
--duration-fast        /* 100ms - micro-interactions */
--duration-normal      /* 200ms - default */
--duration-slow        /* 300ms - larger elements */

/* Easing */
--ease-default         /* ease-out */
--ease-in              /* ease-in */
--ease-out             /* ease-out */
--ease-in-out          /* ease-in-out */
```

---

## Special Tokens

### Focus Ring

```css
--focus-ring           /* Ring color (usually primary) */
--focus-ring-width     /* Ring thickness: 2px */
--focus-ring-offset    /* Gap between element and ring: 2px */
```

**Usage:**

```css
.my-element:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring);
  outline-offset: var(--focus-ring-offset);
}
```

### Links

```css
--link                 /* Default link color */
--link-hover           /* Hover color */
--link-pressed         /* Active/pressed color */
--link-visited         /* Visited color */
```

### Selection

```css
--selection-bg         /* Text selection background */
--selection-text       /* Selected text color */
```

### Scrollbar

```css
--scrollbar-track      /* Scrollbar track */
--scrollbar-thumb      /* Scrollbar thumb */
--scrollbar-thumb-hover /* Thumb hover state */
```

### Skeleton Loading

```css
--skeleton-bg          /* Skeleton placeholder background */
--skeleton-shimmer     /* Shimmer animation highlight */
```

### Highlight

```css
--highlight-bg         /* Search/text highlight background */
--highlight-text       /* Highlighted text color */
```

---

## Common Patterns

### Primary Button

```css
.button-primary {
  background: var(--primary-bg);
  color: var(--primary-fg);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-4);
  font-weight: var(--weight-medium);
  transition: background var(--duration-fast) var(--ease-default);
}

.button-primary:hover:not(:disabled) {
  background: var(--primary-bg-hover);
}

.button-primary:active:not(:disabled) {
  background: var(--primary-bg-pressed);
}

.button-primary:disabled {
  background: var(--primary-bg-disabled);
  cursor: not-allowed;
}

.button-primary:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring);
  outline-offset: var(--focus-ring-offset);
}
```

### Default Button

```css
.button-default {
  background: var(--strong-bg);
  color: var(--strong-fg);
  border: 1px solid var(--strong-border);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-4);
  transition: all var(--duration-fast) var(--ease-default);
}

.button-default:hover:not(:disabled) {
  background: var(--strong-bg-hover);
  border-color: var(--strong-border-hover);
}

.button-default:active:not(:disabled) {
  background: var(--strong-bg-pressed);
  border-color: var(--strong-border-pressed);
}

.button-default:disabled {
  background: var(--strong-bg-disabled);
  border-color: var(--strong-border-disabled);
  color: var(--strong-fg-softer);
  cursor: not-allowed;
}
```

### Outline Button

```css
.button-outline {
  background: var(--base-bg);
  color: var(--base-fg);
  border: 1px solid var(--base-border);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-4);
}

.button-outline:hover:not(:disabled) {
  background: var(--base-bg-hover);
  border-color: var(--base-border-hover);
}

.button-outline:active:not(:disabled) {
  background: var(--base-bg-pressed);
  border-color: var(--base-border-pressed);
}
```

### Input Field

```css
.input {
  background: var(--softer-bg);
  color: var(--softer-fg);
  border: 1px solid var(--softer-border);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-3);
  transition: all var(--duration-fast) var(--ease-default);
}

.input::placeholder {
  color: var(--softer-fg-softer);
}

.input:hover:not(:disabled) {
  background: var(--softer-bg-hover);
  border-color: var(--softer-border-hover);
}

.input:focus {
  border-color: var(--focus-ring);
  outline: none;
  box-shadow: 0 0 0 var(--focus-ring-width) var(--focus-ring);
}
```

### Card

```css
.card {
  background: var(--soft-bg);
  color: var(--soft-fg);
  border: 1px solid var(--soft-border);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.card-title {
  color: var(--soft-fg-strong);
  font-weight: var(--weight-semibold);
}

.card-meta {
  color: var(--soft-fg-soft);
  font-size: var(--text-sm);
}
```

### Alert/Toast

```css
.alert-success {
  background: var(--success-bg);
  color: var(--success-fg);
  border: 1px solid var(--success-border);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
}

.alert-warning {
  background: var(--warning-bg);
  color: var(--warning-fg);
  border: 1px solid var(--warning-border);
}

.alert-danger {
  background: var(--danger-bg);
  color: var(--danger-fg);
  border: 1px solid var(--danger-border);
}

.alert-info {
  background: var(--info-bg);
  color: var(--info-fg);
  border: 1px solid var(--info-border);
}
```

### Text Hierarchy

```css
.heading {
  color: var(--base-fg-strong);
  font-size: var(--text-2xl);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-tight);
}

.body {
  color: var(--base-fg);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
}

.secondary {
  color: var(--base-fg-soft);
  font-size: var(--text-sm);
}

.caption {
  color: var(--base-fg-softer);
  font-size: var(--text-xs);
}
```

### Selectable List Items with Icons

When building selectable lists (file browsers, menus, etc.), icons should follow the same color rules as text:

```css
/* List container uses soft background */
.list {
  background: var(--soft-bg);
}

/* Unselected items: icons use the surface's foreground color */
.list-item {
  color: var(--soft-fg);
}

.list-item-icon {
  color: var(--soft-fg); /* Same as text - icons are part of content */
}

/* Selected items: switch to primary surface */
.list-item.selected {
  background: var(--primary-bg);
  color: var(--primary-fg);
}

/* Icons inherit from parent - automatically get primary-fg */
.list-item.selected .list-item-icon {
  color: inherit;
}

/* Hover state (unselected) */
.list-item:hover:not(.selected) {
  background: var(--soft-bg-hover);
}
```

**Key principles:**

- **Icons are content** - they follow the same color rules as text
- **Unselected state**: Use the containing surface's `--{group}-fg` token
- **Selected state**: Use `color: inherit` so icons automatically get the selection foreground color
- **Never use semantic colors (warning, success, etc.) for generic icons** - only use them when the icon conveys that specific meaning

---

## Accessibility

### Contrast Ratios

The token system automatically ensures WCAG contrast ratios when you use matching tokens:

| Content Type       | AA (Default) | AAA (High Contrast) |
| ------------------ | ------------ | ------------------- |
| Normal text        | 4.5:1        | 7:1                 |
| Large text (18px+) | 3:1          | 4.5:1               |
| UI components      | 3:1          | 4.5:1               |

### Focus Visibility

Always provide visible focus indicators:

```css
.interactive:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring);
  outline-offset: var(--focus-ring-offset);
}

/* Never hide focus completely */
/* ❌ BAD: .element:focus { outline: none; } */
```

### Reduced Motion

Always respect the user's motion preferences:

```css
.animated {
  transition: transform var(--duration-normal) var(--ease-default);
}

@media (prefers-reduced-motion: reduce) {
  .animated {
    transition: none;
  }
}
```

---

## Don'ts

### Never Mix Color Groups

```css
/* ❌ BAD */
.button {
  background: var(--primary-bg);
  color: var(--base-fg); /* Wrong group! */
}

/* ✅ GOOD */
.button {
  background: var(--primary-bg);
  color: var(--primary-fg);
}
```

### Never Hardcode Colors

```css
/* ❌ BAD */
.button {
  background: #3b82f6;
  color: white;
}

/* ✅ GOOD */
.button {
  background: var(--primary-bg);
  color: var(--primary-fg);
}
```

### Never Hardcode Spacing

```css
/* ❌ BAD */
.card {
  padding: 16px;
  margin-bottom: 24px;
}

/* ✅ GOOD */
.card {
  padding: var(--space-4);
  margin-bottom: var(--space-6);
}
```

### Never Skip Focus Styles

```css
/* ❌ BAD */
.button:focus {
  outline: none;
}

/* ✅ GOOD */
.button:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring);
  outline-offset: var(--focus-ring-offset);
}
```

---

## Dynamic Surface Colors

For scenarios requiring custom-colored surfaces beyond the standard semantic groups (e.g., color-coded cards, category indicators, or themed content areas), the Dynamic Surface Color system generates accessible, theme-aware color surface classes from any HSL hue.

### Overview

Dynamic surfaces create cohesive color palettes that:

- Work in both light and dark modes automatically
- Maintain proper contrast for accessibility
- Generate matching background, text, border, and icon colors

### Usage

```typescript
import { generateSurfaceColors, generateSurfaceFromPreset, injectSurfaceStyles, getSurfaceClassName, SURFACE_PRESETS, SURFACE_PRESET_NAMES } from '@fluentui-contrib/cap-foundations-core';

// Generate colors for a custom hue/saturation
const colors = generateSurfaceColors(16, 90, 'light');
// Returns: { bg, text, textSoft, border, icon } as HSL strings

// Use preset surfaces (32 presets available)
const coralColors = generateSurfaceFromPreset('coral', 'dark');

// Inject all preset surfaces as CSS classes
injectSurfaceStyles();
// Creates .dynamicSurface-rose, .dynamicSurface-coral, etc.

// Get class name for a preset
const className = getSurfaceClassName('coral'); // 'dynamicSurface-coral'
```

### Preset Surfaces (32 colors)

The system includes 32 preset surface definitions covering the full color spectrum:

| Category              | Presets                         |
| --------------------- | ------------------------------- |
| **Reds & Pinks**      | crimson, rose, ruby, coral      |
| **Oranges & Yellows** | tangerine, amber, honey, gold   |
| **Yellow-Greens**     | lime, olive, moss, chartreuse   |
| **Greens**            | sage, emerald, forest, mint     |
| **Cyans & Teals**     | teal, aqua, cyan, cerulean      |
| **Blues**             | sky, ocean, steel, cobalt       |
| **Purples & Indigos** | indigo, grape, lavender, violet |
| **Magentas & Pinks**  | plum, fuchsia, mauve, pink      |

### CSS Variables

Each dynamic surface sets these CSS custom properties:

```css
.dynamicSurface-coral {
  --surface-bg: hsl(16, 67%, 85%); /* Background */
  --surface-text: hsl(16, 40%, 20%); /* Primary text */
  --surface-text-soft: hsl(16, 24%, 35%); /* Secondary text */
  --surface-border: hsl(16, 33%, 72%); /* Border */
  --surface-icon: hsl(16, 42%, 30%); /* Icon color */
}
```

### In Components

```tsx
// After calling injectSurfaceStyles() in your app initialization
function ColoredCard({ color, children }) {
  return (
    <div className={getSurfaceClassName(color)}>
      {children}
    </div>
  );
}

// Usage
<ColoredCard color="coral">Coral colored content</ColoredCard>
<ColoredCard color="sky">Sky blue content</ColoredCard>
```

### Custom Hues

Generate surfaces for any hue value:

```typescript
// Generate a custom purple surface
const customColors = generateSurfaceColors(285, 70, 'light');

// Apply as inline styles
<div
  style={{
    background: customColors.bg,
    color: customColors.text,
    borderColor: customColors.border,
  }}
>
  Custom purple content
</div>;
```

### Dark Mode Support

Dynamic surfaces automatically adapt to dark mode via the `data-mode="dark"` attribute:

```css
/* Light mode - pastel backgrounds, dark text */
.dynamicSurface-coral {
  --surface-bg: hsl(16, 67%, 85%);
  --surface-text: hsl(16, 40%, 20%);
}

/* Dark mode - rich backgrounds, light text */
[data-mode='dark'] .dynamicSurface-coral {
  --surface-bg: hsl(16, 95%, 28%);
  --surface-text: hsl(16, 25%, 95%);
}
```

### Configuration Options

```typescript
injectSurfaceStyles({
  classPrefix: 'myApp', // Default: 'dynamicSurface'
  darkModeSelector: '.dark', // Default: '[data-mode="dark"]'
  styleId: 'my-surface-styles', // Default: 'dynamic-surface-styles'
});
```

---

## See Also

- [Token Cheatsheet](../docs/TOKEN_CHEATSHEET.md) - Quick reference
- [Schema Definition](src/themes/schema/schema-definition.md) - Theme schema
- [Theme Definition](src/themes/theme-definition.md) - Theme authoring
