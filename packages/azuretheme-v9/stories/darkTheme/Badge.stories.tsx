import * as React from 'react';
import { azureDarkTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { BadgeExample } from '../../src/components/fluent/BadgeExample';

export const Badge = () => (
  <FluentProvider theme={azureDarkTheme}>
    <BadgeExample />
  </FluentProvider>
);
