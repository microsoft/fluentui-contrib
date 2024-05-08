import * as React from 'react';
import { azureDarkTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { TextExample } from '../../src/components/fluent/Text';

export const Text = () => (
  <FluentProvider theme={azureDarkTheme}>
    <TextExample />
  </FluentProvider>
);
