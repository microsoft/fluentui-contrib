import { renderTextarea_unstable } from "@fluentui/react-textarea";
import type { ForwardRefComponent } from "@fluentui/react-utilities";
import * as React from "react";

import type { TextareaProps } from "./Textarea.types";
import { useTextarea } from "./useTextarea";
import { useTextareaStyles } from "./useTextareaStyles.styles";

/**
 * The Textarea component allows people to enter and edit multi-line text.
 *
 * @example
 * ```tsx
 * <Textarea placeholder='Enter your text' />
 * ```
 * @alpha
 */
export const Textarea: ForwardRefComponent<TextareaProps> = React.forwardRef(
	(props, ref) => {
		const state = useTextarea(props, ref);

		useTextareaStyles(state);

		return renderTextarea_unstable(state);
	},
);

Textarea.displayName = "Textarea";
