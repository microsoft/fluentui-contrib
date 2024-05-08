import * as React from 'react';
import { azureLightTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { RadioGroupExample } from '../../src/components/fluent/RadioGroupExample';

export const RadioGroup = () => (
  <FluentProvider theme={azureLightTheme}>
    <RadioGroupExample />
  </FluentProvider>
);
