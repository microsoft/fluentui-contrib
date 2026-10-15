import type { ButtonProps } from '@fluentui/react-components';
import type { ComponentPropsWithoutRef, ReactElement } from 'react';

/**
 * Props of the app launcher trigger.
 *
 * The trigger renders an icon-only button, so `children` is not part of the
 * API: the waffle glyph is the icon and `label` is both the accessible name
 * and the tooltip text. All native button props (`onClick`, `className`,
 * ARIA attributes, event handlers, ...) pass through to the element, which
 * also lets a later `PopoverTrigger` inject its own props without an API
 * change.
 */
export type AppLauncherTriggerProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'children'
> & {
  /**
   * Accessible name of the trigger, also shown as the tooltip.
   *
   * Defaults to `'App launcher'`. Applications should pass a localized
   * string so the button is named in the user's language.
   */
  label?: string;

  /**
   * Icon rendered inside the button. Defaults to the Fluent waffle glyph
   * (`GridDots20Regular`).
   */
  icon?: ReactElement;

  /** Visual style of the button. Defaults to `'subtle'`. */
  appearance?: ButtonProps['appearance'];

  /** Size of the button. */
  size?: ButtonProps['size'];

  /** Shape of the button. */
  shape?: ButtonProps['shape'];

  /**
   * Suppresses the tooltip without removing it from the tree, so the
   * button element keeps its identity. The launcher sets this while its
   * surface is open so the label does not float over the panel. Defaults
   * to `false`.
   */
  hideTooltip?: boolean;
};
