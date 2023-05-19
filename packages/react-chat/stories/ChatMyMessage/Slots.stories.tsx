import * as React from 'react';
import {
  makeStyles,
  Button,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import {
  EmojiSmileSlightRegular,
  Question20Regular,
} from '@fluentui/react-icons';
import { Chat, ChatMyMessage } from '@fluentui-contrib/react-chat';

const useReactionStyles = makeStyles({
  button: {
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    ...shorthands.borderRadius('13px'),
    backgroundColor: tokens.colorNeutralBackground1,
    fontSize: tokens.fontSizeBase200, // "12px"
    lineHeight: tokens.lineHeightBase200, // "16px"
    fontWeight: tokens.fontWeightRegular,

    paddingLeft: 0,
    paddingRight: 0,

    minWidth: '41px',
    height: '26px',
  },
  buttonIcon: {
    marginRight: '2px',
  },
});
const Reactions = () => {
  const styles = useReactionStyles();
  return (
    <Button
      icon={{
        className: styles.buttonIcon,
        children: <EmojiSmileSlightRegular fontSize={16} />,
      }}
      appearance="subtle"
      className={styles.button}
      aria-label="Smile"
    >
      1
    </Button>
  );
};

export const Slots = () => {
  return (
    <Chat>
      <ChatMyMessage body="Message body" />
      <ChatMyMessage details="Edited">Message with details</ChatMyMessage>
      <ChatMyMessage author="Ashley McCarthy">
        Message with author
      </ChatMyMessage>
      <ChatMyMessage
        decorationLabel="important!"
        decorationIcon={<Question20Regular />}
      >
        Message with decoration icon and label
      </ChatMyMessage>
      <ChatMyMessage timestamp="8:00 AM">Message with timestamp</ChatMyMessage>
      <ChatMyMessage reactions={<Reactions />}>
        Message with reactions
      </ChatMyMessage>
    </Chat>
  );
};

Slots.parameters = {
  component: ChatMyMessage,
};
