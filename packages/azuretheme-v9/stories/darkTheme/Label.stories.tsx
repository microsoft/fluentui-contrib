import * as React from 'react';
import { azureDarkTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { LabelExample } from '../../src/components/fluent/LabelExample';

export const Label = () => (
  <FluentProvider theme={azureDarkTheme}>
    <LabelExample />
  </FluentProvider>
);
