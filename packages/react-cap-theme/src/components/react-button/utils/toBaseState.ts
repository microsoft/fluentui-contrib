import type { ButtonProps as BaseButtonProps } from '@fluentui/react-button';
import type { ButtonAppearance } from '../../../customStyleHooks/react-button';

export const baseAppearanceMap: Record<
  ButtonAppearance,
  BaseButtonProps['appearance']
> = {
  secondary: 'secondary',
  primary: 'primary',
  outline: 'outline',
  subtle: 'subtle',
  transparent: 'transparent',
  tint: 'primary',
};

/**
 * Maps a CAP state's `appearance` to a base Fluent UI appearance.
 *
 * Shallow spread — slot objects (root, icon, etc.) remain shared references,
 * so className mutations by base Fluent style hooks propagate to the original state.
 */
export const toBaseState = <S extends { appearance: ButtonAppearance }>(
  state: S
): S & { appearance: BaseButtonProps['appearance'] } => ({
  ...state,
  appearance: baseAppearanceMap[state.appearance] ?? 'secondary',
});
