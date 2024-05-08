import * as React from 'react';
import { azureDarkTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { FieldExample } from '../../src/components/fluent/FieldExample';

export const Field = () => (
  <FluentProvider theme={azureDarkTheme}>
    <FieldExample />
  </FluentProvider>
);
