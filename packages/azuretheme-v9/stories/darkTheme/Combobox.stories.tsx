import * as React from 'react';
import { azureDarkTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { ComboboxExample } from '../../src/components/fluent/ComboboxExample';

export const Combobox = () => (
  <FluentProvider theme={azureDarkTheme}>
    <ComboboxExample />
  </FluentProvider>
);
