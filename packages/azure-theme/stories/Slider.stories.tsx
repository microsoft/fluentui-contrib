import * as React from 'react';
import { AzureLightTheme, AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import {
  useId,
  Label,
  Slider,
  FluentProvider,
} from '@fluentui/react-components';

export const SliderExample = () => {
  const id = useId();

  return (
    <div style={{ display: 'flex', gap: '1rem', height: '90vh' }}>
      <FluentProvider
        theme={AzureLightTheme}
        style={{ flex: 1, height: '100%', paddingTop: 20 }}
      >
        <Label htmlFor={id}>Basic Example</Label>
        <Slider defaultValue={20} id={id} />
      </FluentProvider>
      <FluentProvider
        theme={AzureDarkTheme}
        style={{ flex: 1, height: '100%', paddingTop: 20, paddingLeft: 20 }}
      >
        <Label htmlFor={id}>Basic Example</Label>
        <Slider defaultValue={20} id={id} />
      </FluentProvider>
    </div>
  );
};
