import * as React from 'react';

export type DataAttributeProps = { [key: `data-${string}`]: string };
export type SafeAriaAttributeProps = Pick<
  React.AriaAttributes,
  'aria-label' | 'aria-labelledby' | 'aria-describedby'
>;

export type StrictSlotShorthand = JSX.Element | string | undefined | null;

export interface StrictSlotLonghand
  extends DataAttributeProps,
    SafeAriaAttributeProps {
  children?: StrictSlotShorthand;
}

/**
 * Simple type that defines the bare minimum support for slots in this package. Core principles
 * 1. Slot shorthands are always JSX elements
 * 2. Slot longhands are always objects with children as JSX elements
 * 3. Slot longhand extensions must be explicit based on a component's requirements
 * 4. Avoid generalizing default longhand properties early
 */
export type StrictSlot<TLonghandExtension extends object = object> =
  | StrictSlotShorthand
  | (StrictSlotLonghand & TLonghandExtension);
