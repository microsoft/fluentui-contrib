import * as React from 'react';
import {
  Field,
  Radio,
  RadioGroup,
  FluentProvider,
  RadioGroupProps,
} from '@fluentui/react-components';
import { AzureLightTheme, AzureDarkTheme } from '@fluentui-contrib/azure-theme';

export const RadioGroupExample = (props: Partial<RadioGroupProps>) => (
  <div style={{ display: 'flex', gap: '1rem', height: '90vh' }}>
    <FluentProvider
      theme={AzureLightTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20 }}
    >
      <Field label="Favorite Fruit">
        <RadioGroup {...props}>
          <Radio value="apple" label="Apple" />
          <Radio value="pear" label="Pear" />
          <Radio value="banana" label="Banana" />
          <Radio value="orange" label="Orange" />
        </RadioGroup>
      </Field>
    </FluentProvider>
    <FluentProvider
      theme={AzureDarkTheme}
      style={{ flex: 1, height: '100%', paddingTop: 20, paddingLeft: 20 }}
    >
      <Field label="Favorite Fruit">
        <RadioGroup {...props}>
          <Radio value="apple" label="Apple" />
          <Radio value="pear" label="Pear" />
          <Radio value="banana" label="Banana" />
          <Radio value="orange" label="Orange" />
        </RadioGroup>
      </Field>
    </FluentProvider>
  </div>
);
