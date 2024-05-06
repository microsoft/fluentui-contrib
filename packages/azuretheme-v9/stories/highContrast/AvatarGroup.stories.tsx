import * as React from 'react';
import { azureHighContrastTheme } from '../../src/tokens/brandRamp';
import { FluentProvider } from '@fluentui/react-components';
import { AvatarGroupExample } from '../../src/components/fluent/AvatarGroupExample';

export const AvatarGroup = () => (
  <FluentProvider theme={azureHighContrastTheme}>
    <AvatarGroupExample />
  </FluentProvider>
);
