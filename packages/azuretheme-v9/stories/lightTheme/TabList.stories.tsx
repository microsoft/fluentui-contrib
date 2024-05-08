import * as React from 'react';
import { azureLightTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { TabListExample } from '../../src/components/fluent/TabListExample';

export const TabList = () => (
  <FluentProvider theme={azureLightTheme}>
    <TabListExample />
  </FluentProvider>
);
