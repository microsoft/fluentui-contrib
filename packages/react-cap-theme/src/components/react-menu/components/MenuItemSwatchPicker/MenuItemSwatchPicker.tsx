import {
  renderSwatchPicker_unstable,
  useSwatchPickerContextValues,
} from '@fluentui/react-swatch-picker';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import type { MenuItemSwatchPickerProps } from './MenuItemSwatchPicker.types';
import { useMenuItemSwatchPicker } from './useMenuItemSwatchPicker';
import { useMenuItemSwatchPickerStyles } from './useMenuItemSwatchPickerStyles.styles';

export const MenuItemSwatchPicker: ForwardRefComponent<MenuItemSwatchPickerProps> =
  React.forwardRef((props, ref) => {
    const state = useMenuItemSwatchPicker(props, ref);
    const contextValues = useSwatchPickerContextValues(state);
    useMenuItemSwatchPickerStyles(state);
    return renderSwatchPicker_unstable(state, contextValues);
  });

MenuItemSwatchPicker.displayName = 'MenuItemSwatchPicker';
