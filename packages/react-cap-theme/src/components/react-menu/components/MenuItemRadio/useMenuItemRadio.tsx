import type { ARIAButtonElement } from '@fluentui/react-aria';
import {
  RadioButton20Filled,
  RadioButton20Regular,
} from '@fluentui/react-icons';
import {
  useMenuItemRadio_unstable,
  useMenuListContext_unstable,
  type MenuItemRadioProps,
  type MenuItemRadioState,
} from '@fluentui/react-menu';
import { slot } from '@fluentui/react-utilities';
import * as React from 'react';

export const useMenuItemRadio = (
  props: MenuItemRadioProps,
  ref: React.Ref<ARIAButtonElement<'div'>>
): MenuItemRadioState => {
  const { name, value } = props;
  const checked = useMenuListContext_unstable((context) => {
    const checkedItems = context.checkedValues?.[name] || [];
    return checkedItems.indexOf(value) !== -1;
  });
  const checkmark = slot.optional(props.checkmark, {
    defaultProps: {
      children: checked ? <RadioButton20Filled /> : <RadioButton20Regular />,
    },
    renderByDefault: true,
    elementType: 'span',
  });

  return useMenuItemRadio_unstable({ ...props, checkmark }, ref);
};
