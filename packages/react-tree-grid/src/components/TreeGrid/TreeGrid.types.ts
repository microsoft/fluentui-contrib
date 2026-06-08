import { ComponentProps, Slot } from '@fluentui/react-components';

export type TreeGridSlots = {
  root: Slot<'div'>;
};

export type TreeGridTabsterMoveFocusEventDetail = {
  owner: HTMLElement;
  relatedEvent: Event;
};

export type TreeGridOnTabsterMoveFocus = (
  event: CustomEvent<TreeGridTabsterMoveFocusEventDetail>
) => void;

export type TreeGridProps = ComponentProps<TreeGridSlots> & {
  onTabsterMoveFocus?: TreeGridOnTabsterMoveFocus;
};
