import * as React from 'react';

import { NovaEventingInterceptor, NovaEventingProvider } from '@nova/react';
import { EventWrapper } from '@nova/types';
import { makeStyles, tokens, ToolbarButton } from '@fluentui/react-components';
import {
  MoreHorizontalRegular,
  EmojiSmileSlightRegular,
} from '@fluentui/react-icons';
import { Header } from '@fluentui-contrib/react-contextual-pane';
import { action } from '@storybook/addon-actions';
import { assertEvents } from '../../src/events';
import { Avatar } from '../Mock/Avatar';
import { GraphQLSchema, buildSchema } from 'graphql';

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

export const Default = (props) => {
  const interceptor = React.useCallback((e: EventWrapper) => {
    if (assertEvents.isArrowBack(e.event)) {
      console.log('ArrowBack Clicked');
      action('ArrowBack Clicked');
    }

    return Promise.resolve(e);
  }, []);

  const styles = useStyles();

  return (
    <div className={styles.pane}>
      <NovaEventingInterceptor
        eventMap={{
          arrowBack: interceptor,
          close: interceptor,
        }}
      >
        <Header
          caption={props.caption}
          brandIcon={
            props.brandIcon ? <EmojiSmileSlightRegular fontSize={20} /> : null
          }
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
      </NovaEventingInterceptor>
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
