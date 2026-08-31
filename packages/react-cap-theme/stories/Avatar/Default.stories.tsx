import * as React from 'react';
import {
  Avatar,
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  makeStyles,
  tokens,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  row: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    alignItems: 'center',
  },
});

export const Default = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <Avatar name="John Doe" />
        <Avatar name="Jane Smith" color="brand" />
        <Avatar name="Bob Jones" color="colorful" />
        <Avatar size={16} name="Tiny" />
        <Avatar size={32} name="Small" />
        <Avatar size={64} name="Large" />
      </div>
      <AvatarGroup>
        <AvatarGroupItem name="Alice" />
        <AvatarGroupItem name="Bob" />
        <AvatarGroupItem name="Charlie" />
        <AvatarGroupPopover>
          <AvatarGroupItem name="Dave" />
          <AvatarGroupItem name="Eve" />
        </AvatarGroupPopover>
      </AvatarGroup>
    </div>
  );
};
