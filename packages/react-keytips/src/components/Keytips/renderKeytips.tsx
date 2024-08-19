/** @jsxRuntime classic */
/** @jsx createElement */

import { assertSlots } from '@fluentui/react-utilities';
import type { KeytipsState, KeytipsSlots } from './Keytips.types';
/**
 * Render the final JSX of Keytips
 */
export const renderKeytips_unstable = (state: KeytipsState) => {
  assertSlots<KeytipsSlots>(state);

  return <state.root>{state.keytips}</state.root>;
};
