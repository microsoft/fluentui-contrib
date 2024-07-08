import * as React from 'react';
import { AzureLightTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { DialogExample } from '../../src/components/fluent/DialogExample';

export const Dialog = () => (
  <FluentProvider theme={AzureLightTheme}>
    <DialogExample />
  </FluentProvider>
);
