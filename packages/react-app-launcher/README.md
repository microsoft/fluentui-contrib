# @fluentui-contrib/react-app-launcher

A Microsoft 365-style app launcher for Fluent UI v9: a waffle trigger that opens
a docked panel of application tiles and rows.

The package ships no data and no application state. Which apps exist, when one
is disabled, what a search matches and what "recent" means are decisions of the
calling application — the package renders what it is given. The Storybook
stories are the live reference (see "Development" below).

## Install

```bash
npm install @fluentui-contrib/react-app-launcher
```

`react` and `@fluentui/react-components` are peer dependencies.

All blocks are exported from the package root:

```tsx
import { AppLauncher, AppLauncherGrid, AppLauncherItem, AppLauncherList, AppLauncherSearch, AppLauncherSection, AppLauncherTrigger } from '@fluentui-contrib/react-app-launcher';
```

## Quick start

A launcher in an application bar: the waffle trigger, a search field, a pinned
grid, and a result list while searching. The panel docks to the bar so it opens
flush with the window edge, the way the Microsoft 365 launcher behaves.

```tsx
import { AppLauncher, AppLauncherGrid, AppLauncherItem, AppLauncherList, AppLauncherSearch, AppLauncherSection } from '@fluentui-contrib/react-app-launcher';
import { useRef, useState } from 'react';

function AppMenu() {
  const barRef = useRef<HTMLElement>(null);
  const [query, setQuery] = useState('');

  const needle = query.trim().toLowerCase();
  const matches = apps.filter((app) => app.label.toLowerCase().includes(needle));

  return (
    <header ref={barRef}>
      <AppLauncher label="App launcher" dockTarget={barRef}>
        <AppLauncherSearch label="Search apps" value={query} onChange={(_event, data) => setQuery(data.value)} />
        {needle === '' ? (
          <AppLauncherSection title="Pinned">
            <AppLauncherGrid>
              {apps.map((app) => (
                <AppLauncherItem key={app.label} label={app.label} icon={app.icon} onClick={() => open(app)} />
              ))}
            </AppLauncherGrid>
          </AppLauncherSection>
        ) : (
          <AppLauncherSection>
            <AppLauncherList>
              {matches.map((app) => (
                <AppLauncherItem key={app.label} label={app.label} icon={app.icon} onClick={() => open(app)} />
              ))}
            </AppLauncherList>
          </AppLauncherSection>
        )}
      </AppLauncher>
    </header>
  );
}
```

## Blocks

| Block                | Purpose                                                                                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AppLauncher`        | The shell: waffle trigger plus the docked popover panel.                                                                                                        |
| `AppLauncherSearch`  | The search field, with the launcher's Escape behavior.                                                                                                          |
| `AppLauncherSection` | Groups content under an optional title, with spacing and an optional divider.                                                                                   |
| `AppLauncherGrid`    | Lays items out as tiles; three columns by default.                                                                                                              |
| `AppLauncherList`    | Lays items out as full-width rows.                                                                                                                              |
| `AppLauncherItem`    | One app — a tile or a row, depending on the surrounding container.                                                                                              |
| `AppLauncherTrigger` | The built-in waffle trigger button; the launcher renders it unless a caller-provided `trigger` replaces it. Exported for applications that place it themselves. |

### AppLauncher

| Prop           | Description                                                                                                                                                                                                                                                                                                                       |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`        | Accessible name of the trigger and its tooltip. Defaults to `'App launcher'` — pass a localized string. Applies to the built-in trigger only.                                                                                                                                                                                     |
| `icon`         | Trigger icon override. Defaults to the waffle glyph. Applies to the built-in trigger only.                                                                                                                                                                                                                                        |
| `trigger`      | Caller-provided trigger element, used instead of the built-in waffle button — for example a Fluent `ToolbarButton`, so the launcher can live in an application toolbar or a drawer header. The element must accept and forward injected props and a ref (the `PopoverTrigger` contract) and owns its accessible name and tooltip. |
| `positioning`  | Fluent popover positioning. Defaults to below the anchor, aligned with its start edge.                                                                                                                                                                                                                                            |
| `dockTarget`   | Element to anchor the panel to instead of the trigger — usually the application bar, so the panel docks flush with the window edge. The element must stay mounted while the launcher is open.                                                                                                                                     |
| `docking`      | `'default'` wraps the content; `'full'` stretches the panel from its anchored top edge to the bottom of the window. Either way the panel is capped at the window bottom and scrolls internally when the content is taller.                                                                                                        |
| `open`         | Controlled open state. Leave it undefined for the uncontrolled default; pass it with `onOpenChange` to close the panel from an item click, for example.                                                                                                                                                                           |
| `onOpenChange` | Fired whenever the launcher asks to change the open state: the trigger, Escape, or a click outside.                                                                                                                                                                                                                               |
| `children`     | The panel content: search, sections, grids and lists.                                                                                                                                                                                                                                                                             |

### AppLauncherSearch

A Fluent `SearchBox` with the launcher defaults. `label` is required and
becomes the accessible name (no visible label is rendered). `onChange` fires
with `{ value }` while typing, from the clear button, and when Escape clears a
controlled field. The remaining `SearchBox` props (`value`, `placeholder`,
`size`, ...) pass through; `onKeyDown` is owned by the block because the Escape
behavior lives there.

### AppLauncherSection

`title` renders above the content; `divider` draws a line between the section
and the previous one. Sections that follow another section get spacing either
way, so a plain `<AppLauncherSection>` (no title) works as an unlabeled group.

### AppLauncherItem

| Prop                | Description                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`             | The app name; also the accessible name.                                                                                                                                                                                                                                                                                                                                             |
| `icon`              | Any element: a sized Fluent icon (`*32` for tiles, `*20` for rows) or a colorful logo element. The item does not constrain the size.                                                                                                                                                                                                                                                |
| `disabled`          | Renders the item disabled — no activation, muted name, dimmed icon — for items an application disables from business rules.                                                                                                                                                                                                                                                         |
| `disabledFocusable` | Renders the item disabled but reachable: announced as disabled, kept in the tab order, never activating — click, Enter and Space do not fire `onClick`, and a focused item keeps the normal focus ring; the same muted look as `disabled`. When both `disabled` and `disabledFocusable` are set, the Button's precedence applies — the item stays focusable and announced disabled. |
| …                   | All native button props (`onClick`, `className`, `aria-*`, ...) pass through.                                                                                                                                                                                                                                                                                                       |

The container decides the layout: inside `AppLauncherGrid` the item renders as a
tile (icon above the name), inside `AppLauncherList` as a row (icon beside the
name, long names end in an ellipsis). The same `AppLauncherItem` is used for
both.

## Composition patterns

- **The application owns the state.** The package holds no query and no recent
  list: keep them in the calling component and switch what the panel renders,
  as the quick start does. The kitchen-sink story contains a fuller version
  with a recent section that updates when an app is clicked.
- **Activating an app closes the panel.** Keep the open state in the
  application (`open` + `onOpenChange`) and close it from the item click, the
  way the Microsoft 365 launcher behaves.
- **Tiles for browsing, rows for scanning.** A common layout is grids of tiles
  for pinned and all apps, and lists of rows for search results and recents —
  mixed freely inside one panel, section by section.
- **Icons are free-form.** Monochrome Fluent icons follow the item's text
  color, including the disabled color. Colorful logos are dimmed automatically
  while disabled (desaturated and faded to the lightness of the muted name).
- **The trigger can live in a toolbar.** Pass `trigger` with an element that
  accepts injected props and a ref — for example a Fluent `ToolbarButton` — and
  the launcher replaces its waffle with that element. The panel still anchors
  to the element itself, so a waffle inside a drawer's toolbar or an
  application bar opens the panel below the button.
- **Disabled items come from business rules.** Pass `disabled` per item; a
  disabled item shows the disabled look, ignores clicks and is skipped by
  keyboard navigation. Pass `disabledFocusable` instead to keep a disabled item
  reachable for keyboard users: it shows the same muted look and never
  activates, but stays in the tab order. When both are set, the Button's
  precedence applies — the item stays focusable and announced disabled.
- **Empty search results need a state.** Render a short message (for example
  "No apps found") in place of the result list, as the quick start shows.

### Docking

```tsx
// Default: the panel wraps its content, docked below the anchor.
<AppLauncher dockTarget={barRef}>…</AppLauncher>

// Full: the panel reaches the bottom of the window and scrolls internally.
<AppLauncher docking="full" dockTarget={barRef}>…</AppLauncher>

// Anchored to the trigger instead of the bar, aligned with its end edge.
<AppLauncher positioning={{ position: 'below', align: 'end' }}>…</AppLauncher>
```

The full panel keeps the default docking's 8px rounding on its top corners and
stays square at the bottom, where it meets the window edge.

## Behavior notes

- The built-in trigger is an icon-only button. Its label is both the
  accessible name and the tooltip; the tooltip is hidden while the panel is
  open without remounting the button. With a caller-provided `trigger`, that
  element is rendered as-is and owns its naming and tooltip.
- Keyboard: Tab moves through the panel content (no arrow-key grid), Enter and
  Space activate an item, and Escape clears a controlled query first — the
  second Escape closes the panel.
- A panel is capped at the space to the window bottom and scrolls internally
  when its content is taller, so a long app list never grows the page.
- The search field stays at the top of the panel while the content scrolls
  under it; the field never scrolls away. It forces the panel background — a
  custom `appearance`'s base background is overridden while its hover and focus
  states still apply.
- Tiles are white cards that stay flat at rest and lift with a soft shadow on
  hover; the hovered tile paints above its neighbors so the shadow falls
  evenly. The keyboard focus ring steps in front of the hover shadow.
- All colors, radii and shadows come from Fluent tokens, so the launcher
  follows the application's `FluentProvider` theme.

## Texts and localization

Every user-facing string is a prop; the package ships no string resource files.
The defaults are English and can be overridden per application:

| Text                             | Kind                      | Default                               | How to localize                                                                                        |
| -------------------------------- | ------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Trigger label (also the tooltip) | accessible name + tooltip | `'App launcher'`                      | `label` on `AppLauncher`/`AppLauncherTrigger`                                                          |
| Search field's accessible name   | accessible                | none — required                       | `label` on `AppLauncherSearch`                                                                         |
| Search placeholder               | visible                   | `'Search'`                            | `placeholder` (SearchBox passthrough)                                                                  |
| Clear button on the search field | accessible                | `'clear'` — set by Fluent's SearchBox | `dismiss={{ 'aria-label': '…' }}` (SearchBox passthrough; the slot merges over Fluent's default props) |
| Item names                       | visible + accessible      | none — caller content                 | `label` on `AppLauncherItem`                                                                           |
| Section titles                   | visible                   | none — caller content                 | `title` on `AppLauncherSection` (or omit)                                                              |
| Empty search state               | visible                   | none — caller content                 | render your own message instead of the result list                                                     |

A German search field — the override the localization story renders:

```tsx
<AppLauncherSearch label="Apps durchsuchen" placeholder="Suchen" dismiss={{ 'aria-label': 'Eingabe löschen' }} value={query} onChange={onQueryChange} />
```

## Development

Run the repository's Nx targets from the repository root:

```bash
yarn nx run react-app-launcher:build
yarn nx run react-app-launcher:test
yarn nx run react-app-launcher:lint
yarn nx run react-app-launcher:type-check
yarn nx run react-app-launcher:storybook
```

Tests live beside the sources (`src/**/*.test.tsx`). The stories under
`stories/AppLauncher` render every composition and the disabled, icon and
docking variants.
