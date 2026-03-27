import {
	type ImageState,
	useImageStyles_unstable,
} from "@fluentui/react-image";
import { tokens } from "../../../tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

const useRootStyles = makeStyles({
	circular: {
		/** same as base */
	},
	rounded: {
		borderRadius: tokens.borderRadius2XLarge,
	},
	square: {
		/** same as base */
	},
});

export function useImageStyles(state: ImageState): ImageState {
	const rootStyles = useRootStyles();

	state.root.className = mergeClasses(
		rootStyles[state.shape],
		state.root.className,
	);

	return useImageStyles_unstable(state);
}
