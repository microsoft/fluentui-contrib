import * as React from 'react';
import { AzureLightTheme, AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import {
  Dropdown,
  makeStyles,
  Option,
  useId,
  FluentProvider,
} from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    // gap: '2px',
    maxWidth: '400px',
  },
});

export const DropDownExample = (props: Partial<DropdownProps>) => {
  const dropdownId = useId('dropdown-default');
  const options = [
    'Cat',
    'Caterpillar',
    'Corgi',
    'Chupacabra',
    'Dog',
    'Ferret',
    'Fish',
    'Fox',
    'Hamster',
    'Snake',
  ];
  const styles = useStyles();
  return (
    <div style={{ display: 'flex', gap: '1rem', height: '90vh' }}>
      <FluentProvider
        theme={AzureLightTheme}
        style={{ flex: 1, height: '100%', paddingTop: 20 }}
      >
        <div className={styles.root}>
          <label id={dropdownId}>Best pet</label>
          <Dropdown
            aria-labelledby={dropdownId}
            placeholder="Select an animal"
            {...props}
          >
            {options.map((option) => (
              <Option key={option} disabled={option === 'Ferret'}>
                {option}
              </Option>
            ))}
          </Dropdown>
        </div>
      </FluentProvider>
      <FluentProvider
        theme={AzureDarkTheme}
        style={{ flex: 1, height: '100%', paddingTop: 20, paddingLeft: 20 }}
      >
        <div className={styles.root}>
          <label id={dropdownId}>Best pet</label>
          <Dropdown
            aria-labelledby={dropdownId}
            placeholder="Select an animal"
            {...props}
          >
            {options.map((option) => (
              <Option key={option} disabled={option === 'Ferret'}>
                {option}
              </Option>
            ))}
          </Dropdown>
        </div>
      </FluentProvider>
    </div>
  );
};
