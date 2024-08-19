/** @jsxRuntime classic */
/** @jsx createElement */

import { assertSlots } from '@fluentui/react-utilities';
import type { KeytipState, KeytipSlots } from './Keytip.types';
import { Tooltip } from '@fluentui/react-tooltip';

/**
 * Render the final JSX of Keytip
 */
export const renderKeytip_unstable = (state: KeytipState) => {
  assertSlots<KeytipSlots>(state);
  const { visible, appearance, positioning, content } = state;

  return (
    <Tooltip
      visible={visible}
      appearance={appearance}
      positioning={positioning}
      content={content}
      relationship="description"
    />
  );
};
