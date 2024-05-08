import * as React from 'react';
import { azureLightTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { SelectExample } from '../../src/components/fluent/SelectExample';

export const Select = () => (
  <FluentProvider theme={azureLightTheme}>
    <SelectExample />
  </FluentProvider>
);
