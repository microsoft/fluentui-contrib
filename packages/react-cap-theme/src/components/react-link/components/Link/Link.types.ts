import type {
  LinkProps as FluentLinkProps,
  LinkState as FluentLinkState,
  LinkSlots,
} from '@fluentui/react-link';
import type { ComponentProps } from '@fluentui/react-utilities';

export type LinkProps = ComponentProps<LinkSlots> &
  Omit<FluentLinkProps, 'appearance'> & {
    appearance?: 'default' | 'subtle' | 'inverted';
    bold?: boolean;
  };

export type LinkState = Omit<FluentLinkState, 'appearance'> &
  Required<Pick<LinkProps, 'appearance' | 'bold'>>;
