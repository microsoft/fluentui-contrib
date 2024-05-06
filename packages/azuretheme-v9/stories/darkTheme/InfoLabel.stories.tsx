import * as React from 'react';
import { azureDarkTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { InfoLabelExample } from '../../src/components/fluent/InfoLabelExample';

export const InfoLabel = () => (
  <FluentProvider theme={azureDarkTheme}>
    <InfoLabelExample />
  </FluentProvider>
);
