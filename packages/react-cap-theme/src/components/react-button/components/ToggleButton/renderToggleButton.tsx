import type { ReactElement } from 'react';
import { renderButton } from '../../Button';
import type { ToggleButtonState } from './ToggleButton.types';

export const renderToggleButton = (state: ToggleButtonState): ReactElement =>
  renderButton(state);
