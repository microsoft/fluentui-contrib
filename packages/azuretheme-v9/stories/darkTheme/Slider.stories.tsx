import * as React from 'react';
import { azureDarkTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { SliderExample } from '../../src/components/fluent/SliderExample';

export const Slider = () => (
  <FluentProvider theme={azureDarkTheme}>
    <SliderExample />
  </FluentProvider>
);
