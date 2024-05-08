import * as React from 'react';
import { azureDarkTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { TreeExample } from '../../src/components/fluent/Tree';

export const Tree = () => (
  <FluentProvider theme={azureDarkTheme}>
    <TreeExample />
  </FluentProvider>
);
