import type {
  PopoverProps,
  PositioningProps,
} from '@fluentui/react-components';
import { resolvePositioningShorthand } from '@fluentui/react-components';
import type { ReactNode, Ref } from 'react';
import { useMemo, useState } from 'react';
import type { AppLauncherProps } from './AppLauncher.types';
import type { AppLauncherClasses } from './useAppLauncherStyles.styles';
import { useAppLauncherStyles } from './useAppLauncherStyles.styles';

/**
 * Docking used when the caller does not pass `positioning`: the surface opens
 * below the anchor, aligned with its start edge, which matches how the waffle
 * behaves in a top-left application header.
 */
const DEFAULT_POSITIONING: PositioningProps = {
  position: 'below',
  align: 'start',
};

/**
 * State that {@link renderAppLauncher} renders.
 */
export type AppLauncherState = {
  /** Accessible name and tooltip text of the trigger. */
  label: AppLauncherProps['label'];
  /** Trigger icon override. */
  icon: AppLauncherProps['icon'];
  /** Caller-provided trigger element, used instead of the built-in one. */
  trigger: AppLauncherProps['trigger'];
  /**
   * Resolved docking of the surface. Always an object so the dock target
   * can travel inside it, which is where the popover reads its positioning
   * options from.
   */
  positioning: PositioningProps;
  /**
   * Whether the surface is open, from the controlled prop when the caller
   * passes one and from the internal mirror otherwise. Drives the trigger
   * tooltip.
   */
  open: boolean;
  /**
   * The controlled `open` prop, passed to the popover as-is; `undefined`
   * keeps the popover uncontrolled.
   */
  controlledOpen: AppLauncherProps['open'];
  /** Records open state changes; passed to the popover. */
  onOpenChange: NonNullable<PopoverProps['onOpenChange']>;
  /** Resolved surface style classes. */
  classes: AppLauncherClasses;
  /** Caller-provided surface content. */
  children: ReactNode;
  /** Ref to the trigger button, forwarded to the applications. */
  triggerRef: Ref<HTMLButtonElement>;
};

/**
 * Resolves the launcher props into render state.
 *
 * All defaulting happens here so that rendering stays declarative: the
 * positioning shorthand falls back to opening below the anchor, and shorthand
 * strings (`'below-end'` and friends) are resolved to options first, so the
 * dock target can be merged in.
 *
 * When `dockTarget` is set, the surface positions against that element
 * instead of the trigger. The element is wrapped in a stable virtual target
 * whose `getBoundingClientRect` forwards to the ref on every position
 * computation. That indirection matters because the launcher usually renders
 * inside the very bar it docks to: the bar's ref is not attached yet while
 * the launcher mounts, and reading the ref lazily also keeps the position
 * correct when the layout changes later.
 *
 * The open state lives in the popover unless the caller passes `open`; the
 * hook always mirrors it so the trigger can hide its tooltip while the panel
 * is open, and forwards every change through `onOpenChange`.
 *
 * Every docking merges an `autoSize` height option into the positioning: the
 * positioning layer then caps the surface at the space between its top edge
 * and the window bottom — pinning the height and adding `overflow-y: auto`
 * once the content is taller — so a long panel scrolls inside instead of
 * growing the page. Full docking additionally asks for the full window height
 * through its style.
 *
 * @param props - props from this instance of the launcher
 * @param ref - ref to the trigger button element
 * @returns the state consumed by {@link renderAppLauncher}
 */
export function useAppLauncher(
  props: AppLauncherProps,
  ref: Ref<HTMLButtonElement>
): AppLauncherState {
  const {
    children,
    docking = 'default',
    dockTarget,
    icon,
    label,
    onOpenChange,
    open: controlledOpen,
    positioning = DEFAULT_POSITIONING,
    trigger,
  } = props;

  const classes = useAppLauncherStyles(docking);

  const [openState, setOpenState] = useState(false);

  const handleOpenChange: NonNullable<PopoverProps['onOpenChange']> = (
    event,
    data
  ) => {
    setOpenState(data.open);
    onOpenChange?.(event, data);
  };

  const open = controlledOpen ?? openState;

  // Virtual targets are what the positioning layer uses for targets that
  // are not plain elements; Fluent itself builds them for context menus.
  const dockTargetElement = useMemo(():
    | NonNullable<PositioningProps['target']>
    | undefined => {
    if (!dockTarget) {
      return undefined;
    }

    return {
      getBoundingClientRect: () =>
        dockTarget.current?.getBoundingClientRect() ?? new DOMRect(),
    };
  }, [dockTarget]);

  return {
    label,
    icon,
    trigger,
    positioning: {
      ...resolvePositioningShorthand(positioning),
      ...(dockTargetElement ? { target: dockTargetElement } : null),
      autoSize: 'height' as const,
    },
    open,
    controlledOpen,
    onOpenChange: handleOpenChange,
    classes,
    children,
    triggerRef: ref,
  };
}
