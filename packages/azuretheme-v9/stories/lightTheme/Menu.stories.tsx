import * as React from 'react';
import { azureLightTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { MenuExample } from '../../src/components/fluent/MenuExample';

export const Menu = () => (
  <FluentProvider theme={azureLightTheme}>
    <MenuExample />
  </FluentProvider>
);
