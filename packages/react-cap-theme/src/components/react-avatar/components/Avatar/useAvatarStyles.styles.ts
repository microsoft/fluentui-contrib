import { type AvatarState } from "@fluentui/react-avatar";
import { makeStyles, mergeClasses } from "@griffel/react";

const useRootStyles = makeStyles({
	squareRadiusSm: {
		borderRadius: "4px",
	},
	squareRadiusMd: {
		borderRadius: "6px",
	},
	squareRadiusLg: {
		borderRadius: "8px",
	},
});

export const useAvatarStyles = (state: AvatarState): AvatarState => {
	const rootStyles = useRootStyles();
	if (state.shape === "square") {
		if (state.size <= 16) {
			state.root.className = mergeClasses(
				state.root.className,
				rootStyles.squareRadiusSm,
			);
		} else if (state.size <= 28) {
			state.root.className = mergeClasses(
				state.root.className,
				rootStyles.squareRadiusMd,
			);
		} else {
			state.root.className = mergeClasses(
				state.root.className,
				rootStyles.squareRadiusLg,
			);
		}
	}
	return state;
};
