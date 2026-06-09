# Designer Onboarding Guide

This guide helps designers get started creating UI components and mock pages using VS Code and an AI coding assistant (Claude Code, GitHub Copilot, etc.).

---

## Initial Setup (One Time)

### 1. Install Dependencies

1. Open VS Code and open the `fluentui-contrib` folder
2. Open the terminal: Press `` Ctrl+` `` (backtick) or **View → Terminal**
3. Run:
   ```bash
   yarn install
   ```

### 2. Build Core Tokens

The build generates CSS theme files that components depend on:

```bash
yarn nx run cap-foundations-core:build
```

### 3. Start the AI Assistant

Open your AI coding assistant in VS Code (Claude Code sidebar, GitHub Copilot chat, etc.). You're ready to start creating components and mock pages.

---

## Daily Use

### 1. Open the Project

Open the `fluentui-contrib` folder in VS Code.

### 2. Open Terminal in VS Code

Press `` Ctrl+` `` (backtick) or go to **View → Terminal** to open the integrated terminal.

### 3. Start Storybook

Run this command in the terminal:

```bash
yarn nx run cap-foundations-react:storybook
```

This opens Storybook at http://localhost:4401

### 4. Open the Browser

After running the command, click the URL in the terminal (http://localhost:4401) to open Storybook in your browser.

---

## Creating Components

Components are reusable UI building blocks. They live in:

```
packages/cap-foundations/react/src/components/
```

### Using an AI Assistant to Create a Component

**Example prompt:**

```
Create a new "FeatureCard" component in packages/cap-foundations/react that displays:
- An icon at the top (using @fluentui/react-icons)
- A title
- A description
- An optional "Learn more" link

Read and follow packages/cap-foundations/react/COMPONENT_GUIDE.md.
Read and follow packages/cap-foundations/core/TOKEN_GUIDE.md for design tokens.
Include a Storybook story file with examples.
```

### Component File Structure

The AI assistant will create these files for you:

```
src/components/FeatureCard/
├── FeatureCard.tsx           # The component code
├── FeatureCard.module.css    # Styles using design tokens
└── index.ts                  # Export file

stories/FeatureCard/
└── index.stories.tsx         # Storybook examples
```

---

## Creating Mock Pages _(Phase 8 — not yet available)_

> **Note**: The mock-pages package doesn't exist yet. These instructions are forward-looking for Phase 8. Components (Phase 7) must be complete first.

Mock pages are full-page designs that demonstrate how components work together. They will live in:

```
packages/cap-foundations/mock-pages/src/
```

### Using an AI Assistant to Create a Mock Page

**Example prompt:**

```
Create a new mock page in packages/cap-foundations/mock-pages for a "Task Dashboard" that shows:
- A header with a title and user avatar
- A sidebar with navigation items (use icons from @fluentui/react-icons)
- A main area with task cards in a grid
- Each card should show task title, status badge, and due date

Read and follow packages/cap-foundations/core/TOKEN_GUIDE.md for available design tokens.
Use existing components from @fluentui-contrib/cap-foundations-react where possible.
```

### Important Rules for Mock Pages

1. **Always use design tokens** — Never use hardcoded colors like `#ffffff` or `blue`
2. **Stay within color groups** — If you use `--soft-bg`, use `--soft-fg` for text (see TOKEN_GUIDE.md)
3. **Use existing components first** — Check what's available before creating custom elements

---

## Icons

This project uses **@fluentui/react-icons** — a library of thousands of Fluent UI icons.

### Using Icons in Components

```tsx
import { SearchRegular, AddRegular, DeleteRegular } from '@fluentui/react-icons';

// Pass icons as props
<Button icon={<SearchRegular />}>Search</Button>
<Input icon={<SearchRegular />} placeholder="Search..." />

// Use icons directly
<SearchRegular fontSize={20} />
```

### Finding Icons

Browse available icons at https://react.fluentui.dev/?path=/docs/icons-catalog--docs

Icon names follow the pattern: `{Name}{Style}` where style is `Regular`, `Filled`, `Light`, or `Color`.

Examples: `SearchRegular`, `AddFilled`, `DeleteRegular`, `HomeRegular`, `SettingsRegular`

---

## Essential Guides to Reference

When working with your AI assistant, tell it to read these guides in your prompts:

| Guide                   | Path (from project root)                            | Use For                                                   |
| ----------------------- | --------------------------------------------------- | --------------------------------------------------------- |
| **TOKEN_GUIDE.md**      | `packages/cap-foundations/core/TOKEN_GUIDE.md`      | All available design tokens (colors, spacing, typography) |
| **TOKEN_CHEATSHEET.md** | `packages/cap-foundations/docs/TOKEN_CHEATSHEET.md` | Quick token reference                                     |
| **COMPONENT_GUIDE.md**  | `packages/cap-foundations/react/COMPONENT_GUIDE.md` | How to structure and build components                     |

**Tip:** Always include "Read and follow [guide path]" in your prompts so the AI uses the correct patterns.

---

## Common Design Tokens

### Colors (The Golden Rule)

**Always match your background and foreground from the same group:**

```css
/* Correct — same group */
.card {
  background: var(--soft-bg);
  color: var(--soft-fg);
  border: 1px solid var(--soft-border);
}

/* Wrong — mixed groups */
.card {
  background: var(--soft-bg);
  color: var(--base-fg); /* This may not be readable! */
}
```

### Available Color Groups

| Group     | Use For                                   |
| --------- | ----------------------------------------- |
| `softer`  | Input fields, code blocks, recessed areas |
| `soft`    | Cards, panels, alternating rows           |
| `base`    | Page background (default)                 |
| `strong`  | Buttons, highlights                       |
| `primary` | Primary actions, selected states          |
| `success` | Success messages                          |
| `warning` | Warning messages                          |
| `danger`  | Errors, destructive actions               |

### Spacing

```css
var(--space-1)   /* 4px */
var(--space-2)   /* 8px */
var(--space-3)   /* 12px */
var(--space-4)   /* 16px */
var(--space-6)   /* 24px */
var(--space-8)   /* 32px */
```

### Typography

```css
var(--font-size-xs)    /* 12px */
var(--font-size-sm)    /* 14px */
var(--font-size-md)    /* 16px */
var(--font-size-lg)    /* 18px */
var(--font-size-xl)    /* 20px */
```

---

## Viewing Your Changes

1. After the AI assistant creates or modifies files, the Storybook dev server automatically reloads
2. Check your browser — the new component/page should appear in the sidebar
3. If it doesn't appear, refresh the browser

---

## Example Prompts

### Creating a Dashboard Mock Page

```
Create a mock page called "AnalyticsDashboard" in packages/cap-foundations/mock-pages that shows:
- A top nav bar with logo and user menu
- A stats summary row with 4 metric cards
- A main chart area
- A recent activity sidebar

Read and follow packages/cap-foundations/core/TOKEN_GUIDE.md for tokens.
Use components from @fluentui-contrib/cap-foundations-react.
Use icons from @fluentui/react-icons for visual polish.
```

### Creating an Interactive Component

```
Create a "RatingStars" component in packages/cap-foundations/react that:
- Shows 5 stars (use StarRegular and StarFilled from @fluentui/react-icons)
- Allows clicking to set a rating
- Has a read-only mode
- Uses the primary color for filled stars

Read and follow packages/cap-foundations/react/COMPONENT_GUIDE.md.
Create a Storybook story with interactive controls.
```

### Iterating on a Design

```
In the TaskDashboard mock page:
- Make the sidebar narrower (200px instead of 250px)
- Add hover states to the navigation items using --soft-bg-hover
- Change the task cards to use a 3-column grid on large screens
```

---

## Troubleshooting

### Storybook won't start

- Make sure you're at the `fluentui-contrib` root
- Try running `yarn install` first
- Ensure core is built: `yarn nx run cap-foundations-core:build`

### Changes don't appear in Storybook

- Check the terminal for errors (red text)
- Try refreshing the browser
- Make sure the file is saved (Ctrl+S / Cmd+S)

### The AI assistant made an error

- Share the error message with it
- Ask it to fix the issue
- Reference the appropriate guide for correct patterns

---

## Quick Reference Commands

| What                 | Command                                        |
| -------------------- | ---------------------------------------------- |
| Install dependencies | `yarn install` (from fluentui-contrib root)    |
| Build core tokens    | `yarn nx run cap-foundations-core:build`       |
| Start Storybook      | `yarn nx run cap-foundations-react:storybook`  |
| Stop the server      | Press `Ctrl+C` in terminal                     |
| Run lint check       | `yarn nx run cap-foundations-react:lint`       |
| Run type check       | `yarn nx run cap-foundations-react:type-check` |
| Run tests            | `yarn nx run cap-foundations-react:test`       |
