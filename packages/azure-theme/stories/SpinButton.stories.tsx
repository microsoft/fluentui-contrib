import * as React from 'react';
import { AzureLightTheme, AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { Label, SpinButton } from '@fluentui/react-components';
import { FluentProvider } from '@fluentui/react-components';

export const SpinButtonExample = () => (
  <div style={{ display: 'flex', gap: '1rem', height: '90vh' }}>
    <FluentProvider
      theme={AzureLightTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20 }}
    >
      <Label>Default SpinButton</Label>
      <SpinButton defaultValue={10} min={0} max={20} />
    </FluentProvider>
    <FluentProvider
      theme={AzureDarkTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20, paddingLeft: 20 }}
    >
      <Label>Default SpinButton</Label>
      <SpinButton defaultValue={10} min={0} max={20} />
    </FluentProvider>
  </div>
);
