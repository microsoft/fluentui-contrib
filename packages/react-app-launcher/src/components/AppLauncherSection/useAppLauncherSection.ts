import type { ReactNode, Ref } from 'react';
import type { AppLauncherSectionProps } from './AppLauncherSection.types';
import type { AppLauncherSectionClasses } from './useAppLauncherSectionStyles.styles';
import { useAppLauncherSectionStyles } from './useAppLauncherSectionStyles.styles';

/**
 * State that {@link renderAppLauncherSection} renders.
 */
export type AppLauncherSectionState = {
  /** Resolved section title, when the caller provided one. */
  title: string | undefined;
  /** Whether the section draws a divider above itself. */
  divider: boolean;
  /** Remaining native div props forwarded to the root element. */
  rootProps: Omit<AppLauncherSectionProps, 'children' | 'divider' | 'title'>;
  /** Section content. */
  children: ReactNode;
  /** Ref to the section element, forwarded to the applications. */
  rootRef: Ref<HTMLDivElement>;
  /** Resolved section style classes. */
  classes: AppLauncherSectionClasses;
};

/**
 * Resolves the section props into render state.
 *
 * All defaulting happens here so that rendering stays declarative: the
 * divider is off unless the caller asks for it, and a missing title makes the
 * section render its content alone.
 *
 * @param props - props from this instance of the section
 * @param ref - ref to the section element
 * @returns the state consumed by {@link renderAppLauncherSection}
 */
export function useAppLauncherSection(
  props: AppLauncherSectionProps,
  ref: Ref<HTMLDivElement>
): AppLauncherSectionState {
  const { children, divider = false, title, ...rootProps } = props;

  const classes = useAppLauncherSectionStyles();

  return {
    title,
    divider,
    rootProps,
    children,
    rootRef: ref,
    classes,
  };
}
