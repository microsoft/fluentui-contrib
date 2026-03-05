import {
	getIntrinsicElementProps,
	useId,
	slot,
} from "@fluentui/react-utilities";
import type * as React from "react";
import { Button } from "../Button/Button";
import { MenuButton } from "../MenuButton/MenuButton";
import type { SplitButtonProps, SplitButtonState } from "./SplitButton.types";

/**
 * Given user props, defines default props for the SplitButton and returns processed state.
 * @param props - User provided props to the SplitButton component
 * @param ref - User provided ref to be passed to the SplitButton component
 * @returns Processed SplitButton state object with configured slots and accessibility setup
 * @alpha
 */
export const useSplitButton = (
	props: SplitButtonProps,
	ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): SplitButtonState => {
	const {
		appearance = "secondary",
		children,
		disabled = false,
		disabledFocusable = false,
		icon,
		iconPosition = "before",
		menuButton,
		menuIcon,
		primaryActionButton,
		size = "medium",
	} = props;

	/** Generate unique ID for accessibility relationships */
	const baseId = useId("splitButton-");

	/** Configure the menu button slot with shared properties and MenuButton component */
	const menuButtonShorthand = slot.optional(menuButton, {
		defaultProps: {
			appearance,
			disabled,
			disabledFocusable,
			menuIcon,
			size,
		},
		renderByDefault: true,
		elementType: MenuButton,
	});

	/** Configure the primary action button slot with shared properties and Button component */
	const primaryActionButtonShorthand = slot.optional(primaryActionButton, {
		defaultProps: {
			appearance,
			children,
			disabled,
			disabledFocusable,
			icon,
			iconPosition,
			id: baseId + "__primaryActionButton",
			size,
		},
		renderByDefault: true,
		elementType: Button,
	});

	/**
	 * Establish accessibility relationship between menu button and primary action button.
	 * The menu button will be labeled by the primary action button's text if no explicit
	 * aria-label or aria-labelledby is provided.
	 */
	if (
		menuButtonShorthand &&
		primaryActionButtonShorthand &&
		!menuButtonShorthand["aria-label"] &&
		!menuButtonShorthand["aria-labelledby"]
	) {
		menuButtonShorthand["aria-labelledby"] =
			primaryActionButtonShorthand.id;
	}

	return {
		components: {
			root: "div",
			menuButton: MenuButton,
			primaryActionButton: Button,
		},
		root: slot.always(getIntrinsicElementProps("div", { ref, ...props }), {
			elementType: "div",
		}),
		primaryActionButton: primaryActionButtonShorthand,
		menuButton: menuButtonShorthand,
		appearance,
		disabled,
		disabledFocusable,
		iconPosition,
		shape: "rounded",
		size,
	};
};
