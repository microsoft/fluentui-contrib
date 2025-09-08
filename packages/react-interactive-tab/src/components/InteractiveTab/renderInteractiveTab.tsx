/** @jsxRuntime classic */
/** @jsx createElement */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from '@fluentui/react-jsx-runtime';

import { assertSlots } from '@fluentui/react-components';
import type {
  InteractiveTabState,
  InteractiveTabInternalSlots,
} from './InteractiveTab.types';

/**
 * Render the final JSX of InteractiveTab
 */
export const renderInteractiveTab_unstable = (state: InteractiveTabState) => {
  assertSlots<InteractiveTabInternalSlots>(state);

  return (
    <state.root>
      {state.contentBefore && <state.contentBefore />}
      <state.button>
        {state.icon && <state.icon />}
        {!state.iconOnly && <state.content />}
        {state.contentReservedSpace && <state.contentReservedSpace />}
      </state.button>
      {state.contentAfter && <state.contentAfter />}
    </state.root>
  );
};
