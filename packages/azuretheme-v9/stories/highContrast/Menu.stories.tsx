import * as React from 'react';
import { azureHighContrastTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { MenuExample } from '../../src/components/fluent/MenuExample';

export const Menu = () => (
  <FluentProvider theme={azureHighContrastTheme}>
    <MenuExample />
  </FluentProvider>
);
