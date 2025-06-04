/** @jsxRuntime classic */
/** @jsx createElement */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from '@fluentui/react-jsx-runtime';

import { assertSlots } from '@fluentui/react-utilities';
import type {
  SplitButtonSlots,
  SplitButtonState,
} from '@fluentui/react-components';
import { StrictSlot } from '../../strictSlot';
import { renderTooltip } from '../ToggleButton/renderTooltip';

export interface SplitButtonTitleProps {
  title?: StrictSlot;
  menuTitle?: StrictSlot;
}

/**
 * Renders a SplitButton component by passing the state defined props to the appropriate slots.
 */
export const renderSplitButton_unstable = (
  state: SplitButtonState,
  titleProps: SplitButtonTitleProps
) => {
  assertSlots<SplitButtonSlots>(state);

  const hasDualTooltip = titleProps.menuTitle !== undefined;

  return hasDualTooltip ? (
    <state.root>
      {state.primaryActionButton &&
        renderTooltip(<state.primaryActionButton />, titleProps.title)}
      {state.menuButton &&
        renderTooltip(<state.menuButton />, titleProps.menuTitle)}
    </state.root>
  ) : (
    renderTooltip(
      <state.root>
        {state.primaryActionButton && <state.primaryActionButton />}
        {state.menuButton && <state.menuButton />}
      </state.root>,
      titleProps.title
    )
  );
};
