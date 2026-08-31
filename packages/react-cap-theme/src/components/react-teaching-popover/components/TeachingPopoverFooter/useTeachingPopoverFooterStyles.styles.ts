import { teachingPopoverFooterClassNames } from '@fluentui/react-teaching-popover';
import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import type { ButtonState } from '../../../react-button';
import type { TeachingPopoverFooterState } from './TeachingPopoverFooter.types';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  vertical: {
    flexDirection: 'column',
  },
  buttonVertical: {
    width: 'auto',
  },
});

export const useTeachingPopoverFooterStyles = (
  state: TeachingPopoverFooterState
): TeachingPopoverFooterState => {
  const styles = useStyles();
  const isVertical = state.footerLayout === 'vertical';

  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    isVertical ? styles.vertical : styles.horizontal,
    getSlotClassNameProp_unstable(state.root)
  );

  // TEMPORARY: this defaulting belongs in a CAP-owned
  // `useTeachingPopoverFooter_unstable` override (the same way SP handles it,
  // using `slot.always` / `slot.optional` `defaultProps`). Until CAP can ship
  // its own state hook for `TeachingPopoverFooter`, we approximate that
  // behavior here in the styles hook.
  //
  // We can only intercept the styles hook (not `useTeachingPopoverFooter_unstable`),
  // so we emulate slot `defaultProps` here. The trick: Fluent's hook applies its own
  // defaults via `slot.always` / `slot.optional`, which means we can detect "consumer
  // didn't pass an appearance" by checking whether the current value matches Fluent's
  // default. If it matches, it's safe to override with the CAP default; otherwise
  // the consumer provided an explicit value and we leave it alone.
  //
  // Limitation of this temporary approach: if a consumer explicitly passes the same
  // value as Fluent's default (e.g. `appearance: 'primary'` on the secondary slot
  // of a brand popover), we can't distinguish it from the default and will still
  // override it. Moving this logic into a proper `useTeachingPopoverFooter` hook
  // would fix that, since we'd have access to the original `props` before defaults
  // are applied.
  //
  // Fluent defaults from `useTeachingPopoverFooter_unstable`:
  //   brand:     primary = undefined,  secondary = 'primary'
  //   non-brand: primary = 'primary',  secondary = undefined
  //
  // CAP defaults we want to apply:
  //   brand:     primary = 'secondary', secondary = 'tint'
  //   non-brand: primary = 'primary',   secondary = 'outline'
  //
  // The `as ButtonState` cast widens the slot's `appearance` to CAP's union.
  // Fluent's `useTeachingPopoverFooter_unstable` produces slots typed against
  // Fluent's `Button`, whose `appearance` union doesn't include SP-specific values
  // like `'tint'` or `'outline'`. CAP's `ButtonState` (imported above) does, and
  // CAP's `useButtonStyles` handles them at runtime.
  const primarySlot = state.primary as ButtonState;
  const secondarySlot = state.secondary as ButtonState | undefined;
  const isBrand = state.appearance === 'brand';

  if (isBrand && primarySlot.appearance === undefined) {
    primarySlot.appearance = 'secondary';
  }

  if (secondarySlot) {
    if (isBrand && secondarySlot.appearance === 'primary') {
      secondarySlot.appearance = 'tint';
    } else if (!isBrand && secondarySlot.appearance === undefined) {
      secondarySlot.appearance = 'outline';
    }
  }

  // NOTE: we intentionally do NOT merge `state.primary.className` /
  // `state.secondary.className` here. Fluent's `useTeachingPopoverFooterStyles_unstable`
  // pre-applies button-shaping classes (`min-width: 96px`, `border-radius: 4px`,
  // brand color overrides) to those slots. Those classes are then passed as the
  // `className` prop on the rendered <Button> and end up re-applied LAST in the
  // cascade inside CAP's `useButtonStyles` (via `getSlotClassNameProp_unstable`),
  // overriding CAP's button styles.
  // We keep only the global identifier class (`fui-TeachingPopoverFooter__primary`
  // / `__secondary`) so consumers can still target the slots with CSS selectors.
  state.primary.className = mergeClasses(
    teachingPopoverFooterClassNames.primary,
    isVertical && styles.buttonVertical,
    getSlotClassNameProp_unstable(state.primary)
  );

  if (state.secondary) {
    state.secondary.className = mergeClasses(
      teachingPopoverFooterClassNames.secondary,
      isVertical && styles.buttonVertical,
      getSlotClassNameProp_unstable(state.secondary)
    );
  }

  return state;
};
