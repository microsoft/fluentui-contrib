import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { PopoverContext } from '../../popoverContext';
import type { PopoverState } from './Popover.types';

/**
 * Render the final JSX of Popover
 */

export const renderPopover_unstable = (state: PopoverState): JSXElement => {
  const {
    id,
    appearance,
    contentRef,
    inline,
    open,
    setOpen,
    openOnHover,
    mouseLeaveDelay,
    trapFocus,
    inertTrapFocus,
    legacyTrapFocus,
    unstable_disableAutoFocus,
    triggerRef,
    isControlled,
    anchorName,
    positioning,
  } = state;

  return (
    <PopoverContext.Provider
      value={{
        id,
        appearance,
        contentRef,
        inline,
        open,
        setOpen,
        openOnHover,
        mouseLeaveDelay,
        trapFocus,
        inertTrapFocus,
        legacyTrapFocus,
        unstable_disableAutoFocus,
        triggerRef,
        isControlled,
        anchorName,
        positioning,
      }}
    >
      {state.popoverTrigger}
      {state.popoverSurface}
    </PopoverContext.Provider>
  );
};
