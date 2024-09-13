import * as React from 'react';
import { AzureLightTheme, AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { Divider, FluentProvider } from '@fluentui/react-components';

export const DividerExample = () => (
  <div style={{ display: 'flex', gap: '1rem', height: '90vh' }}>
    <FluentProvider
      theme={AzureLightTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20 }}
    >
      <div>
        <div>
          <Divider />
        </div>
        <div>
          <Divider>Text</Divider>
        </div>
      </div>
    </FluentProvider>
    <FluentProvider
      theme={AzureDarkTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20, paddingLeft: 20 }}
    >
      <div>
        <div>
          <Divider />
        </div>
        <div>
          <Divider>Text</Divider>
        </div>
      </div>
    </FluentProvider>
  </div>
);
