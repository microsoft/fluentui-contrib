import * as React from 'react';
import {
  makeStyles,
  shorthands,
  useId,
  Input,
  Label,
  Button,
  Body1,
  Text,
} from '@fluentui/react-components';
import { PersonRegular, MicRegular } from '@fluentui/react-icons';
import type { InputProps, ButtonProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field
    display: 'flex',
    flexDirection: 'column',
    // Use 2px gap below the label (per the design system)
    ...shorthands.gap('2px'),
    // Prevent the example from taking the full width of the page (optional)
    maxWidth: '400px',
  },
});

const MicButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      {...props}
      appearance="transparent"
      icon={<MicRegular />}
      size="small"
    />
  );
};

export const InputExample = (props: InputProps) => {
  const inputId = useId('input');
  const styles = useStyles();

  const beforeId = useId('content-before');
  const afterId = useId('content-after');
  const beforeAndAfterId = useId('content-before-and-after');
  const beforeLabelId = useId('before-label');
  const afterLabelId = useId('after-label');

  return (
    <div className={styles.root}>
      <Label htmlFor={inputId} size={props.size} disabled={props.disabled}>
        Sample input
      </Label>
      <Input id={inputId} {...props} />
      <div>
        <Label htmlFor={beforeId}>Full name</Label>
        <Input contentBefore={<PersonRegular />} id={beforeId} />
        <Body1>
          An input with a decorative icon in the <code>contentBefore</code>{' '}
          slot.
        </Body1>
      </div>

      <div>
        <Label htmlFor={afterId}>First name</Label>
        <Input
          contentAfter={<MicButton aria-label="Enter by voice" />}
          id={afterId}
        />
        <Body1>
          An input with a button in the <code>contentAfter</code> slot.
        </Body1>
      </div>

      <div>
        <Label htmlFor={beforeAndAfterId}>Amount to pay</Label>
        <Input
          contentBefore={
            <Text size={400} id={beforeLabelId}>
              $
            </Text>
          }
          contentAfter={
            <Text size={400} id={afterLabelId}>
              .00
            </Text>
          }
          aria-labelledby={`${beforeAndAfterId} ${beforeLabelId} ${afterLabelId}`}
          id={beforeAndAfterId}
        />

        <Body1>
          An input with a presentational value in the <code>contentBefore</code>{' '}
          slot and another presentational value in the <code>contentAfter</code>{' '}
          slot.
        </Body1>
      </div>
    </div>
  );
};
