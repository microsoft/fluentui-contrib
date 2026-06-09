import { ComponentProps, Slot } from '@fluentui/react-components';

export type TreeGridSlots = {
  root: Slot<'div'>;
};

export type TreeGridTabsterMoveFocusEventDetail = {
  owner: HTMLElement;
  relatedEvent: KeyboardEvent;
};

export type TreeGridProps = ComponentProps<TreeGridSlots> & {
  onTabsterMoveFocus?(
    event: CustomEvent<TreeGridTabsterMoveFocusEventDetail>
  ): void;
};
