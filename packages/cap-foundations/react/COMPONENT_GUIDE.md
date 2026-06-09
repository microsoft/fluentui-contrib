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
10. [Animation Guidelines](#animation-guidelines)
11. [Story Documentation](#story-documentation)
12. [Testing Requirements](#testing-requirements)
13. [fluentui-contrib Conventions](#fluentui-contrib-conventions)
14. [Checklist](#checklist)

---

## Component Structure

Every component should be organized in its own directory inside `src/components/`:

```
src/components/ComponentName/
├── ComponentName.tsx           # Main component
├── ComponentName.module.css    # Styles
├── ComponentName.test.tsx      # Unit tests (when needed)
└── index.ts                    # Public exports
```

Stories live outside `src/`:

```
stories/ComponentName/
└── index.stories.tsx           # Storybook stories
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
  /** Brief description of prop */
  variant?: ComponentNameVariant;
  /** Brief description of prop */
  size?: ComponentNameSize;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Component content */
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

**Key Points:**

- Document surfaces and tokens used in the JSDoc comment
- Export types alongside the component
- Always set `displayName` for React DevTools
- Spread remaining props for extensibility
- Compose `className` — never override it

### displayName Requirement

Every component MUST have a `displayName` for debugging in React DevTools:

```tsx
export function ComponentName({ ... }: ComponentNameProps) {
  // component implementation
}

ComponentName.displayName = 'ComponentName';
```

For compound components, use dot notation:

```tsx
export function Card({ ... }: CardProps) { ... }
function CardTitle({ ... }: CardTitleProps) { ... }

Card.Title = CardTitle;
Card.displayName = 'Card';
CardTitle.displayName = 'Card.Title';
```

### 2. Styles File (`ComponentName.module.css`)

```css
/**
 * ComponentName styles
 *
 * Surfaces: control, controlPrimary, controlDanger
 * See core/TOKEN_GUIDE.md for token reference
 */

.root {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-weight: var(--weight-medium);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-default);
  white-space: nowrap;
}

/* ==============================================
   Focus States
   ============================================== */

.root:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring);
  outline-offset: var(--focus-ring-offset);
}

/* ==============================================
   Size Variants - MUST match control height standards
   ============================================== */

.sm {
  height: 28px; /* --size-control-sm */
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-sm);
}

.md {
  height: 36px; /* --size-control-md */
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-base);
}

.lg {
  height: 44px; /* --size-control-lg */
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-lg);
}

/* ==============================================
   Variants
   ============================================== */

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

/* ==============================================
   Disabled State
   ============================================== */

.disabled {
  background: var(--controlDisabled-bg);
  color: var(--controlDisabled-text);
  border-color: var(--controlDisabled-border);
  cursor: not-allowed;
  pointer-events: none;
}

/* ==============================================
   Reduced Motion
   ============================================== */

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

**All components MUST support standard HTML attributes** that get applied to the root element. This enables consumers to pass styles, accessibility attributes, and data attributes without wrapper elements.

### Required Pattern

Every component should:

1. Extend appropriate HTML attributes for the root element type
2. Spread remaining props onto the root element
3. Compose `className` (never override)

```tsx
import type { HTMLAttributes, ReactNode } from 'react';

// 1. Extend the appropriate HTML attributes interface
export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated';
  children: ReactNode;
}

export function Panel({
  variant = 'default',
  className, // 2. Destructure className separately
  children,
  ...props // 3. Collect remaining props
}: PanelProps) {
  // 4. Compose className (never override)
  const classNames = [styles.panel, styles[variant], className].filter(Boolean).join(' ');

  return (
    // 5. Spread props onto root element
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}
```

### Supported Standard Props

By extending HTML attributes, components automatically support:

| Prop Category  | Examples                   | Use Case             |
| -------------- | -------------------------- | -------------------- |
| `className`    | `className="custom"`       | Custom styling       |
| `style`        | `style={{ marginTop: 8 }}` | Inline styles        |
| `id`           | `id="my-panel"`            | DOM identification   |
| `data-*`       | `data-testid="panel"`      | Testing, custom data |
| `aria-*`       | `aria-label="Section"`     | Accessibility        |
| Event handlers | `onClick`, `onFocus`       | Interaction          |

### HTML Attribute Interfaces

Use the appropriate interface based on the root element:

| Root Element          | Interface                                 |
| --------------------- | ----------------------------------------- |
| `<div>`               | `HTMLAttributes<HTMLDivElement>`          |
| `<button>`            | `ButtonHTMLAttributes<HTMLButtonElement>` |
| `<input>`             | `InputHTMLAttributes<HTMLInputElement>`   |
| `<a>`                 | `AnchorHTMLAttributes<HTMLAnchorElement>` |
| `<span>`, `<p>`, etc. | `HTMLAttributes<HTMLElement>`             |

---

## Polymorphic Components (the `as` Prop)

Some components support changing the underlying HTML element via the `as` prop. This enables semantic flexibility without sacrificing component features.

### When to Support `as`

| Component Type             | Support `as`? | Example                                 |
| -------------------------- | ------------- | --------------------------------------- |
| Typography (Text, Heading) | Yes           | Render as `span`, `p`, `label`          |
| Layout (Stack, Grid)       | Optional      | Render as `section`, `article`          |
| Navigation (Link, Button)  | Limited       | Button can be `a` for links             |
| Interactive Controls       | No            | Input, Checkbox stay as native elements |

### Basic Polymorphic Pattern (ElementType)

For components where the element type doesn't affect available props:

```tsx
import { type ReactNode, type ElementType, type HTMLAttributes } from 'react';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** HTML element to render */
  as?: ElementType;
  size?: 'sm' | 'md' | 'lg';
}

export function Text({ children, as: Component = 'span', size = 'md', className, ...props }: TextProps) {
  const classNames = [styles.text, styles[size], className].filter(Boolean).join(' ');

  return (
    <Component className={classNames} {...props}>
      {children}
    </Component>
  );
}
```

### Type-Safe Polymorphic Pattern (Discriminated Unions)

For components where the element type affects available props (e.g., Button with `href`):

```tsx
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

interface ButtonBaseProps {
  variant?: 'default' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
}

// Button element (default)
export interface ButtonAsButtonProps extends ButtonBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  as?: 'button';
  href?: never; // Disallow href for buttons
}

// Anchor element
export interface ButtonAsAnchorProps extends ButtonBaseProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> {
  as: 'a';
  href: string; // Require href for anchors
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

export function Button(props: ButtonProps) {
  const { as = 'button', variant, size, className, children, ...rest } = props;

  const classNames = [styles.button, styles[variant], styles[size], className].filter(Boolean).join(' ');

  if (as === 'a') {
    return (
      <a className={classNames} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classNames} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
```

### Usage Examples

```tsx
// Text with different elements
<Text>Default span</Text>
<Text as="p">Paragraph text</Text>
<Text as="label" htmlFor="input-id">Label text</Text>

// Button as navigation link
<Button variant="primary">Submit</Button>
<Button as="a" href="/dashboard" variant="primary">Go to Dashboard</Button>

// Stack with semantic element
<Stack direction="vertical" gap="md">...</Stack>
<Stack as="nav" direction="horizontal" gap="sm">...</Stack>
```

### Documenting `as` in Stories

Always include an example showing the `as` prop in action:

```tsx
export const AsElement: Story = {
  args: {
    as: 'p',
    children: 'This renders as a paragraph element instead of the default span.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the `as` prop to change the underlying HTML element while preserving all component styling and behavior.',
      },
    },
  },
};
```

---

## Naming Conventions

### Component Names

- Use PascalCase: `Button`, `SegmentedControl`, `TreeView`
- Be descriptive but concise
- Compound components use the parent name: `Tabs`, `TabList`, `TabPanel`

### File Names

- Match the component name: `Button.tsx`, `Button.module.css`
- Stories: `stories/Button/index.stories.tsx`
- Tests: `Button.test.tsx`

### CSS Class Names

- Use camelCase: `.root`, `.primary`, `.isActive`
- Use semantic names, not visual: `.danger` not `.red`
- State modifiers: `.disabled`, `.active`, `.loading`

### Props

- Use consistent naming across components:
  - `variant` - visual style variation
  - `size` - sm | md | lg
  - `disabled` - boolean
  - `fullWidth` - boolean
  - `icon` - leading icon
  - `iconAfter` - trailing icon

---

## Common Patterns and Anti-Patterns

### Button Icons: Always Use Props, Not Children

**CRITICAL:** Never place icons directly in Button children. Always use the `icon` or `iconAfter` props. This ensures proper spacing and alignment are handled by the Button's CSS.

```tsx
// ❌ WRONG - Icon in children breaks spacing/alignment
<Button variant="primary">
  <Spinner />
  Processing...
</Button>

// ✅ CORRECT - Use icon prop for proper spacing
<Button variant="primary" icon={<Spinner />}>
  Processing...
</Button>

// ✅ CORRECT - Conditional icon for loading states
<Button
  variant="primary"
  icon={isLoading ? <Spinner /> : undefined}
  disabled={isLoading}
>
  {isLoading ? 'Processing...' : 'Submit'}
</Button>

// ✅ CORRECT - Trailing icon
<Button iconAfter={<ArrowRightIcon />}>
  Next
</Button>
```

The `icon` and `iconAfter` props:

- Apply consistent `gap` via the `.icon` CSS class
- Ensure proper vertical alignment
- Handle sizing automatically based on button size

### Text Layout: Always Use Stack for Vertical Content

**CRITICAL:** Container components like `Panel`, `Card`, etc. do NOT automatically stack or space their children. The `Text` component renders as a `<span>` (inline element) by default, which means multiple Text elements will flow **horizontally on the same line** with no gap.

```tsx
// ❌ WRONG - Text renders inline, will appear on same line with no gap
<Panel padding="lg">
  <Text weight="medium">Title</Text>
  <Text size="sm" color="soft">Description</Text>
</Panel>
// Result: "TitleDescription" on one line

// ✅ CORRECT - Use Stack to create vertical layout with proper gap
<Panel padding="lg">
  <Stack gap="xs">
    <Text weight="medium">Title</Text>
    <Text size="sm" color="soft">Description</Text>
  </Stack>
</Panel>
// Result: Title on line 1, Description on line 2, with spacing
```

**Key Rules:**

1. **Never assume containers provide layout** - Panel, Card, etc. are styling wrappers only
2. **Always use Stack for vertical content** - Wrap multiple elements in `<Stack>` or `<Stack gap="...">`
3. **Text is inline by default** - Multiple Text elements will flow horizontally without Stack
4. **Choose appropriate gap** - Stack defaults to `gap="md"` but be intentional about sizing

**Stack defaults:**

- `direction="vertical"` - Children stack top to bottom
- `gap="md"` - Medium spacing between children

**Standard gap sizes for text:**
| Gap | Use Case |
|-----|----------|
| `xs` | Title + subtitle, label + helper text (tighter coupling) |
| `sm` | Related paragraphs, form field groups |
| `md` | Section content, card body elements (Stack default) |
| `lg` | Major sections within a container |

---

## Sizing Standards

**CRITICAL:** All interactive controls MUST use consistent heights so they align when placed side-by-side.

### Standard Control Heights

| Size | Height | Use Case                          |
| ---- | ------ | --------------------------------- |
| `sm` | 28px   | Compact UI, toolbars, table cells |
| `md` | 36px   | Default for most controls         |
| `lg` | 44px   | Hero sections, touch targets      |

### Components That Must Match

These components should all align when placed in a row:

- Button
- Input
- Select
- SegmentedControl
- Checkbox (with label)
- Radio (with label)
- Switch
- IconButton

### Example Alignment Test

```tsx
// These should all be the same height and align perfectly
<Stack direction="row" gap="sm" align="center">
  <Input size="md" placeholder="Search..." />
  <SegmentedControl size="md" options={viewOptions} />
  <Button size="md">Submit</Button>
  <IconButton size="md" icon={<SettingsIcon />} />
</Stack>
```

---

## Token Usage

Always use design tokens. Never hardcode values.

### Reference Guide

- **Complete Guide**: `../core/TOKEN_GUIDE.md` — Full token reference

### The Golden Rule

**Always pair `-bg` and `-text` tokens from the same role to ensure accessible contrast:**

```css
/* ✅ CORRECT - same role guarantees contrast */
.primary {
  background: var(--controlPrimary-bg);
  color: var(--controlPrimary-text);
}

/* ❌ WRONG - mixing roles breaks contrast */
.broken {
  background: var(--controlPrimary-bg);
  color: var(--page-text);
}
```

### Common Token Patterns

```css
/* Background colors */
background: var(--control-bg);
background: var(--inset-bg);
background: var(--card-bg);

/* Text colors */
color: var(--control-text);
color: var(--page-text-soft); /* Secondary text */

/* Spacing */
padding: var(--space-2) var(--space-4);
gap: var(--space-2);
margin-bottom: var(--space-4);

/* Border radius */
border-radius: var(--radius-md);

/* Transitions */
transition: all var(--duration-fast) var(--ease-default);

/* Focus */
outline: var(--focus-ring-width) solid var(--focus-ring);
outline-offset: var(--focus-ring-offset);
```

### Forbidden Patterns

```css
/* NEVER do this */
background: #3b82f6; /* Use --controlPrimary-bg */
color: white; /* Use --controlPrimary-text */
padding: 8px 16px; /* Use var(--space-2) var(--space-4) */
border-radius: 4px; /* Use var(--radius-md) */
transition: all 150ms ease; /* Use var(--duration-fast) var(--ease-default) */
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

---

## Accessibility Requirements

### Keyboard Navigation

All interactive components MUST be keyboard accessible:

```tsx
// Support keyboard activation
<button
  type="button"
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleActivation();
    }
  }}
>
```

### ARIA Attributes

Use appropriate ARIA roles and attributes:

```tsx
// Radio group pattern (SegmentedControl, Tabs)
<div role="radiogroup" aria-label="View options">
  <button role="radio" aria-checked={isSelected}>Option</button>
</div>

// Tab pattern
<div role="tablist">
  <button role="tab" aria-selected={isActive} aria-controls="panel-id">
    Tab
  </button>
</div>
<div role="tabpanel" id="panel-id">Content</div>
```

### Focus Visibility

Always show visible focus indicators:

```css
.control:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring);
  outline-offset: var(--focus-ring-offset);
}

/* NEVER hide focus completely */
/* .control:focus { outline: none; } ← BAD */
```

### Screen Reader Support

- Provide `aria-label` for icon-only controls
- Use semantic HTML elements where possible
- Include `title` or tooltip for abbreviated content

### Focus Trapping (Overlays)

Modal overlays (Modal, Dialog, Drawer) MUST trap focus within the overlay while open:

```tsx
import { useFocusTrap } from '../hooks/useFocusTrap';

function Modal({ visible, children }) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Trap focus when visible (deactivate during exit animation)
  useFocusTrap(modalRef, visible && !exiting);

  return (
    <div ref={modalRef} role="dialog" aria-modal="true">
      {children}
    </div>
  );
}
```

The `useFocusTrap` hook:

- Traps Tab/Shift+Tab within the container
- Saves focus on activation, restores on deactivation
- Finds all focusable elements automatically

### WAI-ARIA Patterns

Follow WAI-ARIA Authoring Practices for complex widgets:

| Component | ARIA Pattern                                                             | Key Requirements                                                               |
| --------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Tabs      | [Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)           | `role="tablist/tab/tabpanel"`, `aria-selected`, `aria-controls`, arrow key nav |
| Menu      | [Menu Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu/)           | `role="menu/menuitem"`, `aria-expanded`, `aria-haspopup`                       |
| Dialog    | [Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) | `role="dialog"`, `aria-modal`, focus trap, Escape to close                     |
| Tooltip   | [Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)     | `role="tooltip"`, `aria-describedby` linking                                   |
| Accordion | [Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) | `aria-expanded`, `aria-controls`, keyboard nav                                 |

### Toast/Alert Accessibility

Use appropriate roles based on message urgency:

```tsx
// Critical alerts (warning, error) - interrupt user
<div role="alert" aria-live="assertive" aria-atomic="true">
  {message}
</div>

// Non-critical status (info, success) - don't interrupt
<div role="status" aria-live="polite" aria-atomic="true">
  {message}
</div>
```

### RTL Support

Components MUST work correctly in right-to-left layouts. RTL support is not optional.

#### Use CSS Logical Properties

**ALWAYS use logical properties** instead of physical directional properties:

| Physical (AVOID)    | Logical (USE)           |
| ------------------- | ----------------------- |
| `margin-left`       | `margin-inline-start`   |
| `margin-right`      | `margin-inline-end`     |
| `padding-left`      | `padding-inline-start`  |
| `padding-right`     | `padding-inline-end`    |
| `left: 0`           | `inset-inline-start: 0` |
| `right: 0`          | `inset-inline-end: 0`   |
| `text-align: left`  | `text-align: start`     |
| `text-align: right` | `text-align: end`       |
| `border-left`       | `border-inline-start`   |
| `border-right`      | `border-inline-end`     |

**Note on positioning:** For absolute/fixed positioned elements, use `inset-inline-start` and `inset-inline-end` instead of `left` and `right`. This is critical for dropdown menus, tooltips, and popovers to align correctly in RTL.

```css
/* ❌ WRONG - Physical properties break in RTL */
.item {
  text-align: left;
  padding-left: var(--space-4);
  margin-right: var(--space-2);
}

/* ✅ CORRECT - Logical properties adapt to direction */
.item {
  text-align: start;
  padding-inline-start: var(--space-4);
  margin-inline-end: var(--space-2);
}
```

#### Flexbox and RTL

Flexbox `row` direction automatically reverses in RTL contexts, which is usually the desired behavior. However, be aware of edge cases:

```css
/* Flexbox gap and alignment work correctly in RTL */
.row {
  display: flex;
  flex-direction: row; /* Items will flow right-to-left in RTL */
  gap: var(--space-2);
}
```

#### When to Use `dir` Prop

Components that have directional behavior (like submenus, arrow indicators) should accept a `dir` prop:

```tsx
interface Props {
  /** Direction for text and layout. Affects submenu expansion direction. */
  dir?: 'ltr' | 'rtl';
}

// Use dir to determine directional behavior
const expandKey = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
const submenuIndicator = dir === 'rtl' ? '◀' : '▶';
```

#### RTL Testing Checklist

- [ ] Text is aligned to the start (right in RTL)
- [ ] Icons/indicators flip direction appropriately
- [ ] Submenus/popovers open in the correct direction
- [ ] Keyboard navigation (left/right arrows) respects direction
- [ ] Spacing is mirrored correctly

#### Story for RTL

Include an RTL story for components with directional behavior:

```tsx
export const RTLSupport: Story = {
  render: () => (
    <div dir="rtl" style={{ textAlign: 'right' }}>
      <Component dir="rtl" {...props} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'RTL mode: text aligns right, submenus expand left.',
      },
    },
  },
};
```

---

## Animation Guidelines

### Initial Render

Skip animations on initial render to prevent jarring effects:

```tsx
const [isInitialRender, setIsInitialRender] = useState(true);

useLayoutEffect(() => {
  // Position indicator immediately
  updateIndicator();

  // Mark initial render complete after first paint
  if (isInitialRender) {
    requestAnimationFrame(() => {
      setIsInitialRender(false);
    });
  }
}, [activeValue]);

// Apply transition only after initial render
const style = {
  transition: isInitialRender ? 'none' : undefined,
};
```

### Duration Standards

| Animation Type                    | Duration Token      | Value |
| --------------------------------- | ------------------- | ----- |
| Micro-interactions (hover, focus) | `--duration-fast`   | 100ms |
| State changes (expand, slide)     | `--duration-normal` | 200ms |
| Page transitions                  | `--duration-slow`   | 300ms |

### Easing

Use `--ease-default` for most animations. It provides smooth deceleration.

### Respect Reduced Motion

Always include reduced motion media query:

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

### Animated Indicators

For sliding indicators (Tabs, SegmentedControl):

```css
.indicator {
  position: absolute;
  /* Use transform for smooth animation (GPU accelerated) */
  transition: transform var(--duration-normal) cubic-bezier(0.4, 0, 0.2, 1), width var(--duration-normal) cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, width;
}
```

---

## Story Documentation

Every component needs comprehensive Storybook documentation with consistent structure across all stories. Story files live in `stories/ComponentName/index.stories.tsx`.

### Story File Structure

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { ComponentName } from '@fluentui-contrib/cap-foundations-react';

const meta = {
  title: 'Cap Foundations / ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered', // 'centered' | 'padded' | 'fullscreen'
    docs: {
      description: {
        component: `
Brief description of the component and its purpose.

## When to Use

- Use case 1
- Use case 2
- Use case 3

## Variants

| Variant | Use Case |
|---------|----------|
| \`default\` | Secondary actions, most common usage |
| \`primary\` | Main call-to-action, one per section |
| \`danger\` | Destructive actions |

## Sizes

Heights match other controls for consistent alignment:

- **sm** (28px): Compact UI, toolbars, inline actions
- **md** (36px): Default size for most use cases
- **lg** (44px): Hero sections, prominent CTAs

## Accessibility

- Supports keyboard navigation (Enter/Space to activate)
- Uses \`role="button"\` for semantic meaning
- Focus visible with standard focus ring

## Usage

\`\`\`tsx
import { ComponentName } from '@fluentui-contrib/cap-foundations-react';

<ComponentName variant="primary" size="md">
  Click me
</ComponentName>
\`\`\`
        `,
      },
    },
  },
  // Use fn() for callback props to enable action logging
  args: {
    onChange: fn(),
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'danger'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant matching control heights',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the component is disabled',
    },
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with controls
export const Default: Story = {
  args: {
    children: 'Component',
    variant: 'default',
    size: 'md',
  },
};

// Individual variants
export const Primary: Story = {
  args: {
    children: 'Primary',
    variant: 'primary',
  },
};

// Size comparison
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <ComponentName size="sm">Small</ComponentName>
      <ComponentName size="md">Medium</ComponentName>
      <ComponentName size="lg">Large</ComponentName>
    </div>
  ),
};

// All variants comparison
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <ComponentName variant="default">Default</ComponentName>
      <ComponentName variant="primary">Primary</ComponentName>
      <ComponentName variant="danger">Danger</ComponentName>
    </div>
  ),
};

// Disabled states
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <ComponentName disabled variant="default">
        Disabled Default
      </ComponentName>
      <ComponentName disabled variant="primary">
        Disabled Primary
      </ComponentName>
    </div>
  ),
};

// Controlled example (if applicable)
const ControlledExample = () => {
  const [value, setValue] = useState('option1');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ComponentName value={value} onChange={setValue} />
      <p>
        Selected: <strong>{value}</strong>
      </p>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

// Alignment test (for controls)
export const AlignmentTest: Story = {
  name: 'Alignment with Other Controls',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Input size="md" placeholder="Input" style={{ width: 150 }} />
      <ComponentName size="md">Component</ComponentName>
      <Button size="md">Button</Button>
    </div>
  ),
};
```

### Individual Story Descriptions

Add descriptions to individual stories to explain specific behaviors or use cases:

```tsx
export const IconOnly: Story = {
  args: {
    options: iconOptions,
    defaultValue: 'align-left',
    iconOnly: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon-only mode for compact toolbars. Labels are visually hidden but still accessible to screen readers.',
      },
    },
  },
};
```

### Decorators for Story Context

Use decorators when stories need specific container sizing or context:

```tsx
export const FullWidth: Story = {
  args: {
    options: basicOptions,
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

// For fullscreen layouts
const meta = {
  // ...
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', padding: '16px', boxSizing: 'border-box' }}>
        <Story />
      </div>
    ),
  ],
};
```

### Layout Parameters

Use the `layout` parameter to control story canvas behavior:

| Value        | Use Case                                                  |
| ------------ | --------------------------------------------------------- |
| `centered`   | Default, centers component (good for buttons, controls)   |
| `padded`     | Adds padding around component (good for cards, panels)    |
| `fullscreen` | No padding, fills canvas (good for page layouts, editors) |

---

## Testing Requirements

### Unit Tests (`ComponentName.test.tsx`)

Test files live alongside the component source: `src/components/ComponentName/ComponentName.test.tsx`.

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  // Rendering tests
  it('renders correctly', () => {
    render(<ComponentName>Content</ComponentName>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    render(<ComponentName variant="primary">Primary</ComponentName>);
    expect(screen.getByText('Primary')).toHaveClass('primary');
  });

  it('applies size classes', () => {
    render(<ComponentName size="lg">Large</ComponentName>);
    expect(screen.getByText('Large')).toHaveClass('lg');
  });

  // Disabled state
  it('handles disabled state', () => {
    render(<ComponentName disabled>Disabled</ComponentName>);
    expect(screen.getByText('Disabled')).toHaveClass('disabled');
  });

  // Interaction tests
  it('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    render(<ComponentName onChange={handleChange}>Click me</ComponentName>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleChange).toHaveBeenCalled();
  });

  // Keyboard accessibility
  it('activates on Enter key', () => {
    const handleChange = jest.fn();
    render(<ComponentName onChange={handleChange}>Press Enter</ComponentName>);
    fireEvent.keyDown(screen.getByText('Press Enter'), { key: 'Enter' });
    expect(handleChange).toHaveBeenCalled();
  });

  // Accessibility tests
  it('has correct ARIA attributes', () => {
    render(<ComponentName aria-label="Test">Content</ComponentName>);
    expect(screen.getByLabelText('Test')).toBeInTheDocument();
  });
});
```

**Test rules:**

- Use `@testing-library/react` (query by role/label, not class names)
- Test behavior, not implementation details
- Use `jest.fn()` — not `vi.fn()` (this package uses Jest, not Vitest)
- SSR-safe: tests run in `jsdom` environment; no bare `window` / `document` calls without `typeof x !== 'undefined'` guards

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

Before marking a component complete, verify all items:

### Structure

- [ ] Component in its own directory under `src/components/`
- [ ] All required files present (tsx, css, index)
- [ ] Story file in `stories/ComponentName/index.stories.tsx`
- [ ] Exported from main `src/index.ts`
- [ ] Types exported alongside component

### Standard Props

- [ ] Props interface extends appropriate HTML attributes (`HTMLAttributes<HTMLDivElement>`, etc.)
- [ ] Spreads `...props` onto root element
- [ ] Composes `className` (never overrides consumer className)
- [ ] Supports `style`, `id`, `data-*`, `aria-*` attributes automatically
- [ ] `as` prop documented if supported (for polymorphic components)
- [ ] `displayName` set on all exported components

### Naming

- [ ] Component name is PascalCase
- [ ] Files match component name
- [ ] Props use standard naming (variant, size, disabled)

### Styling

- [ ] Uses CSS modules
- [ ] All values from design tokens (no hardcoded colors, spacing, etc.)
- [ ] Heights match control size standards (28px/36px/44px)
- [ ] Proper focus ring styles
- [ ] Disabled state styled
- [ ] Reduced motion media query included

### Accessibility

- [ ] Keyboard accessible (Tab, Enter, Space, Arrow keys as appropriate)
- [ ] Proper ARIA roles and attributes per WAI-ARIA APG patterns
- [ ] Focus visible for all interactive states
- [ ] Works with screen readers
- [ ] Focus trap for modal overlays (Modal, Dialog, Drawer)
- [ ] Toast/Alert uses correct role (alert/status) based on urgency

### RTL Support

- [ ] Uses CSS logical properties (not left/right, use start/end)
- [ ] `text-align: start` instead of `text-align: left`
- [ ] `margin-inline-start/end` instead of `margin-left/right`
- [ ] `padding-inline-start/end` instead of `padding-left/right`
- [ ] Directional indicators flip in RTL (arrows, chevrons)
- [ ] Keyboard navigation respects direction (if applicable)

### Animation

- [ ] Skip animation on initial render
- [ ] Uses duration tokens
- [ ] Uses easing tokens
- [ ] Respects prefers-reduced-motion

### Documentation

- [ ] Story file with `tags: ['autodocs']`
- [ ] **Component description in meta** with ALL of the following sections:
  - [ ] Brief description of purpose
  - [ ] **When to Use** - bullet list of use cases
  - [ ] **Variants** - table with variant name and use case
  - [ ] **Sizes** - explanation of each size with heights (28px/36px/44px)
  - [ ] **Accessibility** - keyboard support, ARIA roles, screen reader info
  - [ ] **Usage** - code example showing import and basic usage
- [ ] Individual story descriptions for non-obvious behaviors
- [ ] All variants shown as separate stories
- [ ] All sizes shown (typically in a "Sizes" story)
- [ ] Disabled states shown
- [ ] Controlled example (if component supports controlled mode)
- [ ] Alignment test with other controls (for interactive controls)
- [ ] RTL story (for components with directional behavior)

### Layout in Stories

- [ ] Multiple text elements wrapped in `<Stack gap="...">` for vertical layout
- [ ] Explicit gap values used (xs, sm, md, lg) — never rely on implicit spacing
- [ ] No inline Text elements placed side-by-side without Stack wrapper
- [ ] Container children (Panel, Card) have explicit layout, not just raw content

### Testing

- [ ] Renders correctly
- [ ] Variants apply correct classes
- [ ] Sizes apply correct classes
- [ ] Disabled state works
- [ ] Interactions fire callbacks
- [ ] Keyboard navigation works
- [ ] ARIA attributes correct

### Build verification

- [ ] `nx run cap-foundations-react:type-check` passes
- [ ] `nx run cap-foundations-react:build` passes
- [ ] `nx run cap-foundations-react:lint` passes — 0 errors
- [ ] `nx run cap-foundations-react:test` passes

---

## Examples of Well-Implemented Components

Reference these components as examples of proper implementation:

- **Button** - Variants, sizes, icons, disabled states
- **Input** - Inset styling, focus states, error states
- **Tabs** - Animated indicator, keyboard navigation, ARIA
- **Modal** - Overlay, focus trap, escape to close
- **Accordion** - Expand/collapse animation, keyboard nav

---

## Getting Help

- **Token Guide**: `../core/TOKEN_GUIDE.md` — Complete token documentation
- **Existing Components**: Browse `src/components/` for implementation patterns
