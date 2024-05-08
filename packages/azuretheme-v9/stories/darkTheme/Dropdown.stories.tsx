import * as React from 'react';
import { azureDarkTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { DropdownExample } from '../../src/components/fluent/DropdownExample';

export const Dropdown = () => (
  <FluentProvider theme={azureDarkTheme}>
    <DropdownExample />
  </FluentProvider>
);
