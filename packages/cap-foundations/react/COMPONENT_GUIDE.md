# Cap Foundations React — Component Guide

This guide defines the standards and best practices for creating components in `@fluentui-contrib/cap-foundations-react`. Following these guidelines ensures consistency, accessibility, and quality across all components.

## Table of Contents

1. [Component Structure](#component-structure)
2. [Required Files](#required-files)
3. [Standard Root Element Props](#standard-root-element-props)
4. [Polymorphic Components (the `as` Prop)](#polymorphic-components-the-as-prop)
5. [Naming Conventions](#naming-conventions)
6. [Common Patterns and Anti-Patterns](#common-patterns-and-anti-patterns)
7. [Sizing Standards](#sizing-standards)
8. [Token Usage](#token-usage)
9. [Accessibility Requirements](#accessibility-requirements)
10. [Story Documentation](#story-documentation)
11. [Testing Requirements](#testing-requirements)
12. [fluentui-contrib Conventions](#fluentui-contrib-conventions)
13. [Checklist](#checklist)

---

## Component Structure

Every component should be organized in its own directory inside `src/components/`:

```
src/components/ComponentName/
├── ComponentName.tsx           # Main component
├── ComponentName.module.css    # Styles
├── index.ts                    # Public exports
```

Stories and tests (added in Phase 7+) live outside `src/`:

```
stories/ComponentName/
└── index.stories.tsx           # Storybook stories

src/components/ComponentName/
└── ComponentName.test.tsx      # Unit tests (when needed)
```

---

## Required Files

### 1. Component File (`ComponentName.tsx`)

```tsx
import { type ReactNode, type HTMLAttributes } from 'react';
import styles from './ComponentName.module.css';

/**
 * ComponentName — brief description.
 *
 * Surfaces used:
 *   control (default), controlPrimary (primary variant)
 *
 * Tokens used:
 *   --control-bg, --control-bg-hover, --control-bg-pressed
 *   --control-text, --control-border
 *   --space-2, --space-4 (padding), --radius-md
 *   --focus-ring, --focus-ring-width, --focus-ring-offset
 *   --duration-fast, --ease-default
 */

export type ComponentNameSize = 'sm' | 'md' | 'lg';
export type ComponentNameVariant = 'default' | 'primary' | 'danger';

export interface ComponentNameProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ComponentNameVariant;
  size?: ComponentNameSize;
  disabled?: boolean;
  children?: ReactNode;
}

export function ComponentName({ variant = 'default', size = 'md', disabled = false, className, children, ...props }: ComponentNameProps) {
  const classNames = [styles.root, styles[variant], styles[size], disabled && styles.disabled, className].filter(Boolean).join(' ');

  return (
    <div className={classNames} aria-disabled={disabled || undefined} {...props}>
      {children}
    </div>
  );
}

ComponentName.displayName = 'ComponentName';
```

**Rules:**

- Document surfaces and tokens used in the JSDoc comment
- Export types alongside the component
- Always set `displayName` for React DevTools
- Spread remaining props for extensibility
- Compose `className` — never override it

### 2. Styles File (`ComponentName.module.css`)

```css
/**
 * ComponentName styles
 * Surfaces: control, controlPrimary
 * See core/TOKEN_GUIDE.md for token reference
 */

.root {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-default);
  white-space: nowrap;
}

.root:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring);
  outline-offset: var(--focus-ring-offset);
}

/* Size variants — must match control height standards */
.sm {
  height: 28px;
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-sm);
}
.md {
  height: 36px;
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-base);
}
.lg {
  height: 44px;
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-lg);
}

/* Variants */
.default {
  background: var(--control-bg);
  color: var(--control-text);
  border: 1px solid var(--control-border);
}
.default:hover:not(.disabled) {
  background: var(--control-bg-hover);
}
.default:active:not(.disabled) {
  background: var(--control-bg-pressed);
}

.primary {
  background: var(--controlPrimary-bg);
  color: var(--controlPrimary-text);
  border: 1px solid var(--controlPrimary-border);
}
.primary:hover:not(.disabled) {
  background: var(--controlPrimary-bg-hover);
}
.primary:active:not(.disabled) {
  background: var(--controlPrimary-bg-pressed);
}

/* Disabled */
.disabled {
  background: var(--controlDisabled-bg);
  color: var(--controlDisabled-text);
  border-color: var(--controlDisabled-border);
  cursor: not-allowed;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .root {
    transition: none;
  }
}
```

### 3. Index File (`index.ts`)

```ts
export { ComponentName } from './ComponentName';
export type { ComponentNameProps, ComponentNameSize, ComponentNameVariant } from './ComponentName';
```

---

## Standard Root Element Props

**All components MUST support standard HTML attributes** on the root element.

```tsx
export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated';
  children: ReactNode;
}

export function Panel({ variant = 'default', className, children, ...props }: PanelProps) {
  const classNames = [styles.panel, styles[variant], className].filter(Boolean).join(' ');
  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}
```

### HTML Attribute Interface by Root Element

| Root Element | Interface                                 |
| ------------ | ----------------------------------------- |
| `<div>`      | `HTMLAttributes<HTMLDivElement>`          |
| `<button>`   | `ButtonHTMLAttributes<HTMLButtonElement>` |
| `<input>`    | `InputHTMLAttributes<HTMLInputElement>`   |
| `<a>`        | `AnchorHTMLAttributes<HTMLAnchorElement>` |

---

## Polymorphic Components (the `as` Prop)

Use the `as` prop for typography and layout components that benefit from semantic flexibility.

```tsx
export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Text({ as: Component = 'span', size = 'md', className, children, ...props }: TextProps) {
  const classNames = [styles.text, styles[size], className].filter(Boolean).join(' ');
  return (
    <Component className={classNames} {...props}>
      {children}
    </Component>
  );
}
```

**When to support `as`:**

- Typography (Text, Heading) — yes
- Layout (Stack, Grid) — optional
- Interactive controls (Button, Input, Checkbox) — no

---

## Naming Conventions

- **Components:** PascalCase — `Button`, `SearchInput`, `TreeView`
- **Files:** match component name — `Button.tsx`, `Button.module.css`
- **CSS classes:** camelCase, semantic names — `.root`, `.primary`, `.disabled` not `.red`
- **Props:** consistent across components:
  - `variant` — visual style
  - `size` — `'sm' | 'md' | 'lg'`
  - `disabled` — boolean
  - `fullWidth` — boolean
  - `icon` / `iconAfter` — leading / trailing icon slots

---

## Common Patterns and Anti-Patterns

### Icons: Always Use Props, Not Children

```tsx
// ❌ Wrong
<Button><Spinner /> Processing...</Button>

// ✅ Correct
<Button icon={<Spinner />}>Processing...</Button>
<Button iconAfter={<ArrowRightIcon />}>Next</Button>
```

### Layout: Use Stack for Vertical Content

`Text` is `<span>` (inline) by default. Wrap multiple elements in `<Stack>` to create vertical layouts with gap.

```tsx
// ❌ Wrong — Text flows horizontally
<Panel><Text>Title</Text><Text size="sm">Description</Text></Panel>

// ✅ Correct
<Panel>
  <Stack gap="xs">
    <Text weight="medium">Title</Text>
    <Text size="sm" color="soft">Description</Text>
  </Stack>
</Panel>
```

---

## Sizing Standards

All interactive controls MUST use consistent heights so they align side-by-side.

| Size | Height | Use Case                          |
| ---- | ------ | --------------------------------- |
| `sm` | 28px   | Compact UI, toolbars, table cells |
| `md` | 36px   | Default for most controls         |
| `lg` | 44px   | Hero sections, touch targets      |

**Components that must match:** Button, Input, Select, Checkbox, Radio, Switch, Slider, SearchInput.

---

## Token Usage

Always use design tokens — never hardcode colors, spacing, or radii.

```css
/* ❌ Hardcoded */
background: #1a73e8;
padding: 8px 16px;
border-radius: 6px;

/* ✅ Tokens */
background: var(--controlPrimary-bg);
padding: var(--space-2) var(--space-4);
border-radius: var(--radius-md);
```

### Token Categories

| Category       | Where to use                         | Example tokens                                              |
| -------------- | ------------------------------------ | ----------------------------------------------------------- |
| Surface tokens | Component backgrounds, text, borders | `--control-bg`, `--base-text`                               |
| Spacing        | Padding, gap, margin                 | `--space-1` … `--space-24`                                  |
| Typography     | Font family, size, weight            | `--font-sans`, `--text-base`, `--weight-medium`             |
| Radii          | Border radius                        | `--radius-sm`, `--radius-md`, `--radius-lg`                 |
| Shadows        | Box shadows                          | `--shadow-sm`, `--shadow-md`                                |
| Animation      | Transitions                          | `--duration-fast`, `--ease-default`                         |
| Focus          | Focus ring                           | `--focus-ring`, `--focus-ring-width`, `--focus-ring-offset` |
| Z-index        | Stacking                             | `--z-dropdown`, `--z-modal`, `--z-tooltip`                  |

See [core/TOKEN_GUIDE.md](../core/TOKEN_GUIDE.md) for the complete token reference.

---

## Accessibility Requirements

- All interactive elements need accessible labels (`aria-label` or visible text)
- Use native HTML elements where possible (`<button>`, `<input>`) — they get A11y for free
- Focus ring must be visible on all interactive elements (use `--focus-ring` tokens)
- Support keyboard navigation — `Tab`, `Enter`, `Space`, `Arrow` keys as appropriate
- Use `aria-disabled` instead of `disabled` on non-form elements where content needs to remain in the tab order
- RTL: use logical CSS properties (`margin-inline-start`, not `margin-left`) for layout
- Use `@media (prefers-reduced-motion: reduce)` to disable transitions for users who prefer it

---

## Story Documentation

Stories live in `stories/ComponentName/index.stories.tsx`.

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@fluentui-contrib/cap-foundations-react';

const meta: Meta<typeof Button> = {
  title: 'Cap Foundations / Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: 'Button' },
};

export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary' },
};

export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true },
};
```

**Story rules:**

- Cover every `variant`, `size`, and significant state (disabled, loading)
- Do not hardcode colors — use only design tokens via CSS Modules
- Add `autodocs` tag to every component so documentation is auto-generated
- Title pattern: `Cap Foundations / ComponentName`

---

## Testing Requirements

Test files live alongside the component source: `ComponentName.test.tsx`.

```tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('is disabled when disabled prop is set', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

**Test rules:**

- Use `@testing-library/react` (query by role/label, not class names)
- Test behavior, not implementation details
- SSR-safe: tests run in `jsdom` environment; no bare `window` / `document` calls without guards
- Convert any Vitest patterns (`vi.fn()`, `describe.only`) to Jest equivalents when porting

---

## fluentui-contrib Conventions

This package follows the conventions of the `fluentui-contrib` monorepo:

| Tool                | Usage                                                         |
| ------------------- | ------------------------------------------------------------- |
| **Build tool**      | `@fluentui-contrib/nx-plugin:build` (SWC) — not Vite          |
| **Type check**      | `@fluentui-contrib/nx-plugin:type-check` — not `tsc` directly |
| **Test runner**     | Jest + `@swc/jest` — not Vitest                               |
| **Package manager** | Yarn — not pnpm                                               |
| **Task runner**     | Nx — `nx run cap-foundations-react:<target>`                  |
| **Lint**            | ESLint via `@nx/eslint:lint`                                  |

### Key ESLint rules

- **No bare browser globals:** wrap all `window` / `document` / `localStorage` calls in `typeof x !== 'undefined'` guards
- **No export \*:** use explicit named exports (enforced by `@rnx-kit/no-export-all`)
- **Module boundaries:** cross-package imports must go through the public barrel (`src/index.ts`); use `// eslint-disable-next-line @nx/enforce-module-boundaries` only in `.storybook/` files

### Running tasks

```sh
# Type check
nx run cap-foundations-react:type-check

# Build
nx run cap-foundations-react:build

# Lint
nx run cap-foundations-react:lint

# Test
nx run cap-foundations-react:test

# Storybook (requires core themes built first)
nx run cap-foundations-core:build-themes
nx run cap-foundations-react:storybook
```

---

## Checklist

Before marking a component complete, verify:

- [ ] `ComponentName.tsx` with exported types and `displayName`
- [ ] `ComponentName.module.css` using only design tokens (no hardcoded colors)
- [ ] `index.ts` barrel with named exports
- [ ] Story file covering all variants, sizes, and disabled state
- [ ] `nx run cap-foundations-react:type-check` passes
- [ ] `nx run cap-foundations-react:build` passes
- [ ] `nx run cap-foundations-react:lint` passes — 0 errors
- [ ] All interactive elements have visible focus ring
- [ ] Keyboard-navigable
- [ ] Reduced-motion media query on all transitions
