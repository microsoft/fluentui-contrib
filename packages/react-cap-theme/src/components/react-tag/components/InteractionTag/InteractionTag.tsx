import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import React from "react";

import type { InteractionTagProps } from "./InteractionTag.types";
import { renderInteractionTag } from "./renderInteractionTag";
import { useInteractionTag } from "./useInteractionTag";
import { useInteractionTagContextValues } from "./useInteractionTagContextValues";
import { useInteractionTagStyles } from "./useInteractionTagStyles.styles";

/**
 * InteractionTag component - an interactive tag that supports user interactions.
 *
 * @example
 * ```tsx
 * <InteractionTag onClick={openProfile}>
 *   Juan Del Pueblo
 * </InteractionTag>
 * ```
 *
 * @param props - The interaction tag configuration and event handlers
 * @param ref - Reference to the interaction tag element
 * @returns The rendered interaction tag component
 * @alpha
 */
export const InteractionTag: ForwardRefComponent<InteractionTagProps> =
	React.forwardRef((props, ref) => {
		const state = useInteractionTag(props, ref);

		useInteractionTagStyles(state);

		useCustomStyleHook_unstable("useInteractionTagStyles_unstable")(state);

		return renderInteractionTag(
			state,
			useInteractionTagContextValues(state),
		);
	});

InteractionTag.displayName = "InteractionTag";
