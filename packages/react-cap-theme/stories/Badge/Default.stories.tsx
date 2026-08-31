import * as React from 'react';
import { Badge, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  row: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

export const Default = () => {
  const styles = useStyles();
  return (
    <div className={styles.row}>
      <Badge>1</Badge>
      <Badge appearance="filled">Filled</Badge>
      <Badge appearance="ghost">Ghost</Badge>
      <Badge appearance="outline">Outline</Badge>
      <Badge appearance="tint">Tint</Badge>
      <Badge color="brand">Brand</Badge>
      <Badge color="danger">Danger</Badge>
      <Badge color="important">Important</Badge>
      <Badge color="informative">Informative</Badge>
      <Badge color="severe">Severe</Badge>
      <Badge color="subtle">Subtle</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="warning">Warning</Badge>
    </div>
  );
};
