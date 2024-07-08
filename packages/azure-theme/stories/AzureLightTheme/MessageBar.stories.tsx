import * as React from 'react';
import { AzureLightTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { MessageBarExample } from '../../src/components/fluent/MessageBarExample';

export const MessageBar = () => (
  <FluentProvider theme={AzureLightTheme}>
    <MessageBarExample />
  </FluentProvider>
);
