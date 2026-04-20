import type { JSXElement } from '@fluentui/react-utilities';
import { renderButton } from '../Button/renderButton';
import type { ToggleButtonState } from '../../../../customStyleHooks/react-button';

export const renderToggleButton = (state: ToggleButtonState): JSXElement =>
  renderButton(state);
