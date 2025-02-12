import * as React from 'react';
import { AzureLightTheme, AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { Label, FluentProvider } from '@fluentui/react-components';

export const LabelExample = () => (
  <div style={{ display: 'flex', gap: '1rem', height: '90vh' }}>
    <FluentProvider
      theme={AzureLightTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20 }}
    >
      <Label>This is a label</Label>
    </FluentProvider>
    <FluentProvider
      theme={AzureDarkTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20, paddingLeft: 20 }}
    >
      <Label>This is a label</Label>
    </FluentProvider>
  </div>
);
