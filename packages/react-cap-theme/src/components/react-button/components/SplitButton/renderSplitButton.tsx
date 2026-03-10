import { assertSlots } from '@fluentui/react-utilities';
import type { ReactElement } from 'react';
import type { SplitButtonSlots, SplitButtonState } from './SplitButton.types';

export const renderSplitButton = (state: SplitButtonState): ReactElement => {
  assertSlots<SplitButtonSlots>(state);

  return (
    <state.root>
      {state.primaryActionButton && <state.primaryActionButton />}
      {state.menuButton && <state.menuButton />}
    </state.root>
  );
};
