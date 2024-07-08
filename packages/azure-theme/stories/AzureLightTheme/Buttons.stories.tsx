import * as React from 'react';
import { AzureLightTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { ButtonsExample } from '../../src/components/fluent/ButtonsExample';

export const Buttons = () => (
  <FluentProvider theme={AzureLightTheme}>
    <ButtonsExample />
  </FluentProvider>
);
