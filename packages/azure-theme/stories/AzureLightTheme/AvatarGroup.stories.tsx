import * as React from 'react';
import { AzureLightTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { AvatarGroupExample } from '../../src/components/fluent/AvatarGroupExample';

export const AvatarGroup = () => (
  <FluentProvider theme={AzureLightTheme}>
    <AvatarGroupExample />
  </FluentProvider>
);
