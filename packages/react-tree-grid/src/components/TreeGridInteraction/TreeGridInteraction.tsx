/** @jsxRuntime classic */
/** @jsx createElement */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from '@fluentui/react-jsx-runtime';
import * as React from 'react';
import {
  ForwardRefComponent,
  slot,
  useFocusableGroup,
} from '@fluentui/react-components';
import type { TreeGridInteractionProps } from './TreeGridInteraction.types';

export const TreeGridInteraction: ForwardRefComponent<TreeGridInteractionProps> =
  React.forwardRef((props, ref) => {
    const focusableGroupAttribute = useFocusableGroup({
      tabBehavior: 'limited-trap-focus',
    });

    const Root = slot.always(
      {
        tabIndex: 0,
        role: 'group',
        ...focusableGroupAttribute,
        ref,
        ...props,
      },
      { elementType: 'div' }
    );

    return <Root />;
  });
