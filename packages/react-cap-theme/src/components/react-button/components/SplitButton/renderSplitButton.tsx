/** @jsx createElement */
/** @jsxRuntime classic */

import { assertSlots, type JSXElement } from '@fluentui/react-utilities';
import type { SplitButtonSlots, SplitButtonState } from './SplitButton.types';

export const renderSplitButton = (state: SplitButtonState): JSXElement => {
  assertSlots<SplitButtonSlots>(state);

  return (
    <state.root>
      {state.primaryActionButton && <state.primaryActionButton />}
      {state.menuButton && <state.menuButton />}
    </state.root>
  );
};
