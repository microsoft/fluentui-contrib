import * as React from 'react';
import { azureLightTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { SearchBoxExample } from '../../src/components/fluent/SearchBoxExample';

export const SearchBox = () => (
  <FluentProvider theme={azureLightTheme}>
    <SearchBoxExample />
  </FluentProvider>
);
