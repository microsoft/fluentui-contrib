import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";

import { renderTag } from "./renderTag";
import type { TagProps } from "./Tag.types";
import { useTag } from "./useTag";
import { useTagAvatarContextValues } from "./useTagAvatarContextValues";
import { useTagStyles } from "./useTagStyles.styles";

/**
 * Tag component - a visual representation of an attribute.
 *
 * @example
 * ```tsx
 * <Tag dismissible value="category">
 *   Design
 * </Tag>
 * ```
 *
 * @param props - The tag configuration and event handlers
 * @param ref - Reference to the tag element
 * @returns The rendered tag component
 * @alpha
 */
export const Tag: ForwardRefComponent<TagProps> = React.forwardRef(
	(props, ref) => {
		const state = useTag(props, ref);

		useTagStyles(state);

		useCustomStyleHook_unstable("useTagStyles_unstable")(state);

		return renderTag(state, useTagAvatarContextValues(state));
	},
);

Tag.displayName = "Tag";
