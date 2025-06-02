# @fluentui-contrib/react-keytips

## Installation

```bash
npm install @fluentui-contrib/react-keytips
```

or

```bash
yarn add @fluentui-contrib/react-keytips
```

A Keytip is a small popup displayed near a UI component, indicating a key sequence that can be used to navigate and trigger that component. Unlike keyboard shortcuts,
Keytips guide users through a sequence of keys to traverse hierarchical levels of the UI.

From a technical perspective, a Keytip is a wrapper around the Tooltip component.

To enable Keytips, include the `Keytips` component at the root level of your application. Use the `useKeytipRef`
hook to attach a Keytip to a specific target component.

Keytips appear when a user enters a specific set of keys. The entry sequence is `Alt-Meta` on Windows and `Option-Control` on macOS.
Users can change default hotkey via `startSequence` property.

`returnSequence` should be used to navigate back to the previous level of keytips (`Esc` by default). Pressing `Esc` (or different hotkey passed to `returnSequence`) will turn off keytips mode and dismiss them only if it is a root level keytip (one that does not have a parent and is shown first).

## Best practices

### Do

- Keytip sequences can be duplicated as long as none of their siblings have the same sequence.

### Don't

- Don't add more than 1 `Keytips` component per app.
- Don't attach keytips to components that will make your page scroll. Keytip mode automatically exits on scroll.

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
      {/* Keytips must be added once under the root-most FluentProvider of the app */}
      <Keytips />
      <Button ref={keytipRefA}>Button A</Button>
      <Button ref={keytipRefB}>Button B</Button>
      <Button ref={keytipRefC}>Button C</Button>
    </>
  );
};
```

## Manual dispatching of keytip events

In some cases, you may want to manually trigger keytip events. For example, you might need to programmatically enter or exit keytip mode based on action.
The [useEventService](https://github.com/microsoft/fluentui-contrib/blob/main/packages/react-keytips/src/hooks/useEventService.ts) hook provides access to dispatch
method, allowing you to send keytip events manually.

```tsx
import * as React from 'react';
import { Button } from '@fluentui/react-components';
import { useEventService, EVENTS } from '@fluentui-contrib/react-keytips';

export const App = () => {
  const { dispatch } = useEventService();

  const showKeytips = () => {
    dispatch(EVENTS.ENTER_KEYTIP_MODE);
  };

  return (
    <>
      <Button onClick={showKeytips}>Show Keytips</Button>
    </>
  );
};
```

```tsx

Follow up on the [Storybook](https://microsoft.github.io/fluentui-contrib/react-keytips) for examples on how to use the components provided by this package.
```
