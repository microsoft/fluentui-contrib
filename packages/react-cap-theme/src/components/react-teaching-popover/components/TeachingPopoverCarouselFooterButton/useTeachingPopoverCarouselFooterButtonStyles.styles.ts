import { useButtonStyles } from '../../../react-button';
import type { TeachingPopoverCarouselFooterButtonState } from './TeachingPopoverCarouselFooterButton.types';

/**
 * The carousel footer button is visually a CAP `Button`, so we simply delegate
 * to `useButtonStyles`. This wrapper exists to:
 *  - keep a dedicated, named style hook per component (consistent with the
 *    rest of the CAP style hook surface registered in `capStyleHooks.ts`), and
 *  - provide a single place to add carousel-footer-button-specific styles in
 *    the future without changing the registration site.
 */
export const useTeachingPopoverCarouselFooterButtonStyles = (
  state: TeachingPopoverCarouselFooterButtonState
): TeachingPopoverCarouselFooterButtonState => {
  useButtonStyles(state);
  return state;
};
