import {
  makeStyles,
  mergeClasses,
  shorthands,
} from '@fluentui/react-components';
import type { ChatSlots, ChatState } from './Chat.types';
import type { SlotClassNames } from '@fluentui/react-components';

export const chatClassNames: SlotClassNames<ChatSlots> = {
  root: 'fui-Chat',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    listStyleType: 'none',
    width: '100%',
    ...shorthands.overflow('hidden'),
  },
  comfy: {
    paddingLeft: `16px`,
    maxWidth: `1056px`,
    ...shorthands.margin('auto'),
  },
});

/**
 * Apply styling to the Chat slots based on the state
 */
export const useChatStyles_unstable = (state: ChatState): ChatState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    chatClassNames.root,
    styles.base,
    styles.comfy,
    state.root.className
  );

  return state;
};
