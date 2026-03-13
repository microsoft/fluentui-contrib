import {
  renderButton_unstable,
  type ButtonState as BaseButtonState,
} from '@fluentui/react-button';
import type { ReactElement } from 'react';
import type { ButtonState } from './Button.types';
import { toBaseState } from './Button.utils';

export const renderButton = (state: ButtonState): ReactElement => {
  const baseState: BaseButtonState = toBaseState(state);
  return renderButton_unstable(baseState);
};
