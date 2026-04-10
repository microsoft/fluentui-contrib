import { useMenuListContext_unstable } from '@fluentui/react-menu';
import {
  type SwatchPickerState,
  useSwatchPicker_unstable,
} from '@fluentui/react-swatch-picker';
import { useEventCallback } from '@fluentui/react-utilities';
import type * as React from 'react';
import type { MenuItemSwatchPickerProps } from './MenuItemSwatchPicker.types';

export const useMenuItemSwatchPicker = (
  props: MenuItemSwatchPickerProps,
  ref: React.Ref<HTMLDivElement>
): SwatchPickerState => {
  const {
    layout = 'grid',
    name,
    spacing = 'medium',
    onSelectionChange,
  } = props;
  const state = useSwatchPicker_unstable({ ...props, layout, spacing }, ref);

  const selectedValue = useMenuListContext_unstable(
    (ctx) => ctx.checkedValues?.[name]?.[0]
  );

  const selectMenuItem = useMenuListContext_unstable(
    (context) => context.selectRadio
  );

  const requestSelectionChange: SwatchPickerState['requestSelectionChange'] =
    useEventCallback((event, data) => {
      onSelectionChange?.(event, {
        type: 'click',
        event,
        selectedValue: data.selectedValue,
        selectedSwatch: data.selectedSwatch,
      });
      selectMenuItem?.(
        event as React.MouseEvent,
        name,
        data.selectedValue,
        true
      );
    });

  state.selectedValue = selectedValue;
  state.requestSelectionChange = requestSelectionChange;

  return state;
};
