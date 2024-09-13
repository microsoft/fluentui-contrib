import * as React from 'react';
import { AzureLightTheme, AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider, Text } from '@fluentui/react-components';

export const TextExample = () => (
  <div style={{ display: 'flex', gap: '1rem', height: '90vh' }}>
    <FluentProvider
      theme={AzureLightTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20 }}
    >
      <Text>This is an example of the Text component's usage.</Text>
    </FluentProvider>
    <FluentProvider
      theme={AzureDarkTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20, paddingLeft: 20 }}
    >
      <Text>This is an example of the Text component's usage.</Text>
    </FluentProvider>
  </div>
);
