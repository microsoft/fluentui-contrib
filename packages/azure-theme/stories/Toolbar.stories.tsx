import * as React from 'react';
import { AzureLightTheme, AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import {
  FontIncrease24Regular,
  FontDecrease24Regular,
  TextFont24Regular,
} from '@fluentui/react-icons';
import {
  Toolbar,
  ToolbarButton,
  FluentProvider,
} from '@fluentui/react-components';

export const ToolbarExample = () => (
  <div style={{ display: 'flex', gap: '1rem', height: '90vh' }}>
    <FluentProvider
      theme={AzureLightTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20 }}
    >
      <Toolbar
        aria-label="Small"
        size="small"
        style={{
          border: '2px solid black',
          borderRadius: '8px',
        }}
      >
        <ToolbarButton
          aria-label="Increase Font Size"
          appearance="primary"
          icon={<FontIncrease24Regular />}
        />
        <ToolbarButton
          aria-label="Decrease Font Size"
          icon={<FontDecrease24Regular />}
        />
        <ToolbarButton
          aria-label="Reset Font Size"
          icon={<TextFont24Regular />}
        />
      </Toolbar>
    </FluentProvider>
    <FluentProvider
      theme={AzureDarkTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20, paddingLeft: 20 }}
    >
      <Toolbar
        aria-label="Small"
        size="small"
        style={{
          border: '2px solid black',
          borderRadius: '8px',
        }}
      >
        <ToolbarButton
          aria-label="Increase Font Size"
          appearance="primary"
          icon={<FontIncrease24Regular />}
        />
        <ToolbarButton
          aria-label="Decrease Font Size"
          icon={<FontDecrease24Regular />}
        />
        <ToolbarButton
          aria-label="Reset Font Size"
          icon={<TextFont24Regular />}
        />
      </Toolbar>
    </FluentProvider>
  </div>
);
