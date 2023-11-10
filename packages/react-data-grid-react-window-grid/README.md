# react-data-grid-react-window-grid

A variant of the Fluent UI [DataGrid](https://react.fluentui.dev/?path=/docs/components-datagrid--default) that is
virtualized 2 dimentionally using [react-window](https://react-window.vercel.app/#/examples/grid/fixed-size).

## Building

Run `nx build react-data-grid-react-window-grid` to build the library.

## What is different from `react-data-grid-react-window`?
- `react-data-grid-react-window` support vertical virtualization using FixedSizeList in react-window
- `react-data-grid-react-window-grid` support 2 dimentional virtualization (including both horizontal and vertical) using FixedSizeGrid in react-window.
- `react-data-grid-react-window-grid` has a virtualized header as well using FixedSizeList in react-window

## `DataGridHeaderRow`
Be aware of `DataGridHeaderRow` is a new component that does not has in fluentui v9 `DataGrid`, it is for supporting header virtualization. And be aware of there is no need to use `DataGridRow` in `react-data-grid-react-window-grid`, as for virtualized grid is using cell to render instead of using row.

## Try it out

```sh
yarn add @fluentui-contrib/react-data-grid-react-window-grid

npm install @fluentui-contrib/react-data-grid-react-window-grid
```

For a full usage example please take a look at [The documentation sample](https://github.com/microsoft/fluentui-contrib/blob/main/packages/react-data-grid-react-window-grid/stories/DataGrid/VirtualizedDataGrid.stories.tsx).
