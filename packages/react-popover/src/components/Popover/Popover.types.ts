import * as React from 'react';
import type {
  JSXElement,
  PositioningShorthandValue,
} from '@fluentui/react-components';

/**
 * Popover Props
 */
export type PopoverProps = {
  /**
   * A popover can appear styled with brand or inverted.
   * When not specified, the default style is used.
   */
  appearance?: 'brand' | 'inverted';

  /**
   * Can contain two children including `PopoverTrigger` and `PopoverSurface`.
   * Alternatively can only contain `PopoverSurface` if using a custom `target`.
   */
  children: [JSXElement, JSXElement] | JSXElement;

  /**
   * Close when scroll outside of it
   *
   * @default false
   */
  closeOnScroll?: boolean;

  /**
   * Used to set the initial open state of the Popover in uncontrolled mode
   *
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Popovers are rendered out of DOM order on `document.body` by default, use this to render the popover in DOM order
   *
   * @default false
   */
  inline?: boolean;

  /**
   * Call back when the component requests to change value
   * The `open` value is used as a hint when directly controlling the component
   */
  onOpenChange?: (e: OpenPopoverEvents, data: OnOpenChangeData) => void;

  /**
   * Controls the opening of the Popover
   *
   * @default false
   */
  open?: boolean;

  /**
   * Flag to open the Popover by hovering the trigger
   *
   * @default false
   */
  openOnHover?: boolean;

  /**
   * Flag to open the Popover as a context menu. Disables all other interactions
   *
   * @default false
   */
  openOnContext?: boolean;

  /**
   * Sets the delay for closing popover on mouse leave
   */
  mouseLeaveDelay?: number;

  /**
   * Should trap focus
   *
   * @default false
   */
  trapFocus?: boolean;

  /**
   * Enables standard behavior according to the HTML dialog spec
   * where the focus trap involves setting outside elements inert,
   * making navigation leak from the trapped area back to the browser toolbar.
   *
   * @default false
   */
  inertTrapFocus?: boolean;

  /**
   * Must be used with the `trapFocus` prop
   * Enables older Fluent UI focus trap behavior where the user
   * cannot tab into the window outside of the document.
   *
   * @deprecated Use default behavior or inertTrapFocus instead
   * @default false
   */
  legacyTrapFocus?: boolean;

  /**
   * By default Popover focuses the first focusable element in PopoverSurface on open.
   * Specify `disableAutoFocus` to prevent this behavior.
   *
   * @default false
   */
  unstable_disableAutoFocus?: boolean;

  /**
   * Configuration for popover positioning using CSS Anchor Positioning
   */
  positioning?: PositioningShorthandValue;
};

/**
 * Popover State
 */
export type PopoverState = Pick<
  PopoverProps,
  | 'appearance'
  | 'children'
  | 'inline'
  | 'closeOnScroll'
  | 'onOpenChange'
  | 'openOnHover'
  | 'openOnContext'
  | 'mouseLeaveDelay'
  | 'trapFocus'
  | 'inertTrapFocus'
  | 'legacyTrapFocus'
  | 'unstable_disableAutoFocus'
  | 'positioning'
> &
  Required<Pick<PopoverProps, 'open'>> & {
    id: string;

    /**
     * Ref of the PopoverTrigger
     */
    triggerRef: React.MutableRefObject<HTMLElement | null>;

    /**
     * Ref of the PopoverSurface
     */
    contentRef: React.MutableRefObject<HTMLElement | null>;

    /**
     * Callback to open/close the Popover
     */
    setOpen: (e: OpenPopoverEvents, open: boolean) => void;

    popoverSurface: React.ReactElement | undefined;

    popoverTrigger: React.ReactElement | undefined;

    /**
     * Whether the popover is in controlled mode (has open or defaultOpen prop)
     */
    isControlled: boolean;

    /**
     * CSS anchor name for CSS Anchor Positioning API
     */
    anchorName: string;
  };

/**
 * Data attached to open/close events
 */
export type OnOpenChangeData = { open: boolean };

/**
 * The supported events that will trigger open/close of the menu
 */
export type OpenPopoverEvents =
  | React.FocusEvent<HTMLElement>
  | React.KeyboardEvent<HTMLElement>
  | React.MouseEvent<HTMLElement>;
