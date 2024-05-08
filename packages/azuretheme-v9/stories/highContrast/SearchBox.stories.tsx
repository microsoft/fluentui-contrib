import * as React from 'react';
import { azureHighContrastTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { SearchBoxExample } from '../../src/components/fluent/SearchBoxExample';

export const SearchBox = () => (
  <FluentProvider theme={azureHighContrastTheme}>
    <SearchBoxExample />
  </FluentProvider>
);
