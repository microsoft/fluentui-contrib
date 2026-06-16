import { ComponentProps, Slot } from '@fluentui/react-components';

/**
 * Slots available on the TreeGrid root component.
 */
export type TreeGridSlots = {
  root: Slot<'div'>;
};

/**
 * Details emitted when TreeGrid intercepts a Tabster move-focus request.
 */
export type TreeGridTabsterMoveFocusEventDetail = {
  owner: HTMLElement;
  relatedEvent: KeyboardEvent;
};

/**
 * Props for configuring TreeGrid keyboard navigation and root rendering.
 */
export type TreeGridProps = ComponentProps<TreeGridSlots> & {
  /**
   * Allows callers to intercept Tabster-driven row-to-row focus movement.
   */
  onTabsterMoveFocus?(
    event: CustomEvent<TreeGridTabsterMoveFocusEventDetail>
  ): void;
};
