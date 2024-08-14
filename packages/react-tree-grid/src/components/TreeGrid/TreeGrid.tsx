/** @jsxRuntime classic */
/** @jsx createElement */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from '@fluentui/react-jsx-runtime';

import * as React from 'react';
import {
  getIntrinsicElementProps,
  mergeClasses,
  slot,
} from '@fluentui/react-components';
import { TreeGridProps } from './TreeGrid.types';
import { useRowNavigation } from '../../hooks/useRowNavigation';
import {
  TabsterDOMAttribute,
  useMergedTabsterAttributes_unstable,
} from '@fluentui/react-tabster';

export const TreeGrid = React.forwardRef(
  (props: TreeGridProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { onKeyDown, ...tabsterAttributes } = useRowNavigation(props);
    const Root = slot.always(
      getIntrinsicElementProps('div', {
        ref,
        role: 'treegrid',
        ...props,
        ...useMergedTabsterAttributes_unstable(
          tabsterAttributes,
          props as TabsterDOMAttribute
        ),
        onKeyDown,
        className: mergeClasses('fui-TreeGrid', props.className),
      }),
      { elementType: 'div' }
    );
    return <Root />;
  }
);
