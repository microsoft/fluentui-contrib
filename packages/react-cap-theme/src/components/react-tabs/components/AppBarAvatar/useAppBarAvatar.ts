import {
	type AvatarProps,
	useAvatar_unstable,
} from "@fluentui-contrib/react-cap-theme";
import type {
	AppBarAvatarProps,
	AppBarAvatarState,
} from "./AppBarAvatar.types";

/**
 * Create the state required to render AppBarAvatar component.
 * @param props - Props from this instance of AppBarAvatar
 * @param ref - Reference to root HTMLElement of AppBarAvatar
 * @returns The AppBarAvatar state object
 * @alpha
 */
export const useAppBarAvatar = (
	props: AppBarAvatarProps,
	ref: React.Ref<HTMLElement>,
): AppBarAvatarState => {
	const color: AvatarProps["color"] = "neutral";
	const size: AvatarProps["size"] = 24;
	const base = useAvatar_unstable({ ...props, color, size }, ref);
	return base;
};
