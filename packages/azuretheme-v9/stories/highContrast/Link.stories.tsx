import * as React from 'react';
import { azureHighContrastTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { LinkExample } from '../../src/components/fluent/LinkExample';

export const Link = () => (
  <FluentProvider theme={azureHighContrastTheme}>
    <LinkExample />
  </FluentProvider>
);
