import * as React from 'react';
import { azureDarkTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { OverflowExample } from '../../src/components/fluent/OverflowExample';

export const Overflow = () => (
  <FluentProvider theme={azureDarkTheme}>
    <OverflowExample />
  </FluentProvider>
);
