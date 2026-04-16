import { useLink_unstable as useBaseLink } from '@fluentui/react-link';
import type * as React from 'react';
import type { LinkProps, LinkState } from './Link.types';
import { toBaseProps } from './Link.utils';

export const useLink = (
  props: LinkProps,
  ref: React.Ref<HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement>
): LinkState => {
  const { bold = false, ...restProps } = props;

  return {
    ...useBaseLink(toBaseProps(restProps), ref),
    appearance: restProps.appearance ?? 'default',
    bold,
  };
};
