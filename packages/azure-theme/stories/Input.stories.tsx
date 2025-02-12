import * as React from 'react';
import type { ArgTypes } from '@storybook/react';
import {
  makeStyles,
  useId,
  Input,
  Label,
  FluentProvider,
} from '@fluentui/react-components';
import type { InputProps } from '@fluentui/react-components';
import { AzureLightTheme, AzureDarkTheme } from '@fluentui-contrib/azure-theme';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
  },
});

export const InputExample = (props: InputProps) => {
  const inputId = useId('input');
  const styles = useStyles();

  return (
    <div style={{ display: 'flex', gap: '1rem', height: '90vh' }}>
      <FluentProvider
        theme={AzureLightTheme}
        style={{ flex: 1, height: '100%', paddingTop: 20 }}
      >
        <div className={styles.root}>
          <Label htmlFor={inputId} size={props.size} disabled={props.disabled}>
            Sample input
          </Label>
          <Input id={inputId} {...props} />
        </div>
      </FluentProvider>
      <FluentProvider
        theme={AzureDarkTheme}
        style={{ flex: 1, height: '100%', paddingTop: 20, paddingLeft: 20 }}
      >
        <div className={styles.root}>
          <Label htmlFor={inputId} size={props.size} disabled={props.disabled}>
            Sample input
          </Label>
          <Input id={inputId} {...props} />
        </div>
      </FluentProvider>
    </div>
  );
};

const argTypes: ArgTypes = {
  // Add these native props to the props table and controls pane
  placeholder: {
    description:
      'Placeholder text for the input. If using this instead of a label (which is ' +
      'not recommended), be sure to provide an `aria-label` for screen reader users.',
    type: { name: 'string', required: false }, // for inferring control type
    table: { type: { summary: 'string' } }, // for showing type in prop table
  },
  disabled: {
    description: 'Whether the input is disabled',
    type: { name: 'boolean', required: false },
    table: { type: { summary: 'boolean' } },
  },
  // Hide these from the props table and controls pane
  children: { table: { disable: true } },
  as: { table: { disable: true } },
};
