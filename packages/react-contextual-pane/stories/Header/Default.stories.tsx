import * as React from 'react';
import { makeStyles, tokens, ToolbarButton } from '@fluentui/react-components';
import { MoreHorizontalRegular, WindowRegular } from '@fluentui/react-icons';
import { Header } from '@fluentui-contrib/react-contextual-pane';
import { Avatar } from '../Mock/Avatar';

const useStyles = makeStyles({
  pane: {
    width: '320px',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    height: '200px',
  },
  paneFluid: {
    width: '100%',
    resize: 'horizontal',
    overflow: 'auto',
  },
});

export type DefaultProps = {
  brandIcon?: boolean;
  hasArrowBack?: boolean;
  caption: string;
  primaryAction?: boolean;
  secondaryAction?: boolean;
};

export const Default = (props: DefaultProps) => {
  const styles = useStyles();

  return (
    <div className={styles.pane}>
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

Default.args = {
  brandIcon: true,
  hasArrowBack: true,
  caption: 'Header title',
  primaryAction: true,
  secondaryAction: true,
};

Default.parameters = {
  novaEnvironment: {
    resolvers: {},
  },
  docs: {
    source: {
      type: 'code',
    },
    description: {
      story: `Contextual pane header at the top of the pane, with a title, brand and
        actions. The title is always required and here we have all the slots
        filled.
- The dismiss button on the right will always be present.
- Arrow back button will be present if hasArrowBack is true.
- Brand icon will be present if brandIcon is passed as a prop.
- Actions will be present if actions is passed, with a maximum of 2 actions.`,
    },
  },
};
