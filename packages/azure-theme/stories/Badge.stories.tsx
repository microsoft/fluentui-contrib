import * as React from 'react';
import { AzureLightTheme, AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { Badge, FluentProvider } from '@fluentui/react-components';

export const BadgeExample = () => {
  return (
    <div style={{ display: 'flex', gap: '1rem', height: '90vh' }}>
      <FluentProvider
        theme={AzureLightTheme}
        style={{ flex: 1, height: '100%', paddingTop: 20 }}
      >
        <Badge shape="square" />
        <Badge shape="rounded" />
        <Badge shape="circular" />
      </FluentProvider>
      <FluentProvider
        theme={AzureDarkTheme}
        style={{ flex: 1, height: '100%', paddingTop: 20, paddingLeft: 20 }}
      >
        <Badge shape="square" />
        <Badge shape="rounded" />
        <Badge shape="circular" />
      </FluentProvider>
    </div>
  );
};
