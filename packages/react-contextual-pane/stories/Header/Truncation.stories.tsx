import * as React from 'react';
import { ToolbarButton, mergeClasses } from '@fluentui/react-components';
import { MoreHorizontalRegular, WindowRegular } from '@fluentui/react-icons';
import { Header } from '@fluentui-contrib/react-contextual-pane';
import { useStyles } from './styles';
import { Avatar } from '../Mock/Avatar';

export type TruncationProps = {
  brandIcon?: boolean;
  hasArrowBack?: boolean;
  caption: string;
  primaryAction?: boolean;
  secondaryAction?: boolean;
};

export const Truncation = (props: TruncationProps) => {
  const styles = useStyles();

  return (
    <div className={mergeClasses(styles.pane, styles.paneFluid)}>
      <Header
        caption={props.caption}
        brandIcon={props.brandIcon ? <WindowRegular fontSize={20} /> : null}
        hasArrowBack={props.hasArrowBack}
        primaryAction={
          props.primaryAction && (
            <ToolbarButton
              appearance="transparent"
              key="more-menu"
              icon={<MoreHorizontalRegular />}
            />
          )
        }
        secondaryAction={
          props.secondaryAction && (
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
          )
        }
      />
    </div>
  );
};

Truncation.args = {
  brandIcon: true,
  hasArrowBack: true,
  caption: 'Header Title',
  primaryAction: true,
  secondaryAction: true,
};
