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
- use `relative` setting to always start measuring from "0px" and use the css value in the `calc()` css function. This is useful for dynamic layouts where you want to enable resizing, but also responsive panels.

#### The hook

The library exports `useResizeHandle` - a React hook which takes a configuration object and returns a collection of refs to be attached to your elements.

It takes a configuration object with following required keys:

- `growDirection: "end" | "start" | "up" | "down"` - The direction in which the element is considered growing in size
- `variableName: string` - the name of the CSS variable that dictates the size
- `relative: boolean` - enables the _relative_ mode.

For the optional parameters please refer to the `UseResizeHandleParams` type.

### Relative vs default mode

In the default mode (`relative: false`), the `elementRef` DOM element is measured upon receiving the ref and this absolute measurement (width or height based on the `growDirection`) is then used as the CSS property name, thats updated with resize.

This allows for basic support of dynamic layouts, where the panel or slot can have 20% width for example, defined by the default CSS variable value and layout.

The downside of this is that as soon as the element is rendered and measured, its dimensions are now absolute, in `px`, because this library is plugging in the value.

This might be expected behavior (side navigation is now fixed, the content is `1fr` and takes the remaining space), but sometimes you want your layout to still be dynamic but resizable, e.g. you want your side navigation always be between 10% to 20% of the viewport, start at 15% and only allow changes within this range by the user, while maintaining the responsiveness.

This would be achieved by the setting `relative: true`.

#### Relative mode

The way the relative mode works is that it _does not measure the element at all_, but rather only measures the _change_ of how much pixels the user changed the default position by.

This allows for building dynamic layouts, which can be defined by the result of this CSS variable added to the default layout size in the `calc` function, like this:

`clamp(10%, calc(15% + var(${NAV_SIZE_CSS_VAR})), 20%)`

This example makes sure that the nav panel starts at 15% of the parent, can be resized by using the hook (result of the `calc` function), but its limits are 10% of the parent and 20% of the parent (the `clamp` function).

When the handle is brought `10px` to the right, the value of the `NAV_SIZE_CSS_VAR` is now `10px`, which results in the final definition of this slot's size as `clamp(10%, calc(15% + 10px), 20%)`. This makes sure the slot is still dynamic, responsive, but takes the _relative_ adjustments in pixels into consideration.

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

**For a complete example please see the [included storybook](https://microsoft.github.io/fluentui-contrib/react-resize-handle).**

### Contributing

To run the storybook for this package locally, run `yarn nx storybook react-resize-handle`.

The default example story is located in `stories/Default.stories.tsx`.
