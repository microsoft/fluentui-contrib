# @fluentui-contrib/react-gamepad-navigation

This package provides gamepad navigation support for Fluent UI Components.
Any gaming controller implementing the [Gamepad API](https://w3c.github.io/gamepad/) is supported. Major brand controllers such as Xbox, PlayStation, Nintendo, 8bit, etc. are supported.

This hook leverages the [useArrowNavigationGroup](https://react.fluentui.dev/?path=/docs/utilities-focus-management-usearrownavigationgroup--docs) and [useFocusableGroup](https://react.fluentui.dev/?path=/docs/utilities-focus-management-usefocusablegroup--docs) implementation and API.

The following mappings are included:

- Dpad -> Arrow navigation (up/down/left/right).
- Left Stick -> Arrow navigation (up/down/left/right).
- A -> 'Enter' key event
- B -> 'Escape' key event
- X -> not supported
- Y -> not supported
- Triggers - not supported
- bumpers - not supported
- Right stick - not supported

In addition to the gamepad navigation, arrow key navigation is available by calling this hook, so there is no need to call useArrowNavigationGroup separately.

## Installation

```bash
yarn add @fluentui-contrib/react-gamepad-navigation
```

## Usage

```tsx
import * as React from 'react';
import { useGamepadNavigationGroup } from '@fluentui-contrib/react-gamepad-navigation';

export const SampleApp = () => {
  const gamepadNavigationAttributes = useGamepadNavigationGroup();

  return <div {...gamepadNavigationAttributes}></div>;
};
```
