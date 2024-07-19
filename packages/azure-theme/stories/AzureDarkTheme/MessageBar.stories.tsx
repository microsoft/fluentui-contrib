import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { MessageBarExample } from '../../src/components/fluent/MessageBarExample';

export const MessageBar = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <MessageBarExample />
  </FluentProvider>
);
