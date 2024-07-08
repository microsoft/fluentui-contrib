import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { SliderExample } from '../../src/components/fluent/SliderExample';

export const Slider = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <SliderExample />
  </FluentProvider>
);
