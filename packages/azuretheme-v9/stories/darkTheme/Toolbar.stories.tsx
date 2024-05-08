import * as React from 'react';
import { azureDarkTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { ToolbarExample } from '../../src/components/fluent/Toolbar';

export const Toolbar = () => (
  <FluentProvider theme={azureDarkTheme}>
    <ToolbarExample />
  </FluentProvider>
);
