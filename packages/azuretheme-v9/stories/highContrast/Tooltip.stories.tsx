import * as React from 'react';
import { azureHighContrastTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { TooltipExample } from '../../src/components/fluent/Tooltip';

export const Tooltip = () => (
  <FluentProvider theme={azureHighContrastTheme}>
    <TooltipExample />
  </FluentProvider>
);
