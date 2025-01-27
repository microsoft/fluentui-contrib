# @fluentui-contrib/react-gamepad-navigation

This package provides gamepad navigation support for Fluent UI Components.
Any gaming controller implementing the [Gamepad API](https://w3c.github.io/gamepad/) is supported. Major brand controllers such as Xbox, PlayStation, Nintendo, 8bit, etc. are supported.

This hook leverages the [useArrowNavigationGroup](https://react.fluentui.dev/?path=/docs/utilities-focus-management-usearrownavigationgroup--docs) and [useFocusableGroup](https://react.fluentui.dev/?path=/docs/utilities-focus-management-usefocusablegroup--docs) implementation and API.

In addition to gamepad navigation, arrow key navigation is available by calling this hook, so there is no need to call useArrowNavigationGroup separately.

## Installation

```bash
yarn add @fluentui-contrib/react-gamepad-navigation
```

## Mappings

| Controller Input | Mapped Behavier                       |
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
| Select     | ⚠️ Partial Support |
| SpinButton | ⛔ Not Supported   |
| Switch     | ✅ Supported       |
| Textarea   | ✅ Supported       |

## Usage

### To import Hook:

```js
import { useGamepadNavigationGroup } from '@fluentui-contrib/react-gamepad-navigation';
```

### Examples

```tsx
export const SampleApp = () => {
  // attributes for both: Gamepad and Arrow key navigation
  const gamepadNavigationAttributes = useGamepadNavigationGroup();

  return <div {...gamepadNavigationAttributes}></div>;
};
```

## Options

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
