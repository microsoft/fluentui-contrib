import { usePopoverContext_unstable } from '../popoverContext';
import type { PopoverContextValue } from '../popoverContext';

/**
 * A test utility to mock the usePopoverContext_unstable hook that relies on context selector
 * Don't forget to call `jest.mock(**\/popupContext.ts)` while using this
 * @param options Popover context values to set for testing
 */
export const mockPopoverContext = (options: Partial<PopoverContextValue> = {}): void => {
  const mockContext: PopoverContextValue = {
    id: '',
    open: false,
    setOpen: () => null,
    triggerRef: { current: null },
    contentRef: { current: null },
    openOnContext: undefined,
    openOnHover: undefined,
    mouseLeaveDelay: undefined,
    inline: false,
    trapFocus: undefined,
    inertTrapFocus: undefined,
    legacyTrapFocus: undefined,
    unstable_disableAutoFocus: undefined,
    isControlled: false,
    anchorName: '',
    ...options,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (usePopoverContext_unstable as jest.Mock).mockImplementation((selector: (context: PopoverContextValue) => any) => {
    return selector(mockContext);
  });
};
