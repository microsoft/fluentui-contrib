import * as React from 'react';
import { azureHighContrastTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { RadioGroupExample } from '../../src/components/fluent/RadioGroupExample';

export const RadioGroup = () => (
  <FluentProvider theme={azureHighContrastTheme}>
    <RadioGroupExample />
  </FluentProvider>
);
