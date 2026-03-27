import type { JSXElement } from '@fluentui/react-utilities';
import { renderButton } from '../../Button';
import type { ToggleButtonState } from './ToggleButton.types';

export const renderToggleButton = (state: ToggleButtonState): JSXElement =>
  renderButton(state);
