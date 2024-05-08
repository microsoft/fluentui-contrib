import * as React from 'react';
import { azureHighContrastTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { SelectExample } from '../../src/components/fluent/SelectExample';

export const Select = () => (
  <FluentProvider theme={azureHighContrastTheme}>
    <SelectExample />
  </FluentProvider>
);
