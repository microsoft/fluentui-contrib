import {
	type AvatarSize,
	type AvatarGroupProps,
	type AvatarGroupItemState,
} from "@fluentui/react-avatar";
import { tokens } from "@fluentui/react-theme";
import { makeStyles, mergeClasses } from "@griffel/react";

export const useAvatarGroupItemStyles = (state: AvatarGroupItemState): void => {
	const { layout, size } = state;
	const groupChildClassName = useGroupChildClassName(layout, size);

	const rootClasses = [];
	if (!state.isOverflowItem) {
		rootClasses.push(groupChildClassName);
	}

	state.root.className = mergeClasses(state.root.className, ...rootClasses);
};

const useStackItemStyles = makeStyles({
	borderMd: {
		background: "red",
		// TODO(david): replace width with token
		boxShadow: `0 0 0 2px ${tokens.colorNeutralBackground2}`,
	},
	borderLg: {
		// TODO(david): replace width with token
		boxShadow: `0 0 0 3px ${tokens.colorNeutralBackground2}`,
	},
});

export const useGroupChildClassName = (
	layout: AvatarGroupProps["layout"],
	size: AvatarSize,
): string => {
	const stackItemStyles = useStackItemStyles();
	const layoutClasses = [];
	if (layout === "stack") {
		if (size > 16 && size <= 32) {
			layoutClasses.push(stackItemStyles.borderMd);
		} else if (size > 32 && size <= 48) {
			layoutClasses.push(stackItemStyles.borderLg);
		}
	}
	return mergeClasses(...layoutClasses);
};
