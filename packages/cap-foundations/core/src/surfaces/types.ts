/**
 * Surface type definitions
 *
 * Surfaces are CSS classes that create distinct visual contexts by resetting
 * and overriding design tokens. They solve the accessibility problem of ensuring
 * components remain readable when placed on different backgrounds.
 *
 * The surface system uses a reset/override pattern:
 * 1. Every .surface element resets ALL tokens to page defaults
 * 2. Tonal modifiers (.raised, .sunken, etc.) apply specific overrides
 * 3. Nested surfaces automatically reset - no compounding
 *
 * Usage: <div class="surface raised">...</div>
 */

/**
 * Tonal surfaces - background variations relative to page
 */
export type TonalSurface =
  | 'base'      // Explicit reset to page defaults
  | 'raised'    // Elevated content (cards, panels) - lighter/elevated from page
  | 'sunken'    // Recessed areas (input wells, sidebars) - darker/recessed from page
  | 'soft'      // Subtle backgrounds - slightly muted from page
  | 'softer'    // Very subtle backgrounds - more muted from page
  | 'strong'    // Emphasized sections - higher contrast from page
  | 'stronger'  // Very emphasized sections - highest contrast from page
  | 'inverted'  // Opposite color scheme (tooltips, callouts)
  | 'primary';  // Primary color background (teaching bubbles, branded sections)

/**
 * Container surfaces - static backgrounds for content regions
 * @deprecated Use TonalSurface instead. These will be removed in the next major version.
 */
export type ContainerSurface =
  | 'page'     // Main application background
  | 'card'     // Elevated content containers -> use 'raised'
  | 'overlay'  // Modals, dialogs, sheets -> use 'raised'
  | 'popout'   // Dropdowns, menus, tooltips -> use 'raised' or 'inverted'
  | 'inset';   // Recessed areas -> use 'sunken'

/**
 * Control roles - token prefixes for interactive elements
 * Note: These are token ROLES, not surface classes. Use tokens like --control-bg directly.
 */
export type ControlRole =
  | 'control'          // Default interactive (buttons, list items)
  | 'controlPrimary'   // Primary actions (CTA buttons, selected states)
  | 'controlDanger'    // Destructive actions
  | 'controlSubtle'    // Ghost/minimal buttons, tabs
  | 'controlDisabled'; // Non-interactive state

/**
 * @deprecated Use ControlRole instead - controls are token roles, not surfaces
 */
export type ControlSurface = ControlRole;

/**
 * Feedback surfaces - status communication
 */
export type FeedbackSurface =
  | 'success'  // Positive outcomes, confirmations
  | 'warning'  // Caution, attention needed
  | 'danger'   // Errors, destructive states
  | 'info';    // Informational, neutral status

/**
 * All surface types (tonal + feedback)
 * Note: ControlRole is not included as controls use tokens directly, not surface classes
 */
export type SurfaceType = TonalSurface | FeedbackSurface;

/**
 * All standard surfaces
 * @deprecated Use SurfaceType instead
 */
export type Surface = ContainerSurface | ControlSurface | FeedbackSurface;

/**
 * Surface token properties
 */
export interface SurfaceTokens {
  // Background
  bg: string;
  'bg-hover'?: string;
  'bg-pressed'?: string;
  'bg-focus'?: string;

  // Text
  text: string;
  'text-soft'?: string;
  'text-softer'?: string;
  'text-strong'?: string;
  'text-stronger'?: string;
  'text-hover'?: string;
  'text-pressed'?: string;

  // Border
  border: string;
  'border-soft'?: string;
  'border-strong'?: string;
  'border-stronger'?: string;
  'border-hover'?: string;
  'border-pressed'?: string;
  'border-focus'?: string;

  // Shadow
  shadow?: string;

  // Icon (for feedback surfaces)
  icon?: string;
}

/**
 * Surface state modifiers
 */
export type SurfaceState = 'hover' | 'pressed' | 'focus' | 'selected' | 'disabled';

/**
 * Component shortcut tokens
 */
export interface ComponentTokens {
  '--button-padding-x': string;
  '--button-padding-y': string;
  '--button-radius': string;
  '--input-height': string;
  '--input-padding-x': string;
  '--card-padding': string;
  '--modal-padding': string;
  '--avatar-size-sm': string;
  '--avatar-size-md': string;
  '--avatar-size-lg': string;
}

/**
 * Special tokens (focus, selection, links, scrollbar)
 */
export interface SpecialTokens {
  '--focus-ring': string;
  '--focus-ring-offset': string;
  '--focus-ring-width': string;
  '--selection-bg': string;
  '--selection-text': string;
}
