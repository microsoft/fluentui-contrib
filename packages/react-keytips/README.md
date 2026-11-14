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

### Plain modifier activation (opt-in)

Use `activationModifier` to enter keytip mode on a plain modifier press. This is
platform-neutral; applications decide which platforms should opt in.
Plain modifier activation is **off by default**: omit `activationModifier` to
retain existing activation behavior. `enabled` controls whether the layer can be
entered; it does not opt into plain modifier activation.

```tsx
<Keytips activationModifier="alt" startSequence={['alt+.', 'alt+meta']} enabled={allowKeytips} content="Alt" />
```

- Entry happens immediately on `keydown`, regardless of `invokeEvent` or `startDelay`.
- The first modifier press and release are consumed. Repeats do not toggle mode.
- A consecutive second press exits without canceling either event, allowing browser handling.
- Any intervening non-modifier input removes that pass-through eligibility. A later
  activation while keytips remain active exits and is consumed.
- Release the modifier before typing keytips. Input while it is held dismisses
  keytips and passes through without executing a keytip.
- `startSequence` accepts a string or an array of legacy aliases. Continuing the
  first gesture with a configured alias keeps keytips visible.
- Sequential keytip input is handled at window bubble phase, after application
  shortcuts. App-handled or unmatched input dismisses keytips without claiming it.
- Right Alt/AltGraph and composition do not activate keytips. Window blur resets
  the gesture and dismisses keytips.
- `enabled={false}` prevents keyboard and programmatic entry and dismisses active
  keytips. Defaults remain unchanged when these props are omitted.
- The hidden entry instruction defaults to the activation modifier. Target
  `aria-keyshortcuts` are not generated in this mode, since ARIA cannot represent
  modifier entry followed by a sequence of keys.

Page-level event tests cannot verify browser chrome ownership. Validate first
press suppression and second-press browser handling in an external browser
(for example, Microsoft Edge) before enabling this behavior for users.

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
The [useKeytipsManager](https://github.com/microsoft/fluentui-contrib/blob/main/packages/react-keytips/src/hooks/useKeytipsManager.ts) hook provides access to dispatch
method, allowing you to send keytip events manually.

```tsx
import * as React from 'react';
import { Button } from '@fluentui/react-components';
import { useKeytipsManager } from '@fluentui-contrib/react-keytips';

export const App = () => {
  const { enterKeytipMode } = useKeytipsManager();

  return (
    <>
      <Button onClick={enterKeytipMode}>Show Keytips</Button>
    </>
  );
};
```

```tsx

Follow up on the [Storybook](https://microsoft.github.io/fluentui-contrib/react-keytips) for examples on how to use the components provided by this package.
```
