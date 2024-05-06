import * as React from 'react';
import { azureDarkTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { PopoverExample } from '../../src/components/fluent/PopoverExample';

export const Popover = () => (
  <FluentProvider theme={azureDarkTheme}>
    <PopoverExample />
  </FluentProvider>
);
