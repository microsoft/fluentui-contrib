import * as React from 'react';
import { azureLightTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { AvatarExample } from '../../src/components/fluent/AvatarExample';

export const Avatar = () => (
  <FluentProvider theme={azureLightTheme}>
    <AvatarExample />
  </FluentProvider>
);
