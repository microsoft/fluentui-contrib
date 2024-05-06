import * as React from 'react';
import { azureDarkTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { SearchBoxExample } from '../../src/components/fluent/SearchBoxExample';

export const SearchBox = () => (
  <FluentProvider theme={azureDarkTheme}>
    <SearchBoxExample />
  </FluentProvider>
);
