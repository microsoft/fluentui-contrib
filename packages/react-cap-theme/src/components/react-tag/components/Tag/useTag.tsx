import { useTag_unstable } from "@fluentui/react-tags";
import { slot } from "@fluentui/react-utilities";
import {
	DismissRegular,
	DismissFilled,
	bundleIcon,
} from "@fluentui-contrib/react-cap-theme/react-icons";
import * as React from "react";
import type { TagProps, TagState } from "./Tag.types";

/**
 * Avatar size mapping for different tag sizes.
 * @internal
 */
export const tagAvatarSizeMap = {
	medium: 20,
	small: 20,
	"extra-small": 16,
} as const;

// DismissIcon is defined outside the hook to avoid recreation on every render
const DismissIcon = bundleIcon(DismissFilled, DismissRegular);

/**
 * Creates the state required to render Tag component.
 *
 * @param props - Props from this instance of Tag
 * @param ref - Reference to root HTMLElement of Tag
 * @returns The Tag state object
 * @alpha
 */
export const useTag = (
	props: TagProps,
	ref: React.Ref<HTMLSpanElement | HTMLButtonElement>,
): TagState => {
	const baseState = useTag_unstable(props, ref);

	const state: TagState = {
		...baseState,
		avatarSize: tagAvatarSizeMap[baseState.size],
		dismissIcon: slot.optional(props.dismissIcon, {
			renderByDefault: baseState.dismissible,
			defaultProps: {
				children: <DismissIcon />,
			},
			elementType: "span",
		}),
	};

	return state;
};
