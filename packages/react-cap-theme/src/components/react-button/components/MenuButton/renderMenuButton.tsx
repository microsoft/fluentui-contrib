import { renderMenuButton_unstable } from '@fluentui/react-button';
import type { JSXElement } from '@fluentui/react-utilities';
import { baseAppearanceMap } from '../Button/Button.utils';
import type { MenuButtonState } from './MenuButton.types';

export const renderMenuButton = (state: MenuButtonState): JSXElement => {
  return renderMenuButton_unstable({
    ...state,
    appearance: baseAppearanceMap[state.appearance] ?? 'secondary',
  });
};
