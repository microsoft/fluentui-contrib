import * as React from 'react';
import { AzureLightTheme, AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { Checkbox, FluentProvider } from '@fluentui/react-components';

export const CheckBoxExample = () => {
  const [option1, setOption1] = React.useState(false);
  const [option2, setOption2] = React.useState(true);
  const [option3, setOption3] = React.useState(false);

  return (
    <div style={{ display: 'flex', gap: '1rem', height: '90vh' }}>
      <FluentProvider
        theme={AzureLightTheme}
        style={{ flex: 1, height: '100%', paddingTop: 20 }}
      >
        <Checkbox
          checked={
            option1 && option2 && option3
              ? true
              : !(option1 || option2 || option3)
              ? false
              : 'mixed'
          }
          onChange={(_ev, data) => {
            setOption1(!!data.checked);
            setOption2(!!data.checked);
            setOption3(!!data.checked);
          }}
          label="All options"
        />

        <Checkbox
          checked={option1}
          onChange={() => setOption1((checked) => !checked)}
          label="Option 1"
        />
        <Checkbox
          checked={option2}
          onChange={() => setOption2((checked) => !checked)}
          label="Option 2"
        />
        <Checkbox
          checked={option3}
          onChange={() => setOption3((checked) => !checked)}
          label="Option 3"
        />
      </FluentProvider>
      <FluentProvider
        theme={AzureDarkTheme}
        style={{ flex: 1, height: '100%', paddingTop: 20, paddingLeft: 20 }}
      >
        <Checkbox
          checked={
            option1 && option2 && option3
              ? true
              : !(option1 || option2 || option3)
              ? false
              : 'mixed'
          }
          onChange={(_ev, data) => {
            setOption1(!!data.checked);
            setOption2(!!data.checked);
            setOption3(!!data.checked);
          }}
          label="All options"
        />

        <Checkbox
          checked={option1}
          onChange={() => setOption1((checked) => !checked)}
          label="Option 1"
        />
        <Checkbox
          checked={option2}
          onChange={() => setOption2((checked) => !checked)}
          label="Option 2"
        />
        <Checkbox
          checked={option3}
          onChange={() => setOption3((checked) => !checked)}
          label="Option 3"
        />
      </FluentProvider>
    </div>
  );
};
