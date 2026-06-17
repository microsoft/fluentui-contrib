import { ComponentProps, Slot } from '@fluentui/react-components';
import { EventData, EventHandler } from '@fluentui/react-utilities';
import * as React from 'react';

/**
 * Slots available on a TreeGridRow.
 */
export type TreeGridRowSlots = {
  root: Slot<'div'>;
};

/**
 * Event payload emitted when a TreeGridRow changes its open state.
 */
export type TreeGridRowOnOpenChangeData = { open: boolean } & (
  | EventData<'click', React.MouseEvent>
  | EventData<'keydown', React.KeyboardEvent>
);

/**
 * Props for a TreeGridRow.
 */
export type TreeGridRowProps = ComponentProps<TreeGridRowSlots> & {
  /**
   * Explicit row level. Values below `1` are normalized to `1`.
   */
  level?: number;
  /**
   * Controlled open state for rows that render a subtree.
   */
  open?: boolean;
  /**
   * Uncontrolled initial open state for rows that render a subtree.
   */
  defaultOpen?: boolean;
  /**
   * Called when a row requests an open-state change.
   */
  onOpenChange?: EventHandler<TreeGridRowOnOpenChangeData>;
  /**
   * Nested rows rendered beneath this row.
   */
  subtree?: Slot<{ children?: React.ReactNode }> | true;
};
