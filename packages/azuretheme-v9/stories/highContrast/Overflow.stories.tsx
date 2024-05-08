import * as React from 'react';
import { azureHighContrastTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { OverflowExample } from '../../src/components/fluent/OverflowExample';

export const Overflow = () => (
  <FluentProvider theme={azureHighContrastTheme}>
    <OverflowExample />
  </FluentProvider>
);
