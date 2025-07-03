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
  title?: NonNullable<StrictSlot>;
  menuTitle?: NonNullable<StrictSlot>;
}

/**
 * Renders a SplitButton component by passing the state defined props to the appropriate slots.
 */
export const renderSplitButton_unstable = (
  state: SplitButtonState,
  titleProps: SplitButtonTitleProps
) => {
  assertSlots<SplitButtonSlots>(state);

  if (titleProps.title === undefined) {
    return (
      <state.root>
        {state.primaryActionButton && <state.primaryActionButton />}
        {state.menuButton && <state.menuButton />}
      </state.root>
    );
  }

  return titleProps.menuTitle !== undefined ? (
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
