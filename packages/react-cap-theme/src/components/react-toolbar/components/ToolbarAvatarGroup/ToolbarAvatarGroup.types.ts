import type { AvatarGroupProps } from "@fluentui-contrib/react-cap-theme/react-avatar";

/**
 * Props for ToolbarAvatarGroup component with fixed 32px size for toolbar usage.
 * @alpha
 */
export type ToolbarAvatarGroupProps = Omit<AvatarGroupProps, "size">;
