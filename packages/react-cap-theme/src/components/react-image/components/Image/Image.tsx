import {
  renderImage_unstable,
  useImage_unstable,
  type ImageProps,
} from '@fluentui/react-image';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import { useImageStyles } from './useImageStyles.styles';

export const Image: ForwardRefComponent<ImageProps> = React.forwardRef(
  (props, ref) => {
    const state = useImage_unstable(props, ref);

    useImageStyles(state);
    useCustomStyleHook_unstable('useImageStyles_unstable')(state);

    return renderImage_unstable(state);
  }
);

Image.displayName = 'Image';
