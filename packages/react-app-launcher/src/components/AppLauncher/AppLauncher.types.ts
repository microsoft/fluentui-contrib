import type { PopoverProps } from '@fluentui/react-components';
import type { ReactElement, ReactNode, RefObject } from 'react';

/**
 * Height behavior of the launcher surface.
 *
 * - `'default'`: the surface wraps its content, capped at the space between
 *   its top edge and the bottom of the window.
 * - `'full'`: the surface is forced to extend from its anchored top edge down
 *   to the bottom of the window.
 */
export type AppLauncherDocking = 'default' | 'full';

/**
 * Props of the app launcher.
 *
 * The launcher pairs the waffle trigger with a popover surface that renders
 * whatever blocks the caller composes inside it: usually a search field,
 * sections of tiles and lists of rows.
 */
export type AppLauncherProps = {
  /**
   * Accessible name of the trigger and its tooltip text. Defaults to
   * `'App launcher'`; applications should pass a localized string.
   */
  label?: string;

  /** Trigger icon override. Defaults to the waffle glyph. */
  icon?: ReactElement;

  /**
   * Caller-provided trigger element, used instead of the built-in waffle
   * button. Pass any element that accepts and forwards injected props and a
   * ref to its root DOM node — the same contract Fluent's `PopoverTrigger`
   * expects — for example a `ToolbarButton`, so the launcher can live inside
   * an application toolbar or a drawer header.
   *
   * The element owns its accessible name (typically `aria-label`) and its
   * tooltip: `label`, `icon` and the built-in tooltip handling apply to the
   * built-in trigger only, and the forwarded ref of `AppLauncher` points at
   * the built-in trigger button.
   *
   * @example
   * ```tsx
   * <AppLauncher
   *     trigger={<ToolbarButton aria-label="App launcher" icon={<GridDots20Regular />} />}
   * >
   *     …panel content…
   * </AppLauncher>
   * ```
   */
  trigger?: ReactElement;

  /**
   * Docking of the surface relative to its anchor. Defaults to opening
   * below, aligned with the start edge. Combine with `dockTarget` to dock
   * to the right edge (`align: 'end'`), and so on.
   */
  positioning?: PopoverProps['positioning'];

  /**
   * Element the surface anchors to instead of the trigger, for example the
   * application's top bar. The surface then docks to that element's edge
   * according to `positioning`: a launcher in the top bar docks flush with
   * the window's edge, directly below the bar, the way the Microsoft 365
   * app launcher behaves.
   *
   * The element must stay mounted while the launcher is open.
   *
   * @example
   * ```tsx
   * const barRef = useRef<HTMLElement>(null);
   *
   * <header ref={barRef}>…</header>
   * <AppLauncher dockTarget={barRef}>…</AppLauncher>
   * ```
   */
  dockTarget?: RefObject<HTMLElement | null>;

  /**
   * Height behavior of the surface. Defaults to `'default'`, where the
   * surface wraps its content and is capped at the space between its top
   * edge and the window bottom: a taller panel scrolls internally instead
   * of growing the page. With `'full'`, the surface instead extends from
   * its anchored top edge down to the window bottom — combined with
   * `dockTarget`, the panel fills the window below the application bar.
   *
   * Size panel content with `box-sizing: border-box`: with the default
   * content box, padding and borders are added on top of the available
   * height and make the panel scroll.
   */
  docking?: AppLauncherDocking;

  /**
   * Whether the surface is open. Leave it undefined for the uncontrolled
   * default; pass it together with `onOpenChange` to keep the state in the
   * application — for example to close the panel when an app is activated.
   */
  open?: boolean;

  /**
   * Fired whenever the launcher asks to change the open state: the trigger,
   * Escape, or a click outside. With `open` set, apply the change yourself.
   */
  onOpenChange?: NonNullable<PopoverProps['onOpenChange']>;

  /** Content of the popover surface. */
  children: ReactNode;
};
