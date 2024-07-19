import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { AvatarExample } from '../../src/components/fluent/AvatarExample';

export const Avatar = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <AvatarExample />
  </FluentProvider>
);
