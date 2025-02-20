import * as React from 'react';
import type { STRICT_SYMBOL } from './STRICT_SYMBOL';
import type { GriffelStyle } from '@fluentui/react-components';

export interface StrictCssClass<TExtension = DefaultStrictStyles> {
  /**
   * @returns CSS class string
   */
  toString: () => string;
  DO_NOT_USE_OR_YOU_WILL_BE_FIRED: typeof STRICT_SYMBOL;
  /**
   * This field is only used to allow style extensions for components
   */
  overrideFilter?: TExtension;
}

export type DefaultStrictStyles = Pick<
  GriffelStyle,
  | 'marginInline'
  | 'marginBlock'
  | 'marginInlineStart'
  | 'marginInlineEnd'
  | 'marginBlockStart'
  | 'marginBlockEnd'
  | 'opacity'
  | 'visibility'
  | 'alignSelf'
>;

/**
 * Allow list for CSS properties - add to this cautiously
 */
export type StrictStyles<TExtension = DefaultStrictStyles> =
  DefaultStrictStyles & TExtension;

type BaseComponenType = React.JSXElementConstructor<{
  className?: StrictCssClass;
}>;

type ExtractStrictStyleOverrides<TComponent extends BaseComponenType> =
  NonNullable<
    NonNullable<React.ComponentProps<TComponent>['className']>['overrideFilter']
  >;

export type MakeStrictStyles = <
  TComponent extends BaseComponenType,
  Slots extends string = string
>(
  styles: Record<Slots, StrictStyles<ExtractStrictStyleOverrides<TComponent>>>
) => () => Record<
  Slots,
  StrictCssClass<ExtractStrictStyleOverrides<TComponent>>
>;

export type MergeStrictClasses = (
  ...strictClasses: StrictCssClass[]
) => StrictCssClass;
