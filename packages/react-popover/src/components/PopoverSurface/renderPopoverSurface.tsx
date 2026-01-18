/** @jsxRuntime classic */
/** @jsx createElement */

import { assertSlots } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from '@fluentui/react-jsx-runtime';
import type {
  PopoverSurfaceSlots,
  PopoverSurfaceState,
} from './PopoverSurface.types';

/**
 * Render the final JSX of PopoverSurface
 */
export const renderPopoverSurface_unstable = (
  state: PopoverSurfaceState
): JSXElement => {
  assertSlots<PopoverSurfaceSlots>(state);

  const surface = <state.root>{state.root.children}</state.root>;

  return surface;
};
