# @fluentui-contrib/react-gamepad-navigation

**Gamepad Navigation for [Fluent UI React](https://react.fluentui.dev/)**

> [!WARNING]
> These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

This package provides gamepad navigation support for Fluent UI Components.
Any gaming controller implementing the [Gamepad API](https://w3c.github.io/gamepad/) is supported. Major brand controllers such as Xbox, PlayStation, Nintendo, 8bit, etc. are supported.

This hook calls [useArrowNavigationGroup](https://react.fluentui.dev/?path=/docs/utilities-focus-management-usearrownavigationgroup--docs) and [useFocusableGroup](https://react.fluentui.dev/?path=/docs/utilities-focus-management-usefocusablegroup--docs) internally.
For that reason, 'useGamepadNavigationGroup' hook uses the same API and configuration as those two previous hooks.

In addition to gamepad navigation, arrow key navigation is available by calling this hook, so there is no need to call `useArrowNavigationGroup` separately.

## Installation

```bash
yarn add @fluentui-contrib/react-gamepad-navigation
```

## Mappings

| Controller Input | Mapped Behavior                       |
| ---------------- | ------------------------------------- |
| 'A' Button       | 'Enter' keydown behavior              |
| 'B' Button       | 'Escape' keydown behavior             |
| 'X' Button       | Not supported                         |
| 'Y' Button       | Not supported                         |
| Bumpers          | Not supported                         |
| Dpad             | Arrow navigation (up/down/left/right) |
| Left Stick       | Arrow navigation (up/down/left/right) |
| Right Stick      | Not supported                         |
| Triggers         | Not supported                         |

## Components Support

### Single Elements

| Component  | Support            |
| ---------- | ------------------ |
| Button     | ✅ Supported       |
| Checkbox   | ✅ Supported       |
| Combobox   | ✅ Supported       |
| Dropdown   | ✅ Supported       |
| Input      | ✅ Supported       |
| Link       | ✅ Supported       |
| Menu       | ✅ Supported       |
| RadioGroup | ⚠️ Partial Support |
| Select     | ⛔ Not Supported   |
| Slider     | ⛔ Not Supported   |
| SpinButton | ⛔ Not Supported   |
| Switch     | ✅ Supported       |
| Textarea   | ✅ Supported       |

### Composed Elements

| Component       | Support            |
| --------------- | ------------------ |
| Accordion       | ✅ Supported       |
| Breadcrumb      | ✅ Supported       |
| DataGrid        | ✅ Supported       |
| InteractionTag  | ✅ Supported       |
| SwatchPicker    | ✅ Supported       |
| TabList         | ✅ Supported       |
| TagPicker       | ⚠️ Partial Support |
| TeachingPopover | ?                  |
| Toolbar         | ?                  |
| Tree            | ?                  |

## Usage

### To import Hook:

```ts
import { useGamepadNavigationGroup } from '@fluentui-contrib/react-gamepad-navigation';
```

### Examples

```tsx
export const SampleApp = () => {
  // attributes for both: Gamepad and Arrow key navigation
  const { gamepadNavDOMAttributes } = useGamepadNavigationGroup();

  return <div {...gamepadNavDOMAttributes}></div>;
};
```

## Options

The default configuration provides the closest behavior to a console navigation experience. However, All the configurations from `useArrowNavigationGroup` and `useFocusableGroup` hooks are available as part of the options for `useGamepadNavigationGroup`

### Hook Options

- **[`axis`](#axis)**
- **[`circular`](#circular)**
- **[`focusFirstElement`](#focusFirstElement)**
- **[`memorizeCurrent`](#memorizeCurrent)**
- **[`tabbable`](#tabbable)**
- **[`tabBehavior`](#tabBehavior)**
- **[`ignoreDefaultKeydown`](#ignoreDefaultKeydown)**

#### `axis`

```ts
type axis: 'vertical' | 'horizontal' | 'grid' | 'grid-linear' | 'both';
```

Default: `grid`

Focus will navigate vertically, horizontally or in both directions (grid).

#### `circular`

```ts
type circular: boolean;
```

Default: `false`

Focus will cycle to the first/last elements of the group without stopping.

#### `focusFirstElement`

```ts
type focusFirstElement: boolean;
```

Default: `false`

First focusable element in the group will be focused when the group is focused for the first time.

#### `memorizeCurrent`

```ts
type memorizeCurrent: boolean;
```

Default: `false`

Last focused element in the group will be remembered and focused (if still available) when tabbing from outside of the group.

#### `tabbable`

```ts
type tabbable: boolean;
```

Default: `true`

Allow tabbing within the arrow navigation group items.

#### `tabBehavior`

```ts
type tabBehavior: 'unlimited' | 'limited' | 'limited-trap-focus';
```

Default: `limited-trap-focus`

Behavior for the Tab key.

#### `ignoreDefaultKeydown`

```ts
type ignoreDefaultKeydown: TabsterTypes.FocusableProps['ignoreKeydown'];
```

Default: `{}`

Tabster can ignore default handling of keydown events.
