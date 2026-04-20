import type {
  InputProps as BaseInputProps,
  InputState as BaseInputState,
} from '@fluentui/react-input';

export type InputProps = BaseInputProps & {
  /**
   * The color variant.
   *
   * - 'brand' (default): Primary emphasis using brand colors.
   * - 'neutral': Secondary emphasis using neutral colors.
   *
   * @default 'brand'
   */
  // FIXME: Must not graduate to beta. Style implementation references Fluent tokens directly.
  // `color` and `NeutralThemeProvider` solve the same brand/neutral switching problem at different
  // levels of the stack with no defined interaction. Graduating locks in an API contract that may
  // need to change once a proper token-based theming approach is defined.
  color?: 'brand' | 'neutral';
};

export type InputState = BaseInputState & Required<Pick<InputProps, 'color'>>;
