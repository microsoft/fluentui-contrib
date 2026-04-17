import {
  renderLink_unstable,
  useLinkStyles_unstable,
  type LinkState as FluentLinkState,
} from '@fluentui/react-link';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import { toBaseState } from './Link.utils';
import { useLink } from './useLink';
import type { LinkProps } from '../../../../customStyleHooks/react-link';
import { useLinkStyles as useCAPLinkStyles } from '../../../../customStyleHooks/react-link';

export const Link: ForwardRefComponent<LinkProps> = React.forwardRef(
  (props, ref) => {
    const state = useLink(props, ref);

    useLinkStyles_unstable(state as FluentLinkState);
    useCAPLinkStyles(state);

    return renderLink_unstable(toBaseState(state));
  }
);

Link.displayName = 'Link';
