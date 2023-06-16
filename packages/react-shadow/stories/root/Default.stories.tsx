import { root } from '@fluentui-contrib/react-shadow';
import {
  Avatar,
  Button,
  Input,
  Label,
  makeStyles,
  mergeClasses,
  Radio,
  RadioGroup,
  shorthands,
  tokens,
  useId,
} from '@fluentui/react-components';
import * as React from 'react';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    ...shorthands.gap('5px'),
    ...shorthands.padding('5px'),
  },
  containerVertical: {
    flexDirection: 'column',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('10px'),
    ...shorthands.border('3px', 'solid', tokens.colorBrandBackground2),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
});

const ComponentSet: React.FC = () => {
  const classes = useClasses();
  const labelId = useId('label-');

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Avatar name="Ashley McCarthy" />
        <Button>Hello world!</Button>
      </div>

      <div className={classes.container}>
        <Input appearance="outline" placeholder="Type a message..." />
      </div>

      <div
        className={mergeClasses(classes.container, classes.containerVertical)}
      >
        <Label id={labelId}>Favorite Fruit</Label>
        <RadioGroup aria-labelledby={labelId}>
          <Radio value="apple" label="Apple" />
          <Radio value="pear" label="Pear" />
        </RadioGroup>
      </div>
    </div>
  );
};

export const Default = () => (
  <div
    style={{
      border: '3px dotted orange',
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}
  >
    <div style={{ border: '3px dotted grey', padding: 10, paddingTop: 0 }}>
      <h1>Light DOM</h1>
      <ComponentSet />
    </div>

    <root.div>
      <div style={{ border: '3px dotted grey', padding: 10, paddingTop: 0 }}>
        <h1>Shadow DOM</h1>
        <ComponentSet />
      </div>
    </root.div>
  </div>
);
