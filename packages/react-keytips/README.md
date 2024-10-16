# @fluentui-contrib/react-keytips

## Installation

```bash
yarn add @fluentui-contrib/react-keytips
```

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

### Handling keytips with dynamic content

If a Keytip triggers dynamic content that includes its own keytips, you must add the `hasDynamicChildren` prop to the `useKeytipRef` for the relevant component. Additionally, the child keytips should include the parent's key sequence in their key sequences.

Here's an example using a Tab component:

```tsx
import * as React from 'react';
import { Keytips, useKeytipRef } from '@fluentui-contrib/react-keytips';

const TabExample = () => {
  const [selectedValue, setSelectedValue] = React.useState<TabValue>('1');

  const onTabSelect = (_: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

  const refFirstTab = useKeytipRef({
    keySequences: ['a'],
    content: 'A',
    hasDynamicChildren: true,
    onExecute: btnExecute,
  });

  const refSecondTab = useKeytipRef({
    keySequences: ['b'],
    content: 'B',
    hasDynamicChildren: true,
    onExecute: btnExecute,
  });

  const checkBoxRef = useKeytipRef<HTMLInputElement>({
    keySequences: ['a', '1'],
    content: '1',
    onExecute: btnExecute,
  });

  const btnRef = useKeytipRef({
    keySequences: ['b', '1'],
    content: 'B1',
    onExecute: btnExecute,
  });

  return (
    <>
      <Keytips {...props} />
      <TabList onTabSelect={onTabSelect}>
        <Tab id="1" ref={refFirstTab} value="1">
          First Tab
        </Tab>
        <Tab id="2" ref={refSecondTab} value="2">
          Second Tab
        </Tab>
      </TabList>
      <div className={classes.panels}>
        {selectedValue === '1' && (
          <div role="tabpanel" className={classes.row}>
            <Checkbox ref={checkBoxRef} label="Checkbox" />
          </div>
        )}
        {selectedValue === '2' && (
          <div role="tabpanel">
            <Button ref={btnRef}>Button 2</Button>
          </div>
        )}
      </div>
    </>
  );
};
```

Follow up on the [Storybook](https://microsoft.github.io/fluentui-contrib/react-keytips) for examples on how to use the components provided by this package.
