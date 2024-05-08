import * as React from 'react';
import { azureHighContrastTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { DividerExample } from '../../src/components/fluent/DividerExample';

export const Divider = () => (
  <FluentProvider theme={azureHighContrastTheme}>
    <DividerExample />
  </FluentProvider>
);
