import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { AvatarGroupExample } from '../../src/components/fluent/AvatarGroupExample';

export const AvatarGroup = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <AvatarGroupExample />
  </FluentProvider>
);
