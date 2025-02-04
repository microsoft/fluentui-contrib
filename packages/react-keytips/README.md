# @fluentui-contrib/react-keytips

## Installation

```bash
npm install @fluentui-contrib/react-keytips
```

or

```bash
yarn add @fluentui-contrib/react-keytips
```

A Keytip is a small popup displayed near a UI component, indicating a key sequence that can be used to navigate to or trigger that component. Unlike keyboard shortcuts,
Keytips guide users through a sequence of keys to traverse hierarchical levels of the UI.

From a technical perspective, a Keytip is a wrapper around the Tooltip component.

To enable Keytips, include the Keytips component at the root level of your application. Use the `useKeytipRef`
hook to attach a Keytip to a specific target element.

Users can toggle Keytip mode using the `startSequence` (Option+Command on macOS, Alt+Windows (Meta) on Windows, by default).
To navigate back to the previous level of Keytips, the `returnSequence` (Esc by default) is used.

## Usage

```tsx
import * as React from 'react';
import { Keytips, useKeytipRef } from '@fluentui-contrib/react-keytips';
import { Button } from '@fluentui/react-components';

export const App = () => {
  const onExecute = (_, ({ targetElement })) => {
    targetElement.click();
  };

  const keytipRefA = useKeytipRef({ keySequences: ['a'], content: 'A', onExecute });
  const keytipRefB = useKeytipRef({ keySequences: ['b'], content: 'B', onExecute });
  const keytipRefC = useKeytipRef({ keySequences: ['c'], content: 'C', onExecute });

  return (
    <>
      {/* Keytips must be added once at the root level of the app */}
      <Keytips />
      <Button ref={keytipRefA}>Button A</Button>
      <Button ref={keytipRefB}>Button B</Button>
      <Button ref={keytipRefC}>Button C</Button>
    </>
  );
};
```

Follow up on the [Storybook](https://microsoft.github.io/fluentui-contrib/react-keytips) for examples on how to use the components provided by this package.
