import * as React from 'react';
import { AzureLightTheme, AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { Button, Tooltip, FluentProvider } from '@fluentui/react-components';

export const ToolTipExample = () => (
  <div style={{ display: 'flex', gap: '1rem', height: '90vh' }}>
    <FluentProvider
      theme={AzureLightTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20 }}
    >
      <Tooltip
        content="This is the description of the button"
        relationship="description"
      >
        <Button>Button</Button>
      </Tooltip>
    </FluentProvider>
    <FluentProvider
      theme={AzureDarkTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20, paddingLeft: 20 }}
    >
      <Tooltip
        content="This is the description of the button"
        relationship="description"
      >
        <Button>Button</Button>
      </Tooltip>
    </FluentProvider>
  </div>
);
