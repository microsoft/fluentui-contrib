import {
  renderButton_unstable,
  type ButtonState as BaseButtonState,
} from '@fluentui/react-button';
import type { JSXElement } from '@fluentui/react-utilities';
import type { ButtonState } from '../../../../customStyleHooks/react-button';
import { toBaseState } from '../../utils/toBaseState';

export const renderButton = (state: ButtonState): JSXElement => {
  const baseState: BaseButtonState = toBaseState(state);
  return renderButton_unstable(baseState);
};
