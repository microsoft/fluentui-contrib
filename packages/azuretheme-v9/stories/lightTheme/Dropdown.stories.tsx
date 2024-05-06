import * as React from 'react';
import { azureLightTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { DropdownExample } from '../../src/components/fluent/DropdownExample';

export const Dropdown = () => (
  <FluentProvider theme={azureLightTheme}>
    <DropdownExample />
  </FluentProvider>
);
