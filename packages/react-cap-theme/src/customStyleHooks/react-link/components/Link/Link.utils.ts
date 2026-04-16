import type {
  LinkProps as FluentLinkProps,
  LinkState as FluentLinkState,
} from '@fluentui/react-link';
import type { LinkProps, LinkState } from './Link.types';

export const baseAppearanceMap: Record<
  NonNullable<LinkProps['appearance']>,
  FluentLinkProps['appearance']
> = {
  default: 'default',
  subtle: 'subtle',
  inverted: 'default', // custom styles applied separately
};

export const toBaseProps = (
  props: Omit<LinkProps, 'bold'>
): FluentLinkProps => {
  const { appearance, ...restProps } = props;
  return {
    ...restProps,
    appearance:
      appearance !== undefined ? baseAppearanceMap[appearance] : undefined,
  } as FluentLinkProps;
};

export const toBaseState = (state: LinkState): FluentLinkState =>
  ({
    ...state,
    appearance: baseAppearanceMap[state.appearance] ?? 'default',
  } as FluentLinkState);
