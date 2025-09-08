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
import {
  TabsterDOMAttribute,
  useMergedTabsterAttributes_unstable,
} from '@fluentui/react-tabster';

export const TreeGridInteraction: ForwardRefComponent<TreeGridInteractionProps> =
  React.forwardRef((props, ref) => {
    const tabsterAttributes = useMergedTabsterAttributes_unstable(
      useFocusableGroup({
        tabBehavior: 'limited-trap-focus',
      }),
      props as unknown as TabsterDOMAttribute
    );

    const Root = slot.always(
      {
        tabIndex: 0,
        role: 'group',
        ref,
        ...props,
        ...tabsterAttributes,
      },
      { elementType: 'div' }
    );

    return <Root />;
  });
