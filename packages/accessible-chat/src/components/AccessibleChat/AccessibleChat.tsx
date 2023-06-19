import * as React from 'react';

import {
  mergeClasses,
  Avatar,
  PresenceBadgeStatus,
} from '@fluentui/react-components';
import { Chat, ChatMessage, ChatMyMessage } from '@fluentui-contrib/react-chat';

import { useStyles } from './AccessibleChat.styles';

interface User {
  name: string;
  status: PresenceBadgeStatus;
}
export const AccessibleChat: React.FC = () => {
  const styles = useStyles();

  const user1: User = {name: 'Ashley McCarthy', status: 'available'};

  return (
  <div className={mergeClasses(styles.root)}>
<button> start here</button>
<h1>Accessible chat</h1>

<Chat>
      <ChatMessage avatar={<Avatar name={user1.name} badge={{ status: user1.status }} />}>Hello I am Ashley</ChatMessage>
      <ChatMyMessage>Nice to meet you!</ChatMyMessage>
      <ChatMessage avatar={<Avatar name={user1.name} badge={{ status: user1.status }} />}>
        <div role="none" tabIndex={0}>
        This is <a href="#">my homepage</a>. Some text goes here to demonstrate reading of longer runsof texts. Now follows <a href="#">another link</a> which is also a dummy link.
        </div>
      </ChatMessage>
    </Chat>

  </div>
  );
};
