import * as React from 'react';
import { azureHighContrastTheme } from '../../src/tokens/brandRamp';
import { FluentProvider, Button } from '@fluentui/react-components';

export const Default = () => (
  <FluentProvider theme={azureHighContrastTheme}>
    <div>High contrast theme </div>
    <Button>Button</Button>
  </FluentProvider>
);
