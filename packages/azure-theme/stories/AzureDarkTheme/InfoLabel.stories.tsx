import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { InfoLabelExample } from '../../src/components/fluent/InfoLabelExample';

export const InfoLabel = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <InfoLabelExample />
  </FluentProvider>
);
