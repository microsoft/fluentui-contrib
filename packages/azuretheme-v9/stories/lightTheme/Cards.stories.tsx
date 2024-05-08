import * as React from 'react';
import { azureLightTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { CardExample } from '../../src/components/fluent/CardExample';

export const Card = () => (
  <FluentProvider theme={azureLightTheme}>
    <CardExample />
  </FluentProvider>
);
