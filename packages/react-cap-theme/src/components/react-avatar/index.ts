import {
	type AvatarSize,
	type AvatarShape,
	type AvatarGroupProps,
	AvatarProps,
} from "@fluentui/react-avatar";

export const AVATAR_SHAPES = [
	"circular",
	"square",
] as const satisfies AvatarShape[];

export const AVATAR_SIZES = [
	16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128,
] as const satisfies AvatarSize[];

export const AVATAR_GROUP_LAYOUTS = [
	"spread",
	"stack",
	"pie",
] as const satisfies AvatarGroupProps[];

export const AVATAR_COLORS = [
	"neutral",
	"brand",
	"colorful",

	// named colors
	"dark-red",
	"cranberry",
	"red",
	"pumpkin",
	"peach",
	"marigold",
	"gold",
	"brass",
	"brown",
	"forest",
	"seafoam",
	"dark-green",
	"light-teal",
	"teal",
	"steel",
	"blue",
	"royal-blue",
	"cornflower",
	"navy",
	"lavender",
	"purple",
	"grape",
	"lilac",
	"pink",
	"magenta",
	"plum",
	"beige",
	"mink",
	"platinum",
	"anchor",
] as const satisfies AvatarProps["color"][];

export * from "./components/Avatar/useAvatarStyles.styles";
export * from "./components/AvatarGroupItem/useAvatarGroupItemStyles.styles";

// compatibility exports for other components we've forked.
export {
	Avatar,
	AvatarGroup,
	AvatarGroupItem,
	useAvatar_unstable,
	useAvatar_unstable as useAvatar,
	useAvatarStyles_unstable,
	renderAvatar_unstable,
	renderAvatar_unstable as renderAvatar,
	renderAvatarGroup_unstable as renderAvatarGroup,
	useAvatarGroup_unstable as useAvatarGroup,
	useAvatarGroupStyles_unstable as useAvatarGroupStyles,
	useAvatarGroupContextValues,
	type AvatarProps,
	type AvatarShape,
	type AvatarGroupProps,
	type AvatarGroupItemProps,
	type AvatarSlots,
	type AvatarState,
	type AvatarGroupState,
} from "@fluentui/react-avatar";
