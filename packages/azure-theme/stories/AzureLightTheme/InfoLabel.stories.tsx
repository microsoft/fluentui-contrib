import * as React from 'react';
import { AzureLightTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { InfoLabelExample } from '../../src/components/fluent/InfoLabelExample';

export const InfoLabel = () => (
  <FluentProvider theme={AzureLightTheme}>
    <InfoLabelExample />
  </FluentProvider>
);
