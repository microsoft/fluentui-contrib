import { renderMenuButton_unstable } from '@fluentui/react-button';
import type { ReactElement } from 'react';
import { baseAppearanceMap } from '../Button/Button.utils';
import type { MenuButtonState } from './MenuButton.types';

export const renderMenuButton = (state: MenuButtonState): ReactElement => {
  return renderMenuButton_unstable({
    ...state,
    appearance: baseAppearanceMap[state.appearance] ?? 'secondary',
  });
};
