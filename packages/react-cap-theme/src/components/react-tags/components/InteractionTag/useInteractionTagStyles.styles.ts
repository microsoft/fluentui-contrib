import type { InteractionTagState } from '@fluentui/react-tags';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/tokens';
import { capTokens } from '../../../tokens/tokens';

/**
 * Base reset styles for the InteractionTag root slot.
 * Self-contained — replaces Fluent's useInteractionTagStyles_unstable entirely.
 */
const useRootBaseClassName = makeResetStyles({
  display: 'inline-flex',
  alignItems: 'center',
  boxSizing: 'border-box',
  width: 'fit-content',
});

const useRootStyles = makeStyles({
  medium: {
    height: '36px',
    borderRadius: capTokens.borderRadius2XLarge,
  },
  small: {
    height: '24px',
    borderRadius: tokens.borderRadiusXLarge,
  },
  'extra-small': {
    height: '20px',
    borderRadius: tokens.borderRadiusLarge,
  },

  // Shape — `rounded` (default) is already covered by the per-size styles above.
  // `circular` overrides the radius for backward-compat with Fluent's `shape` prop.
  circular: {
    borderRadius: tokens.borderRadiusCircular,
  },
});

/**
 * Apply styling to the SharePoint InteractionTag component.
 * @param state - The InteractionTag state object
 * @returns The styled InteractionTag state
 * @alpha
 */
export const useInteractionTagStyles = (
  state: InteractionTagState
): InteractionTagState => {
  'use no memo';

  const rootBaseClassName = useRootBaseClassName();
  const rootStyles = useRootStyles();

  const { shape, size } = state;

  state.root.className = mergeClasses(
    state.root.className,
    rootBaseClassName,
    rootStyles[size],
    shape === 'circular' && rootStyles.circular,
    getSlotClassNameProp_unstable(state.root)
  );

  return state;
};
