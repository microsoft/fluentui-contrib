import * as React from 'react';
import { azureHighContrastTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { DrawerExample } from '../../src/components/fluent/DrawerExample';

export const Drawer = () => (
  <FluentProvider theme={azureHighContrastTheme}>
    <DrawerExample />
  </FluentProvider>
);
