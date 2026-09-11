import * as React from 'react';
import {
  makeStyles,
  tokens,
  useId,
  Label,
  SpinButton,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',
  },

  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalXXS,
    marginTop: tokens.spacingVerticalMNudge,
    padding: tokens.spacingHorizontalMNudge,
  },
  fieldDark: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalXXS,
    marginTop: tokens.spacingVerticalMNudge,
    padding: tokens.spacingHorizontalMNudge,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
  },
});

export const Disabled = () => {
  const styles = useStyles();

  const outlineId = useId('outline-disabled-id');
  const underlineId = useId('underline-disabled-id');
  const filledLighterId = useId('filledLighter-disabled-id');
  const filledDarkerId = useId('filledDarker-disabled-id');

  return (
    <div className={styles.base}>
      <div className={styles.field}>
        <Label htmlFor={outlineId}>Outline Disabled (default)</Label>
        <SpinButton disabled id={outlineId} />
      </div>

      <div className={styles.field}>
        <Label htmlFor={underlineId}>Underline Disabled</Label>
        <SpinButton disabled appearance="underline" id={underlineId} />
      </div>

      <div className={styles.fieldDark}>
        <Label htmlFor={filledLighterId}>Filled Lighter Disabled</Label>
        <SpinButton disabled appearance="filled-lighter" id={filledLighterId} />
      </div>

      <div className={styles.fieldDark}>
        <Label htmlFor={filledDarkerId}>Filled Darker Disabled</Label>
        <SpinButton disabled appearance="filled-darker" id={filledDarkerId} />
      </div>
    </div>
  );
};
