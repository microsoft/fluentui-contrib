import * as React from 'react';
import { azureHighContrastTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { TeachingPopoverExample } from '../../src/components/fluent/TeachingPopover';

export const TeachingPopover = () => (
  <FluentProvider theme={azureHighContrastTheme}>
    <TeachingPopoverExample />
  </FluentProvider>
);
