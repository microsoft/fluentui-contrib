import { useMenuButton_unstable } from '@fluentui/react-button';
import type * as React from 'react';
import { baseAppearanceMap } from '../Button/Button.utils';
import type { MenuButtonProps, MenuButtonState } from './MenuButton.types';

export const useMenuButton = (
  props: MenuButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>
): MenuButtonState => {
  const { appearance = 'secondary' } = props;
  const baseState = useMenuButton_unstable(
    {
      ...props,
      appearance: appearance && baseAppearanceMap[appearance],
    },
    ref
  );
  return { ...baseState, appearance } as MenuButtonState;
};
