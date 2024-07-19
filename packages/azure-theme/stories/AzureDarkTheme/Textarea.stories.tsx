import * as React from 'react';
import { AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import { TextareaExample } from '../../src/components/fluent/Textarea';

export const Textarea = () => (
  <FluentProvider theme={AzureDarkTheme}>
    <TextareaExample />
  </FluentProvider>
);
