import {
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import type { SlotClassNames } from '@fluentui/react-components';
import type { ChatMessageSlots, ChatMessageState } from './ChatMessage.types';
import {
  bodyBaseStyles,
  reactionsBaseStyles,
  isOnlyReadableByScreenReaderStyles,
  highlightAnimation,
} from '../styles/shared.mixins';
import { useDecorationClasses } from '../styles/shared.styles';

export const chatMessageClassNames: SlotClassNames<ChatMessageSlots> = {
  root: 'fui-ChatMessage',
  author: 'fui-ChatMessage__author',
  avatar: 'fui-ChatMessage__avatar',
  body: 'fui-ChatMessage__body',
  decorationIcon: 'fui-ChatMessage__decorationIcon',
  decorationLabel: 'fui-ChatMessage__decorationLabel',
  details: 'fui-ChatMessage__details',
  reactions: 'fui-ChatMessage__reactions',
  timestamp: 'fui-ChatMessage__timestamp',
};

/**
 * Styles for the root slot
 */
export const useChatMessageClasses = makeStyles({
  container: {
    display: 'flex',
    columnGap: '8px',
    paddingTop: '16px',
  },
  attachedContainer: {
    paddingTop: '2px',
  },
  avatarLessContainer: {
    marginLeft: '40px',
  },
  avatar: {
    minWidth: '32px',
  },
});

export const useChatMessageBodyClasses = makeStyles({
  base: {
    ...bodyBaseStyles,

    ...shorthands.borderRadius('4px'),
    ...shorthands.padding('8px', '16px', '16px', '16px'),
    maxWidth: 'calc(100% - 100px)',

    backgroundColor: tokens.colorNeutralBackground3,
  },
  hasReactions: {
    marginBottom: '12px',
  },
  hasDecorationIcon: {
    ...shorthands.borderLeft('3px', 'solid', tokens.colorPaletteRedForeground3),
  },

  nameLineWrapper: {
    display: 'flex',
    columnGap: '12px',

    fontSize: '12px',
    lineHeight: '16px',
    color: tokens.colorNeutralForeground3,

    alignItems: 'center',
  },

  details: {
    display: 'flex',
    columnGap: '6px',
    alignItems: 'center',
  },

  decorationLabel: {
    fontWeight: 700,
    fontSize: '12px',
    lineHeight: '16px',
    textTransform: 'uppercase',
  },

  reactions: {
    ...reactionsBaseStyles,
    paddingRight: '20px',
  },

  decorationIcon: {
    color: 'white',
    backgroundColor: tokens.colorPaletteRedForeground3,
    height: '24px',
    width: '24px',
    ...shorthands.borderRadius('50%'),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    fontSize: '20px',

    transform: 'translateX(50%)',
    position: 'absolute',
    top: '4px',
    right: '0px',
  },

  screenReaderContainer: isOnlyReadableByScreenReaderStyles,

  animation: highlightAnimation,
});

/**
 * Apply styling to the ChatMessage slots based on the state
 */
export const useChatMessageStyles_unstable = (state: ChatMessageState) => {
  const classes = useChatMessageClasses();
  state.root.className = mergeClasses(
    chatMessageClassNames.root,
    classes.container,
    state.attached && state.attached !== 'top' && classes.attachedContainer,
    !state.avatar && classes.avatarLessContainer,
    state.root.className
  );

  if (state.avatar) {
    state.avatar.className = mergeClasses(
      chatMessageClassNames.avatar,
      classes.avatar,
      state.avatar.className
    );
  }

  const bodyClasses = useChatMessageBodyClasses();
  if (state.body) {
    state.body.className = mergeClasses(
      chatMessageClassNames.body,
      bodyClasses.base,
      state.reactions && bodyClasses.hasReactions,
      state.decorationIcon && bodyClasses.hasDecorationIcon,
      state.showAnimation && bodyClasses.animation,
      state.body.className
    );
  }

  if (state.author) {
    state.author.className = mergeClasses(
      chatMessageClassNames.author,
      state.attached &&
        state.attached !== 'top' &&
        bodyClasses.screenReaderContainer,
      state.author.className
    );
  }

  if (state.timestamp) {
    state.timestamp.className = mergeClasses(
      chatMessageClassNames.timestamp,
      state.attached &&
        state.attached !== 'top' &&
        bodyClasses.screenReaderContainer,
      state.timestamp.className
    );
  }

  if (state.details) {
    state.details.className = mergeClasses(
      chatMessageClassNames.details,
      bodyClasses.details,
      state.details.className
    );
  }

  const decorationClasses = useDecorationClasses();

  if (state.decorationLabel) {
    state.decorationLabel.className = mergeClasses(
      chatMessageClassNames.decorationLabel,
      bodyClasses.decorationLabel,
      state.decoration && decorationClasses.default,
      state.decoration === 'mention' && decorationClasses.mention,
      state.decorationLabel.className
    );
  }

  if (state.decorationIcon) {
    state.decorationIcon.className = mergeClasses(
      chatMessageClassNames.decorationIcon,
      bodyClasses.decorationIcon,
      state.decorationIcon.className
    );
  }

  if (state.reactions) {
    state.reactions.className = mergeClasses(
      chatMessageClassNames.reactions,
      bodyClasses.reactions,
      state.reactions.className
    );
  }

  state.nameLineClassName = bodyClasses.nameLineWrapper;

  return state;
};
