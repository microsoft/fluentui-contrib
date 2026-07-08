import * as React from 'react';
import {
  makeStyles,
  tokens,
  useId,
  Label,
  SpinButton,
  Input,
  Text,
  Body1,
  Button,
  ButtonProps,
  mergeClasses,
} from '@fluentui/react-components';
import {
  PersonRegular,
  MicRegular,
  CalendarMonthFilled,
  CalendarMonthRegular,
  bundleIcon,
} from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

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
  customInput: {
    '& .fui-Input': {
      border: 'none',
      padding: 0,
      minHeight: '16px',
    },
  },
});

export const ContentBeforeAfter = () => {
  const styles = useStyles();

  const afterId = useId('content-after');

  return (
    <div className={styles.base}>
      <div className={styles.field}>
        <Label htmlFor={afterId}>First name</Label>
        <SpinButton
          className={styles.customInput}
          input={{
            children: ((
              Comp: 'input',
              props: React.InputHTMLAttributes<HTMLInputElement>
            ) => (
              <Input
                contentBefore={<CalendarMonth />}
                id={afterId}
                className={mergeClasses(
                  (props as any).className,
                  styles.customInput
                )}
                {...(props as any)}
              />
            )) as unknown as undefined,
          }}
        />
        <Body1>
          An input with a button in the <code>contentAfter</code> slot.
        </Body1>
      </div>
    </div>
  );
};
