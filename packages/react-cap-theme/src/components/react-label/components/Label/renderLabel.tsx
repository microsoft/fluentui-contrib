/** @jsx createElement */
/** @jsxRuntime classic */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from '@fluentui/react-jsx-runtime'; // createElement custom JSX pragma is required to support slot creation
import { assertSlots, type JSXElement } from '@fluentui/react-utilities';
import type {
  LabelSlots,
  LabelState,
} from '../../../../customStyleHooks/react-label';

/**
 * Render the final JSX of Label.
 * @param state - Label state
 * @returns The rendered Label element
 * @alpha
 */
export const renderLabel = (state: LabelState): JSXElement => {
  assertSlots<LabelSlots>(state);

  return (
    <state.root>
      {state.icon && <state.icon />}
      {state.root.children}
      {state.required && <state.required />}
    </state.root>
  );
};
