import type {
  ComponentProps,
  ComponentState,
  Slot,
} from '@fluentui/react-components';

export type ChatSlots = {
  root: Slot<'div'>;
};

/**
 * Chat Props
 */
export type ChatProps = ComponentProps<ChatSlots>;

/**
 * State used in rendering Chat
 */
export type ChatState = ComponentState<ChatSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from ChatProps.
// & Required<Pick<ChatProps, 'propName'>>
