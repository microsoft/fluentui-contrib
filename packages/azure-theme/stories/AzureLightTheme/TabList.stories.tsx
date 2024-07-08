import * as React from 'react';
import { AzureLightTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { TabListExample } from '../../src/components/fluent/TabListExample';

export const TabList = () => (
  <FluentProvider theme={AzureLightTheme}>
    <TabListExample />
  </FluentProvider>
);
