import type { STRICT_SYMBOL } from './STRICT_SYMBOL';
import type { GriffelStyle } from '@fluentui/react-components';

export interface StrictCssClass {
  /**
   * @returns CSS class string
   */
  toString: () => string;
  DO_NOT_USE_OR_YOU_WILL_BE_FIRED: typeof STRICT_SYMBOL;
}

/**
 * Allow list for CSS properties - add to this cautiously
 */
export type StrictStyles = Pick<
  GriffelStyle,
  | 'marginInline'
  | 'marginBlock'
  | 'marginInlineStart'
  | 'marginInlineEnd'
  | 'marginBlockStart'
  | 'marginBlockEnd'
  | 'opacity'
  | 'visibility'
  | 'display'
  | 'position'
  | 'alignSelf'
>;

export type MakeStrictStyles = <Slots extends string>(
  styles: Record<Slots, StrictStyles>
) => () => Record<Slots, StrictCssClass>;

export type MergeStrictClasses = (
  ...strictClasses: StrictCssClass[]
) => StrictCssClass;
