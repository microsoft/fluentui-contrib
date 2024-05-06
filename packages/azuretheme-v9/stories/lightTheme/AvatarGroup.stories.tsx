import * as React from 'react';
import { azureLightTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { AvatarGroupExample } from '../../src/components/fluent/AvatarGroupExample';

export const AvatarGroup = () => (
  <FluentProvider theme={azureLightTheme}>
    <AvatarGroupExample />
  </FluentProvider>
);
