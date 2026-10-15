import type { ReactElement, Ref } from 'react';
import { useContext } from 'react';
import type { AppLauncherItemProps } from './AppLauncherItem.types';
import { AppLauncherItemLayoutContext } from './AppLauncherItemLayoutContext';
import type { AppLauncherItemClasses } from './useAppLauncherItemStyles.styles';
import { useAppLauncherItemStyles } from './useAppLauncherItemStyles.styles';

/**
 * State that {@link renderAppLauncherItem} renders.
 */
export type AppLauncherItemState = {
  /** Resolved app name. */
  label: string;
  /** Resolved icon element, when the caller provided one. */
  icon: ReactElement | undefined;
  /** Remaining native button props forwarded to the root element. */
  rootProps: Omit<AppLauncherItemProps, 'icon' | 'label'>;
  /** Ref to the button element, forwarded to the applications. */
  buttonRef: Ref<HTMLButtonElement>;
  /** Resolved item style classes for the layout of the surrounding container. */
  classes: AppLauncherItemClasses;
};

/**
 * Resolves the item props into render state.
 *
 * The layout comes from the surrounding container — a tile inside an
 * `AppLauncherGrid`, a row inside an `AppLauncherList` — and all defaulting
 * happens here so that rendering stays declarative. The item deliberately
 * has no appearance prop: its subtle button style is part of the launcher
 * look, the same way the trigger defaults to a subtle button.
 *
 * @param props - props from this instance of the item
 * @param ref - ref to the button element
 * @returns the state consumed by {@link renderAppLauncherItem}
 */
export function useAppLauncherItem(
  props: AppLauncherItemProps,
  ref: Ref<HTMLButtonElement>
): AppLauncherItemState {
  const { icon, label, ...rootProps } = props;

  const layout = useContext(AppLauncherItemLayoutContext);
  const classes = useAppLauncherItemStyles(layout);

  return {
    label,
    icon,
    rootProps,
    buttonRef: ref,
    classes,
  };
}
