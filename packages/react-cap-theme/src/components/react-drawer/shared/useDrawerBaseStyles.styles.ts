import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";
import type { DrawerProps } from "../Drawer";

const borderRadius = tokens.borderRadiusXLarge;

const useDrawerStyles = makeStyles({
	/* Positioning */
	start: { borderRadius: `0 ${borderRadius} ${borderRadius} 0` },
	end: { borderRadius: `${borderRadius} 0 0 ${borderRadius}` },
	bottom: { borderRadius: `${borderRadius} ${borderRadius} 0 0` },
});

/**
 * Class names that are shared between the Inline and Overlay drawer components.
 * @param props - Props for the drawer component
 * @returns class names for the drawer component
 * @internal
 */
export const useDrawerBaseClassNames = (props: DrawerProps): string => {
	const { position = "start" } = props;
	const baseStyles = useDrawerStyles();

	return mergeClasses(baseStyles[position]);
};
