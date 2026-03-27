import { useMenuButton_unstable } from '@fluentui/react-button';
import {
  bundleIcon,
  ChevronDownFilled,
  ChevronDownRegular,
} from '@fluentui/react-icons';
import { slot } from '@fluentui/react-utilities';
import * as React from 'react';
import { baseAppearanceMap } from '../Button/Button.utils';
import type { MenuButtonProps, MenuButtonState } from './MenuButton.types';

const ChevronDownIcon = bundleIcon(ChevronDownFilled, ChevronDownRegular);

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

  return {
    ...baseState,
    appearance,
    menuIcon: slot.optional(props.menuIcon, {
      defaultProps: {
        children: <ChevronDownIcon />,
      },
      renderByDefault: true,
      elementType: 'span',
    }),
  };
};
