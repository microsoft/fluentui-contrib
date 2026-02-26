import { useTextarea_unstable } from "@fluentui/react-textarea";
import type React from "react";
import type { TextareaProps, TextareaState } from "./Textarea.types";

/**
 * Creates the state required to render Textarea component.
 * @param props - User provided props to the Textarea component
 * @param ref - User provided ref to be passed to the Textarea element (not root)
 * @returns The Textarea state object
 * @alpha
 */
export const useTextarea = (
	props: TextareaProps,
	ref: React.Ref<HTMLTextAreaElement>,
): TextareaState => {
	const { color, ...rest } = props;
	const baseState = useTextarea_unstable(rest, ref);

	return {
		...baseState,
		color: color || "brand",
	};
};
