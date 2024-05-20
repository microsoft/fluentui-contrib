# @fluentui-contrib/azuretheme-v9

Azure Theme tokens include light and dark. High contrast is WIP.

## Try it out

```sh
yarn add @fluentui-contrib/azuretheme-v9

npm install @fluentui-contrib/azuretheme-v9
```

```tsx
import * as React from 'react';
import { FluentProvider, webLightTheme, Button } from '@fluentui/react-components';
import { lightTheme, darkTheme } from '@fluentui-contrib/azuretheme-v9';

export const MyProject = () => {
  return (
    <FluentProvider theme={lightTheme}>
      <Button appearance="primary">Hello Fluent UI React</Button>
    </FluentProvider>
  );
};
```

## Building

Run `nx build azuretheme-v9` to build the library.

## Running unit tests

Run `nx test azuretheme-v9` to execute the unit tests via [Jest](https://jestjs.io).
