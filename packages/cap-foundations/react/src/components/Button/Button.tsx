import * as React from 'react';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

/**
 * Button — interactive control for triggering actions or navigating.
 *
 * Surfaces used:
 *   strong (default), primary, danger, base (ghost)
 *
 * Tokens used:
 *   --strong-bg, --strong-fg, --strong-border (+ -hover, -pressed, -disabled, -softer)
 *   --primary-bg, --primary-fg, --primary-border (+ hover/pressed/disabled variants)
 *   --danger-bg, --danger-fg, --danger-border (+ hover/pressed/disabled variants)
 *   --base-bg, --base-fg, --base-border (+ hover/pressed/disabled variants)
 *   --control-height-sm/md/lg, --button-padding-x, --button-radius
 *   --space-3, --space-6 (sm/lg padding)
 *   --font-sans, --text-sm/base/lg, --weight-medium
 *   --duration-fast, --ease-default
 *   --focus-ring, --focus-ring-width, --focus-ring-offset
 */

export type ButtonVariant = 'default' | 'primary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

// ---------------------------------------------------------------------------
// Internal spinner (used when loading=true)
// ---------------------------------------------------------------------------

function ButtonSpinner(): React.ReactElement {
  return (
    <svg
      className={styles.spinner}
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
      <path d="M8 2a6 6 0 0 1 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ButtonBaseProps {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size matching standard control heights: sm=28px, md=36px, lg=44px */
  size?: ButtonSize;
  /** Leading icon slot — accepts any ReactNode (e.g. <AddRegular /> from @fluentui/react-icons) */
  icon?: ReactNode;
  /** Trailing icon slot */
  iconAfter?: ReactNode;
  /** Shows a loading spinner in the leading slot and disables interaction */
  loading?: boolean;
  /** Whether the control is disabled */
  disabled?: boolean;
  /** Stretch to fill its container */
  fullWidth?: boolean;
  /** Button label / content */
  children?: ReactNode;
}

/** Renders as a <button> element (default) */
export interface ButtonAsButtonProps
  extends ButtonBaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  as?: 'button';
  href?: never;
}

/** Renders as an <a> element — requires href */
export interface ButtonAsAnchorProps
  extends ButtonBaseProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> {
  as: 'a';
  href: string;
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Button(props: ButtonProps): React.ReactElement {
  const {
    as,
    variant = 'default',
    size = 'md',
    icon,
    iconAfter,
    loading = false,
    disabled = false,
    fullWidth = false,
    className,
    children,
    ...rest
  } = props;

  const isDisabled = disabled || loading;

  const classNames = [
    styles.root,
    styles[variant],
    styles[size],
    isDisabled && styles.disabled,
    loading && styles.loading,
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const leadingIcon = loading ? <ButtonSpinner /> : icon;

  const iconBefore = leadingIcon ? (
    <span className={styles.iconSlot} aria-hidden="true">
      {leadingIcon}
    </span>
  ) : null;

  // Hide trailing icon while loading to keep the visual clean
  const iconTrailing = iconAfter && !loading ? (
    <span className={styles.iconSlot} aria-hidden="true">
      {iconAfter}
    </span>
  ) : null;

  if (as === 'a') {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string };
    return (
      <a
        className={classNames}
        href={isDisabled ? undefined : href}
        aria-disabled={isDisabled || undefined}
        tabIndex={isDisabled ? -1 : undefined}
        onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => {
          // Anchors handle Enter natively; add Space support to match button behavior
          if (e.key === ' ' && !isDisabled) {
            e.preventDefault();
            e.currentTarget.click();
          }
          (anchorRest as AnchorHTMLAttributes<HTMLAnchorElement>).onKeyDown?.(e);
        }}
        {...(anchorRest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {iconBefore}
        {children}
        {iconTrailing}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classNames}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {iconBefore}
      {children}
      {iconTrailing}
    </button>
  );
}

Button.displayName = 'Button';
