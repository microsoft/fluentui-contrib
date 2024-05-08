import * as React from 'react';
import { azureDarkTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { TabListExample } from '../../src/components/fluent/TabListExample';

export const TabList = () => (
  <FluentProvider theme={azureDarkTheme}>
    <TabListExample />
  </FluentProvider>
);
