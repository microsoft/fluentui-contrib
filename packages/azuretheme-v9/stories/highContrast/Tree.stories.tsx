import * as React from 'react';
import { azureHighContrastTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { TreeExample } from '../../src/components/fluent/Tree';

export const Tree = () => (
  <FluentProvider theme={azureHighContrastTheme}>
    <TreeExample />
  </FluentProvider>
);
