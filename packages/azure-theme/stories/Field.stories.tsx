import * as React from 'react';
import { AzureLightTheme, AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import {
  Field,
  Input,
  FluentProvider,
  FieldProps,
} from '@fluentui/react-components';

export const FieldExample = (props: Partial<FieldProps>) => (
  <div style={{ display: 'flex', gap: '1rem', height: '90vh' }}>
    <FluentProvider
      theme={AzureLightTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20 }}
    >
      <Field
        label="Example field"
        validationState="success"
        validationMessage="This is a success message."
        {...props}
      >
        <Input />
      </Field>
    </FluentProvider>
    <FluentProvider
      theme={AzureDarkTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20, paddingLeft: 20 }}
    >
      <Field
        label="Example field"
        validationState="success"
        validationMessage="This is a success message."
        {...props}
      >
        <Input />
      </Field>
    </FluentProvider>
  </div>
);
