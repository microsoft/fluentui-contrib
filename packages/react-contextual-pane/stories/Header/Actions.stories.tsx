import * as React from 'react';
import { ToolbarButton } from '@fluentui/react-components';
import { MoreHorizontalRegular } from '@fluentui/react-icons';
import { Header } from '@fluentui-contrib/react-contextual-pane';
import { Avatar } from '../Mock/Avatar';
import { useStyles } from './styles';

export const Actions = () => {
  const styles = useStyles();

  return (
    <div className={styles.pane}>
      <Header
        primaryAction={
          <ToolbarButton
            key="more-menu"
            appearance="transparent"
            icon={<MoreHorizontalRegular />}
          />
        }
        secondaryAction={
          <Avatar
            avatarUrl="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg"
            key="avatar"
            users={[
              {
                id: 'avatar-Id-0',
                displayName: 'Katri Athokas',
                avatarUrl:
                  'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg',
              },
            ]}
            aria-hidden={true}
          />
        }
        caption="This is a title"
      />
    </div>
  );
};

Actions.parameters = {
  docs: {
    source: {
      type: 'code',
    },
    description: {
      story: `If the pane requires additional actions in the pane header, then the
        actions slot will be present`,
    },
  },
};
