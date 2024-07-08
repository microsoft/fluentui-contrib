import * as React from 'react';
import { AzureLightTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { TooltipExample } from '../../src/components/fluent/Tooltip';

export const Tooltip = () => (
  <FluentProvider theme={AzureLightTheme}>
    <TooltipExample />
  </FluentProvider>
);
