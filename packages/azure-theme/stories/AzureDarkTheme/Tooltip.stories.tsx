import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { TooltipExample } from '../../src/components/fluent/Tooltip';

export const Tooltip = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <TooltipExample />
  </FluentProvider>
);
