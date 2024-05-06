import * as React from 'react';
import { azureLightTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { OverflowExample } from '../../src/components/fluent/OverflowExample';

export const Overflow = () => (
  <FluentProvider theme={azureLightTheme}>
    <OverflowExample />
  </FluentProvider>
);
