import * as React from 'react';
import { azureLightTheme, V9PrimaryButton } from '../../src/tokens/brandRamp';
import { FluentProvider, Button } from '@fluentui/react-components';
//move later
import { Checkbox } from '@fluentui/react-components';

export const Default = () => (
  <FluentProvider theme={azureLightTheme}>
    <div>Light theme </div>
    <V9PrimaryButton />
    <Checkbox />
  </FluentProvider>
);
