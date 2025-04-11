import * as React from 'react';
import {
  Avatar as AvatarFluent,
  type AvatarProps,
} from '@fluentui/react-components';
import { useStyles } from './mocks.styles';

export const Avatar = ({
  avatarUrl,
  users,
  v9ClassName,
}: {
  v9ClassName?: string;
  avatarUrl: string;
  size?: AvatarProps['size'];
  users: {
    id: string;
    displayName: string;
    avatarUrl: string;
  }[];
}) => {
  const user = users[0];
  const styles = useStyles();

  return (
    <div className={styles.avatarWrapper}>
      <AvatarFluent
        className={v9ClassName}
        name={user?.displayName}
        size={20}
        image={{
          src: avatarUrl ?? user?.avatarUrl,
        }}
      />
    </div>
  );
};
