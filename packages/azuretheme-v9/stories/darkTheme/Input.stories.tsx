import * as React from 'react';
import { azureDarkTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { InputExample } from '../../src/components/fluent/InputExample';

export const Input = () => (
  <FluentProvider theme={azureDarkTheme}>
    <InputExample />
  </FluentProvider>
);
