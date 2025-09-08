import * as React from 'react';
import { Link, FluentProvider } from '@fluentui/react-components';
import { AzureLightTheme, AzureDarkTheme } from '@fluentui-contrib/azure-theme';

export const LinkExample = () => (
  <div style={{ display: 'flex', gap: '1rem', height: '90vh' }}>
    <FluentProvider
      theme={AzureLightTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20 }}
    >
      <Link href="https://www.bing.com">This is a link</Link>
    </FluentProvider>
    <FluentProvider
      theme={AzureDarkTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20, paddingLeft: 20 }}
    >
      <Link href="https://www.bing.com">This is a link</Link>
    </FluentProvider>
  </div>
);
