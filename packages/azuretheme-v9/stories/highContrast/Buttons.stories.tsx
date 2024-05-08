import * as React from 'react';
import { azureHighContrastTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { ButtonsExample } from '../../src/components/fluent/ButtonsExample';

export const Buttons = () => (
  <FluentProvider theme={azureHighContrastTheme}>
    <ButtonsExample />
  </FluentProvider>
);
