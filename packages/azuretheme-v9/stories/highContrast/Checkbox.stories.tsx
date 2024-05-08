import * as React from 'react';
import { azureHighContrastTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { CheckboxExample } from '../../src/components/fluent/CheckboxExample';

export const Checkbox = () => (
  <FluentProvider theme={azureHighContrastTheme}>
    <CheckboxExample />
  </FluentProvider>
);
