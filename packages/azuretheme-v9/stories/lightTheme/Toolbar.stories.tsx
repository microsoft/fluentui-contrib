import * as React from 'react';
import { azureLightTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { ToolbarExample } from '../../src/components/fluent/Toolbar';

export const Toolbar = () => (
  <FluentProvider theme={azureLightTheme}>
    <ToolbarExample />
  </FluentProvider>
);
