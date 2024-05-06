import * as React from 'react';
import { azureHighContrastTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { AvatarExample } from '../../src/components/fluent/AvatarExample';

export const Avatar = () => (
  <FluentProvider theme={azureHighContrastTheme}>
    <AvatarExample />
  </FluentProvider>
);
