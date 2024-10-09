/** @jsxRuntime classic */
/** @jsx createElement */

import type { KeytipSlots, KeytipState } from './Keytip.types';
import { assertSlots } from '@fluentui/react-utilities';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from '@fluentui/react-jsx-runtime';

/**
 * Render the final JSX of Keytip
 */
export const renderKeytip_unstable = (state: KeytipState) => {
  assertSlots<KeytipSlots>(state);
  if (!state.shouldRenderKeytip) return null;
  return <state.content>{state.content.children}</state.content>;
};
