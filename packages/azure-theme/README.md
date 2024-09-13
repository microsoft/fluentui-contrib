# @fluentui-contrib/azure-theme

Azure Theme package powered by Fluent UI and used in Microsoft Azure.

## Requirements

Node 20

## Try it out

```sh
yarn add @fluentui-contrib/azure-theme

npm install @fluentui-contrib/azure-theme
```

```tsx
import * as React from 'react';
import { Button } from '@fluentui/react-components';
import { FluentProvider, button } from '@fluentui/react-components';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';

function App() {
  const theme = AzureDarkTheme; // or AzureLightTheme

  return (
    <FluentProvider theme={theme}>
      <Button>Azure Themed Button</Button>
    </FluentProvider>
  );
}
```
