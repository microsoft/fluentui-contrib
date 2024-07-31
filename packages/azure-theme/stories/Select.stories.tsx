import * as React from 'react';
import { AzureLightTheme, AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { Select, useId, FluentProvider } from '@fluentui/react-components';
import type { SelectProps } from '@fluentui/react-components';

export const SelectExample = (props: SelectProps) => {
  const selectId = useId();

  return (
    <div style={{ display: 'flex', gap: '1rem', height: '90vh' }}>
      <FluentProvider
        theme={AzureLightTheme}
        style={{ flex: 1, height: '100%', paddingTop: 20 }}
      >
        <label htmlFor={selectId}>Color</label>
        <Select id={selectId} {...props}>
          <option>Red</option>
          <option>Green</option>
          <option>Blue</option>
        </Select>
      </FluentProvider>
      <FluentProvider
        theme={AzureDarkTheme}
        style={{ flex: 1, height: '100%', paddingTop: 20, paddingLeft: 20 }}
      >
        <label htmlFor={selectId}>Color</label>
        <Select id={selectId} {...props}>
          <option>Red</option>
          <option>Green</option>
          <option>Blue</option>
        </Select>
      </FluentProvider>
    </div>
  );
};
