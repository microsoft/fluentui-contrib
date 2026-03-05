import { useARIAButtonProps } from "@fluentui/react-aria";
import { motionTokens } from "@fluentui/react-components";
import {
	getIntrinsicElementProps,
	slot,
	useControllableState,
} from "@fluentui/react-utilities";
import { Button } from "@fluentui-contrib/react-cap-theme/react-button";
import { ChevronDownRegular } from "@fluentui-contrib/react-cap-theme/react-icons";
import * as React from "react";
import type {
	HeaderProps,
	HeaderState,
	OpenHeaderEvents,
} from "./Header.types";

/**
 * Create the state required to render Header.
 *
 * The returned state can be modified with hooks such as useHeaderStyles_unstable,
 * before being passed to renderHeader_unstable.
 *
 * @param props - props from this instance of Header
 * @param ref - reference to root HTMLElement of Header
 * @returns The state object for Header component
 * @alpha
 */
export const useHeader = (
	props: HeaderProps,
	ref: React.Ref<HTMLElement>,
): HeaderState => {
	const {
		collapsible = false,
		expandButtonPosition = "start",
		size = "xlarge",
		alignment = "start",
	} = props;

	const [open, setOpen] = useControllableState({
		state: props.open,
		initialState: true,
	});

	// Calculate how to rotate the expand icon  (ChevronDownRegular)
	const expandIconRotation = open ? -180 : 0;

	// Memoize the style object for the ChevronDownRegular icon
	const chevronIconStyle = React.useMemo(
		() => ({
			transform: `rotate(${expandIconRotation}deg)`,
			transition: `transform ${motionTokens.durationNormal}ms ease-out`,
		}),
		[expandIconRotation],
	);

	// Configurations for expand button
	const expandButtonOnClick = React.useCallback(
		(e: OpenHeaderEvents) => {
			setOpen(!open);
		},
		[setOpen, open],
	);
	const expandButtonSlot = slot.optional(props.expandButton, {
		defaultProps: {
			appearance: "transparent",
			"aria-expanded": open,
			icon: <ChevronDownRegular style={chevronIconStyle} />,
			onClick: expandButtonOnClick,
		},
		elementType: Button,
		renderByDefault: alignment !== "center" && collapsible,
	});
	const expandButtonAriaProps = useARIAButtonProps(
		"button",
		expandButtonSlot ?? {},
	);

	const state: HeaderState = {
		components: {
			root: "div",
			content: "div",
			actions: "div",
			expandButton: Button,
		},
		root: slot.always(getIntrinsicElementProps("div", { ref, ...props }), {
			elementType: "div",
		}),
		content: slot.always(props.content, {
			elementType: "div",
		}) as HeaderState["content"],
		actions: slot.optional(
			alignment !== "center" ? props.actions : undefined,
			{ elementType: "div" },
		),
		expandButton: expandButtonSlot && expandButtonAriaProps,
		alignment,
		collapsible,
		expandButtonPosition,
		open,
		size,
	};

	return state;
};
