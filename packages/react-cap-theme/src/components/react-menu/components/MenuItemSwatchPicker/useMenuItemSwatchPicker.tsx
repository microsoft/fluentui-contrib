import { useMenuListContext_unstable } from "@fluentui/react-menu";
import {
	type SwatchPickerState,
	useSwatchPicker_unstable,
} from "@fluentui/react-swatch-picker";
import { useEventCallback } from "@fluentui/react-utilities";
import type * as React from "react";
import type { MenuItemSwatchPickerProps } from "./MenuItemSwatchPicker.types";

/**
 * Creates the state required to render MenuItemSwatchPicker component.
 * @param props - Props from this instance of MenuItemSwatchPicker
 * @param ref - Reference to root HTMLDivElement of MenuItemSwatchPicker
 * @returns The MenuItemSwatchPicker state object
 * @alpha
 */
export const useMenuItemSwatchPicker = (
	props: MenuItemSwatchPickerProps,
	ref: React.Ref<HTMLDivElement>,
): SwatchPickerState => {
	const {
		layout = "grid",
		name,
		spacing = "medium",
		onSelectionChange,
	} = props;
	const state = useSwatchPicker_unstable({ ...props, layout, spacing }, ref);

	// Get the selected swatch from the menu context
	const selectedValue = useMenuListContext_unstable(
		(ctx) => ctx.checkedValues?.[name]?.[0],
	);

	// Get the selectRadio function from the menu context to update the selected swatch
	const selectMenuItem = useMenuListContext_unstable(
		(context) => context.selectRadio,
	);

	const requestSelectionChange: SwatchPickerState["requestSelectionChange"] =
		useEventCallback((event, data) => {
			onSelectionChange?.(event, {
				type: "click",
				event,
				selectedValue: data.selectedValue,
				selectedSwatch: data.selectedSwatch,
			});
			selectMenuItem?.(
				event as React.MouseEvent,
				name,
				data.selectedValue,
				true,
			);
		});

	state.selectedValue = selectedValue;
	state.requestSelectionChange = requestSelectionChange;

	return state;
};
