'use client';

import * as React from 'react';
import {
  createContext,
  useContextSelector,
} from '@fluentui/react-context-selector';
import type {
  ContextSelector,
  Context,
} from '@fluentui/react-context-selector';
import type { PopoverState } from './components/Popover/index';

export const PopoverContext: Context<PopoverContextValue> = createContext<
  PopoverContextValue | undefined
>(undefined) as Context<PopoverContextValue>;
const popoverContextDefaultValue: PopoverContextValue = {
  id: '',
  triggerRef: { current: null },
  contentRef: { current: null },
  inline: false,
  open: false,
  setOpen: () => null,
  openOnHover: undefined,
  openOnContext: undefined,
  mouseLeaveDelay: undefined,
  trapFocus: undefined,
  inertTrapFocus: undefined,
  legacyTrapFocus: undefined,
  unstable_disableAutoFocus: undefined,
  isControlled: false,
  anchorName: '',
};

export const PopoverProvider = PopoverContext.Provider;

/**
 * Context shared between Popover and its children components
 */
export type PopoverContextValue = Pick<
  PopoverState,
  | 'id'
  | 'appearance'
  | 'inline'
  | 'open'
  | 'setOpen'
  | 'openOnHover'
  | 'openOnContext'
  | 'mouseLeaveDelay'
  | 'trapFocus'
  | 'inertTrapFocus'
  | 'legacyTrapFocus'
  | 'unstable_disableAutoFocus'
  | 'isControlled'
  | 'anchorName'
  | 'positioning'
> & {
  /**
   * Ref of the PopoverTrigger
   */
  triggerRef: React.MutableRefObject<HTMLElement | null>;

  /**
   * Ref of the PopoverSurface
   */
  contentRef: React.MutableRefObject<HTMLElement | null>;
};

export const usePopoverContext_unstable = <T>(
  selector: ContextSelector<PopoverContextValue, T>
): T =>
  useContextSelector(PopoverContext, (ctx = popoverContextDefaultValue) =>
    selector(ctx)
  );
