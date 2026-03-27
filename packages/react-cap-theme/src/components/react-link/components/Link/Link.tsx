import { renderLink_unstable } from '@fluentui/react-link';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import type { LinkProps } from './Link.types';
import { toBaseState } from './Link.utils';
import { useLink } from './useLink';
import { useLinkStyles } from './useLinkStyles.styles';

export const Link: ForwardRefComponent<LinkProps> = React.forwardRef(
  (props, ref) => {
    const state = useLink(props, ref);

    useLinkStyles(state);
    useCustomStyleHook_unstable('useLinkStyles_unstable')(state);

    return renderLink_unstable(toBaseState(state));
  }
);

Link.displayName = 'Link';
