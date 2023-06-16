# @fluentui-contrib/react-shadow

This package provides a React component that renders its children inside a shadow DOM.

## Installation

```bash
yarn add @fluentui-contrib/react-shadow
```

## Usage

```tsx
import * as React from 'react';
import { root } from '@fluentui-contrib/react-shadow';

export const App = () => (
  <root.div>
    <div>Shadow DOM</div>
  </root.div>
);
```
