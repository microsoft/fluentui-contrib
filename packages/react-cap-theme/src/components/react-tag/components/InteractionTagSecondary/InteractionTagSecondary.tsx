import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import React from "react";

import type { InteractionTagSecondaryProps } from "./InteractionTagSecondary.types";
import { renderInteractionTagSecondary } from "./renderInteractionTagSecondary";
import { useInteractionTagSecondary } from "./useInteractionTagSecondary";
import { useInteractionTagSecondaryStyles } from "./useInteractionTagSecondaryStyles.styles";

/**
 * InteractionTagSecondary component - a secondary interactive tag element.
 *
 * @example
 * ```tsx
 * <InteractionTagSecondary onClick={handleRemove}>
 *   <DismissIcon />
 * </InteractionTagSecondary>
 * ```
 *
 * @param props - The secondary interaction tag configuration and event handlers
 * @param ref - Reference to the secondary interaction tag element
 * @returns The rendered secondary interaction tag component
 * @alpha
 */
export const InteractionTagSecondary: ForwardRefComponent<InteractionTagSecondaryProps> =
	React.forwardRef((props, ref) => {
		const state = useInteractionTagSecondary(props, ref);

		useInteractionTagSecondaryStyles(state);

		useCustomStyleHook_unstable(
			"useInteractionTagSecondaryStyles_unstable",
		)(state);

		return renderInteractionTagSecondary(state);
	});

InteractionTagSecondary.displayName = "InteractionTagSecondary";
