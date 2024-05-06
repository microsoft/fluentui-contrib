import * as React from 'react';
import { azureLightTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { DrawerExample } from '../../src/components/fluent/DrawerExample';

export const Drawer = () => (
  <FluentProvider theme={azureLightTheme}>
    <DrawerExample />
  </FluentProvider>
);
