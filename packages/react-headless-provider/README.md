# @fluentui/react-headless-provider

A package that provides a headless provider, a replacement in some cases for `FluentProvider` from `@fluentui/react-components`.

`HeadlessFluentProvider` does not render additional any DOM elements, only applies React Contexts needed for components from `@fluentui/react-components` to render properly.

Following features work:

- rendering into different documents i.e. `targetDocument` prop
- `customStyleHooks_unstable` & `overrides_unstable` props

Following features don't work:

- scoped theming, in this scenario theming should be configured globally or separately
- scoped "dir", in this scenario text direction should be configured globally or separately
- polyfill for `:focus-visible` (`useFocusVisible()` from `@fluentui/react-tabster`) should be initialized separately

Designed to be used with [`createCSSRuleFromTheme()`](https://github.com/microsoft/fluentui/pull/29052), see for context [microsoft/fluentui#21290](https://github.com/microsoft/fluentui/issues/21290).

## Install

```sh
yarn add @fluentui-contrib/react-headless-provider
# or
npm install @fluentui-contrib/react-headless-provider
```

## Usage

```tsx
import * as React from 'react';
import { HeadlessFluentProvider } from '@fluentui-contrib/react-headless-provider';

export function RootContainer(props) {
  const { targetDocument } = props;

  return <HeadlessFluentProvider targetDocument={targetDocument}>{/* children */}</HeadlessFluentProvider>;
}
```
