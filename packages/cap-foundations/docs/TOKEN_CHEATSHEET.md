# Cap Foundations Token Cheatsheet

Quick reference for Cap Foundations design tokens. For complete documentation, see `../core/TOKEN_GUIDE.md`.

Package: `@fluentui-contrib/cap-foundations-core`

---

## The Golden Rule: Stay Within Your Color Group

**Pick a color group for your background, use ONLY that group's tokens for foreground/border. Contrast is guaranteed.**

```css
/* ✅ CORRECT - all tokens from the same group */
.button {
  background: var(--primary-bg);
  color: var(--primary-fg);
  border: 1px solid var(--primary-border);
}

.card {
  background: var(--soft-bg);
  color: var(--soft-fg);
  border: 1px solid var(--soft-border);
}

/* ❌ WRONG - mixing groups breaks contrast */
.broken {
  background: var(--primary-bg);
  color: var(--base-fg); /* May not be readable! */
}
```

---

## Color Groups

Each color group provides 18 tokens: 4 bg states, 4 border states, 10 fg variants.

### Tonal Groups (Visual Hierarchy)

| Group      | Usage                                    | Tokens                                                |
| ---------- | ---------------------------------------- | ----------------------------------------------------- |
| `softer`   | Input backgrounds, wells, recessed areas | `--softer-bg`, `--softer-fg`, `--softer-border`       |
| `soft`     | Cards, panels, elevated content          | `--soft-bg`, `--soft-fg`, `--soft-border`             |
| `base`     | Page background, default content         | `--base-bg`, `--base-fg`, `--base-border`             |
| `strong`   | Default buttons, emphasized sections     | `--strong-bg`, `--strong-fg`, `--strong-border`       |
| `stronger` | Maximum emphasis without color           | `--stronger-bg`, `--stronger-fg`, `--stronger-border` |

### Semantic Groups (Meaning Through Color)

| Group      | Usage                                         | Tokens                                                |
| ---------- | --------------------------------------------- | ----------------------------------------------------- |
| `primary`  | Brand color, primary buttons, selected states | `--primary-bg`, `--primary-fg`, `--primary-border`    |
| `inverted` | Tooltips (opposite scheme)                    | `--inverted-bg`, `--inverted-fg`, `--inverted-border` |
| `success`  | Success surfaces, confirmations               | `--success-bg`, `--success-fg`, `--success-border`    |
| `warning`  | Warning surfaces, caution states              | `--warning-bg`, `--warning-fg`, `--warning-border`    |
| `danger`   | Error surfaces, destructive alerts            | `--danger-bg`, `--danger-fg`, `--danger-border`       |
| `info`     | Informational surfaces                        | `--info-bg`, `--info-fg`, `--info-border`             |

---

## State Variants

Each group provides interactive state variants:

```css
/* Background states */
--{group}-bg
--{group}-bg-hover
--{group}-bg-pressed
--{group}-bg-disabled

/* Border states */
--{group}-border
--{group}-border-hover
--{group}-border-pressed
--{group}-border-disabled
```

**Example:**

```css
.button {
  background: var(--strong-bg);
  border: 1px solid var(--strong-border);
}

.button:hover {
  background: var(--strong-bg-hover);
  border-color: var(--strong-border-hover);
}

.button:active {
  background: var(--strong-bg-pressed);
  border-color: var(--strong-border-pressed);
}

.button:disabled {
  background: var(--strong-bg-disabled);
  border-color: var(--strong-border-disabled);
  color: var(--strong-fg-softer);
}
```

---

## Foreground Variants

Each group provides text hierarchy options:

```css
--{group}-fg           /* Primary text */
--{group}-fg-soft      /* Secondary text (less contrast) */
--{group}-fg-softer    /* Tertiary text (subtle) */
--{group}-fg-strong    /* Emphasized text */
--{group}-fg-stronger  /* Maximum emphasis */

/* Semantic fg colors (accessible on that group's bg) */
--{group}-fg-primary   /* Accent/link color */
--{group}-fg-danger    /* Error text */
--{group}-fg-success   /* Success text */
--{group}-fg-warning   /* Warning text */
--{group}-fg-info      /* Info text */
```

**Example:**

```css
.card {
  background: var(--soft-bg);
}

.card-title {
  color: var(--soft-fg-strong); /* Emphasized */
}

.card-body {
  color: var(--soft-fg); /* Normal */
}

.card-meta {
  color: var(--soft-fg-soft); /* De-emphasized */
}

.card-link {
  color: var(--soft-fg-primary); /* Accent, accessible on soft-bg */
}
```

---

## Quick Reference Table

| I want to style...     | Use these tokens                          |
| ---------------------- | ----------------------------------------- |
| Page background        | `--base-bg`                               |
| Card/panel background  | `--soft-bg`                               |
| Input field background | `--softer-bg`                             |
| Primary button         | `--primary-bg`, `--primary-fg`            |
| Default button         | `--strong-bg`, `--strong-fg`              |
| Outline button         | `--base-bg`, `--base-fg`, `--base-border` |
| Tooltip                | `--inverted-bg`, `--inverted-fg`          |
| Primary text           | `--base-fg`                               |
| Secondary text         | `--base-fg-soft`                          |
| Tertiary text          | `--base-fg-softer`                        |
| Links                  | `--base-fg-primary`                       |
| Error text             | `--base-fg-danger`                        |
| Borders                | `--base-border`                           |
| Focus ring             | `--focus-ring`, `--focus-ring-width`      |

---

## Surfaces

Surfaces are CSS classes that reset and override tokens for specific contexts. Components inside surfaces automatically get appropriate colors.

### Usage

```html
<!-- Base class + modifier -->
<div class="surface raised">
  <button>This button has proper contrast</button>
</div>

<!-- Nested surfaces reset properly -->
<div class="surface sunken">
  <div class="surface raised">
    <!-- Inner surface resets, then applies raised overrides -->
  </div>
</div>
```

### Available Surfaces

| Surface             | Usage                  |
| ------------------- | ---------------------- |
| `.surface.base`     | Reset to page defaults |
| `.surface.raised`   | Cards, panels, dialogs |
| `.surface.sunken`   | Input wells, sidebars  |
| `.surface.section`  | Region separation      |
| `.surface.section2` | Secondary region       |
| `.surface.section3` | Tertiary region        |
| `.surface.inverted` | Tooltips, callouts     |
| `.surface.primary`  | Branded hero sections  |
| `.surface.success`  | Success toasts/alerts  |
| `.surface.warning`  | Warning toasts/alerts  |
| `.surface.danger`   | Error toasts/alerts    |
| `.surface.info`     | Info toasts/alerts     |

---

## Spacing Tokens

Based on a 4px grid system.

```css
--space-1              /* 4px */
--space-2              /* 8px */
--space-3              /* 12px */
--space-4              /* 16px (base unit) */
--space-5              /* 20px */
--space-6              /* 24px */
--space-8              /* 32px */
--space-10             /* 40px */
--space-12             /* 48px */
--space-16             /* 64px */
--space-20             /* 80px */
--space-24             /* 96px */
```

---

## Typography Tokens

### Font Families

```css
--font-sans            /* System sans-serif stack */
--font-mono            /* Monospace stack */
--font-serif           /* Serif stack */
```

### Font Sizes

```css
--text-xs              /* 11px - Fine print */
--text-sm              /* 13px - Small text */
--text-base            /* 15px - Body text */
--text-lg              /* 17px - Large body */
--text-xl              /* 20px - Subheadings */
--text-2xl             /* 24px - Section headings */
--text-3xl             /* 30px - Page headings */
--text-4xl             /* 36px - Large headings */
```

### Font Weights

```css
--weight-normal        /* 400 */
--weight-medium        /* 500 */
--weight-semibold      /* 600 */
--weight-bold          /* 700 */
```

### Line Heights

```css
--leading-tight        /* 1.25 */
--leading-snug         /* 1.375 */
--leading-normal       /* 1.5 */
--leading-relaxed      /* 1.625 */
--leading-loose        /* 1.75 */
```

---

## Border Radius Tokens

```css
--radius-sm            /* 2px */
--radius-md            /* 4px */
--radius-lg            /* 8px */
--radius-xl            /* 12px */
--radius-2xl           /* 16px */
--radius-full          /* 9999px (pill/circle) */
```

---

## Animation Tokens

### Durations

```css
--duration-fast        /* 100ms */
--duration-normal      /* 200ms */
--duration-slow        /* 300ms */
```

### Easing Functions

```css
--ease-default         /* ease-out */
--ease-in              /* ease-in */
--ease-out             /* ease-out */
--ease-in-out          /* ease-in-out */
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
}

.button-default:hover:not(:disabled) {
  background: var(--strong-bg-hover);
  border-color: var(--strong-border-hover);
}
```

### Outline Button

```css
.button-outline {
  background: var(--base-bg);
  color: var(--base-fg);
  border: 1px solid var(--base-border);
  border-radius: var(--radius-md);
}

.button-outline:hover:not(:disabled) {
  background: var(--base-bg-hover);
  border-color: var(--base-border-hover);
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
```

### Alert

```css
.alert-success {
  background: var(--success-bg);
  color: var(--success-fg);
  border: 1px solid var(--success-border);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
}
```

---

## Don'ts

### Never mix color groups

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

### Never hardcode colors

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

### Never hardcode spacing

```css
/* ❌ BAD */
.card {
  padding: 16px;
}

/* ✅ GOOD */
.card {
  padding: var(--space-4);
}
```

### Never remove focus styles

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

## Special Tokens

### Focus Ring

```css
--focus-ring           /* Ring color */
--focus-ring-width     /* 2px */
--focus-ring-offset    /* 2px */
```

### Links

```css
--link                 /* Default link color */
--link-hover           /* Hover */
--link-pressed         /* Active */
--link-visited         /* Visited */
```

### Selection

```css
--selection-bg         /* Text selection background */
--selection-text       /* Selected text color */
```

### Scrollbar

```css
--scrollbar-track      /* Track background */
--scrollbar-thumb      /* Thumb color */
--scrollbar-thumb-hover /* Thumb hover */
```

---

## Resources

- **Complete Token Guide**: `../core/TOKEN_GUIDE.md`
- **Schema Definition**: `../core/src/themes/schema/schema-definition.md`
- **Theme Definition**: `../core/src/themes/theme-definition.md`
