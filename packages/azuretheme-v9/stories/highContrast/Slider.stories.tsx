import * as React from 'react';
import { azureHighContrastTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { SliderExample } from '../../src/components/fluent/SliderExample';

export const Slider = () => (
  <FluentProvider theme={azureHighContrastTheme}>
    <SliderExample />
  </FluentProvider>
);
