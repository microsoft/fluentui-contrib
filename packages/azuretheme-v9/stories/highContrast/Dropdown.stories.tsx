import * as React from 'react';
import { azureHighContrastTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { DropdownExample } from '../../src/components/fluent/DropdownExample';

export const Dropdown = () => (
  <FluentProvider theme={azureHighContrastTheme}>
    <DropdownExample />
  </FluentProvider>
);
