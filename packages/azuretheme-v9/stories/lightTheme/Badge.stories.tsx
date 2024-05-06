import * as React from 'react';
import { azureLightTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { BadgeExample } from '../../src/components/fluent/BadgeExample';

export const Badge = () => (
  <FluentProvider theme={azureLightTheme}>
    <BadgeExample />
  </FluentProvider>
);
