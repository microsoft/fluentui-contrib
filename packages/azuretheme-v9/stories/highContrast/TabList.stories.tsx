import * as React from 'react';
import { azureHighContrastTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { TabListExample } from '../../src/components/fluent/TabListExample';

export const TabList = () => (
  <FluentProvider theme={azureHighContrastTheme}>
    <TabListExample />
  </FluentProvider>
);
