# @fluentui-contrib/react-resize-handle

This library adds support for mouse and keyboard resizing of components/panels in your UI. It has proper a11y, works well with flex and grid layouts and is flexible enough to not require any drastic changes in your layout.

Use your mouse or touch to drag the element, or focus it and use the arrow keys to resize (step is 20px).

It also works with HTML elements directly without going through the React lifecycle. This and the fact that it relies on the CSS layouting engine makes sure it is very performant.

![Demo](public/demo.gif 'Demo')

## Install

```sh
yarn add @fluentui-contrib/react-resize-handle
# or
npm install @fluentui-contrib/react-resize-handle
```

## Usage

### Prerequisites

This library works using CSS variables in combination with CSS layouts. It is important to have a width/height set as a CSS variable for any dimension that the library will be changing.

Example of this would be a grid layout where the CSS variables are defined and used in the layout like so:

```ts
const useMainWrapperStyles = makeResetStyles({
  '--side-width': '120px',
  display: 'grid',
  width: '100%',
  height: '100%',
  gap: '16px',
  gridTemplate: `"nav sub-nav main side" minmax(0, 1fr)
  "nav sub-nav main-footer side" 10%
  / 120px  150px 1fr clamp(20px, var(--side-width), 40%)`,
});
```

### How it works

#### Overview

- the element has it's dimension defined using a CSS variable, that has a default value
- as the resize handle is moved, the new CSS variable value is set as inline style on the wrapper
- the inline style value takes priority, therefore visually resizing the target element
- use css `clamp` function to define min and max values for your element.

#### The hook

The library exports `useResizeHandle` - a React hook which takes a configuration object and returns a collection of refs to be attached to your elements.

It takes a configuration object with following required keys:

- `growDirection: "end" | "start" | "up" | "down"` - The direction in which the element is considered growing in size
- `variableName: string` - the name of the CSS variable that dictates the size

For the optional parameters please refer to the `UseResizeHandleParams` type.

### Return object keys

#### `handleRef`

This ref is attached to an element, which the user will be able to grab and resize, or focus and resize with keyboard. Under the hood we attach the keyboard and mouse listeners and calculate the new width value.

For best results, this element should be the child of the `elementRef` element.

#### `elementRef`

Attach this ref to the element you will be resizing. It's width is automatically measured in pixels as the element is rendered, which means that the default size (defined as the CSS variable) can be in any units - absolute, or relative.

This element's width is dictated by the CSS variable that was passed as the `variableName` option to the `useResizeHandle` hook.

#### `wrapperRef`

Attach this ref to the wrapping element. As the element is being resized, the new value for the specified CSS variable is added as the inline style of this element, overriding the default value.

#### `growDirection`

Returns the `growDirection` parameter, useful when rendering a handle, as its expected that the definition of the handle and the assignment of refs might not be used in the same component.

#### `setValue`

Programmatically set the value in pixels.

### Boundaries

Use CSS rules and functions like `clamp` to set boundries for your element's size (refer to the example above or the storybook).

You can also use `minValue` and `maxValue` options if your layout is strictly pixel based. This is discouraged, however, since the usage is very limited compared to CSS functions.

### Example

**For a complete example please see the [included storybook](./stories/Default.stories.tsx).**

Run the storybook in this repo with this command:

`yarn nx storybook react-resize-handle`
