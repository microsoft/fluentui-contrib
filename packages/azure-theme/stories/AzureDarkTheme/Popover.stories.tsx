import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { PopoverExample } from '../../src/components/fluent/PopoverExample';

export const Popover = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <PopoverExample />
  </FluentProvider>
);
