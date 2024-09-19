import * as React from 'react';
import { Switch } from '@fluentui/react-components';

export const SwitchExample = () => {
  const [checked, setChecked] = React.useState(true);
  const onChange = React.useCallback(
    (ev: any) => {
      setChecked(ev.currentTarget.checked);
    },
    [setChecked]
  );

  return (
    <>
      <Switch
        checked={checked}
        onChange={onChange}
        label={checked ? 'Checked' : 'Unchecked'}
      />
      <Switch disabled label="Unchecked and disabled" />
      <Switch checked disabled label="Checked and disabled" />
      <Switch required label="Required" />
    </>
  );
};
