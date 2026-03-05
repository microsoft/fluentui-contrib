import type { ComponentProps } from "@fluentui/react-utilities";
import type {
	AvatarProps,
	AvatarSlots,
	AvatarState,
} from "@fluentui-contrib/react-cap-theme/react-avatar";

/**
 * Slot configuration for the AppBarAvatar component.
 * @alpha
 */
export type AppBarAvatarSlots = Pick<AvatarSlots, "root" | "image" | "icon">;

/**
 * Properties for configuring the AppBarAvatar component.
 *
 * @example
 * ```tsx
 * const props: AppBarAvatarProps = {
 *   image: { src: 'https://example.com/avatar.jpg' },
 *   shape: 'circular'
 * };
 * ```
 * @alpha
 */
export type AppBarAvatarProps = ComponentProps<AppBarAvatarSlots> &
	Pick<AvatarProps, "shape">;

/**
 * Internal state used in rendering AppBarAvatar component.
 * @alpha
 */
export type AppBarAvatarState = AvatarState;
