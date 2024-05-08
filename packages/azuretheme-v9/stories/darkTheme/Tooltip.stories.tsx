import * as React from 'react';
import { azureDarkTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { TooltipExample } from '../../src/components/fluent/Tooltip';

export const Tooltip = () => (
  <FluentProvider theme={azureDarkTheme}>
    <TooltipExample />
  </FluentProvider>
);
