import * as React from 'react';
import { AzureLightTheme, AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { Field, Textarea, FluentProvider } from '@fluentui/react-components';

export const TextAreaExample = () => (
  <div style={{ display: 'flex', gap: '1rem', height: '90vh' }}>
    <FluentProvider
      theme={AzureLightTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20 }}
    >
      <Field label="Textarea with placeholder">
        <Textarea placeholder="type here..." />
      </Field>
    </FluentProvider>
    <FluentProvider
      theme={AzureDarkTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20, paddingLeft: 20 }}
    >
      <Field label="Textarea with placeholder">
        <Textarea placeholder="type here..." />
      </Field>
    </FluentProvider>
  </div>
);
