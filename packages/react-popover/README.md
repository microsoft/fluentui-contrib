# @fluentui-contrib/react-popover

**EXPERIMENTAL**: A custom Popover component built on modern web platform APIs.

This is an experimental Popover component that uses an almost identical API to the FluentUI React v9 Popover, but is built on top of modern browser APIs instead of third-party libraries:

- **[Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)** for popover behavior
- **[CSS Anchor Positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning)** for positioning (instead of floating-ui)
- **[Focusgroup API](https://open-ui.org/components/focusgroup.explainer/)** for keyboard navigation (instead of react-tabster for tab roving)

## ⚠️ Important: Browser Support

This component relies on cutting-edge web platform features and has **limited browser support** compared to the standard FluentUI React v9 Popover. Only use this component when you don't have strict browser compatibility requirements.

**Required browser features:**

- Popover API
- CSS Anchor Positioning
- Focusgroup API (for keyboard navigation)

Check [Can I Use](https://caniuse.com/) for current browser support of these features.

## Installation

```sh
npm install @fluentui-contrib/react-popover
```

or

```sh
yarn add @fluentui-contrib/react-popover
```

## Usage

The API is designed to be nearly identical to FluentUI React v9 Popover, making it easy to switch between implementations:

```tsx
// import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-popover'; <- Imports from the core package
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui-contrib/react-popover'; // <- Imports from the experimental package
import { Button } from '@fluentui/react-components';

export const Example = () => {
  return (
    <Popover positioning="after">
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverSurface>
        <div>Popover content</div>
      </PopoverSurface>
    </Popover>
  );
};
```

## When to Use This Component

**Use this component when:**

- You're building for modern browsers with support for the required APIs
- You want to leverage native browser capabilities for better performance
- You're experimenting with next-generation web platform features

**Use the standard FluentUI React v9 Popover when:**

- You need broad browser compatibility
- You have strict browser support requirements
- You're building production applications with diverse user bases

## Building

Run `nx build react-popover` to build the library.

## Running unit tests

Run `nx test react-popover` to execute the unit tests via [Jest](https://jestjs.io).

## Running Storybook

Run `nx storybook react-popover` to start the Storybook development server and view component examples.
