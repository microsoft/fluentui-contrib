import * as React from 'react';
import { azureHighContrastTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { TextExample } from '../../src/components/fluent/Text';

export const Text = () => (
  <FluentProvider theme={azureHighContrastTheme}>
    <TextExample />
  </FluentProvider>
);
