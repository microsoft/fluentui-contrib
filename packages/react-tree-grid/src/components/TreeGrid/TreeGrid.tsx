import * as React from 'react';
import {
  getIntrinsicElementProps,
  mergeClasses,
  slot,
} from '@fluentui/react-components';
import { TreeGridProps } from './TreeGrid.types';
import { useRowNavigation } from '../../hooks/useRowNavigation';

export const TreeGrid = React.forwardRef(
  (props: TreeGridProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const navigationProps = useRowNavigation(props);
    const Root = slot.always(
      getIntrinsicElementProps('div', {
        ref,
        role: 'treegrid',
        ...props,
        ...navigationProps,
        className: mergeClasses('fui-TreeGrid', props.className),
      }),
      { elementType: 'div' }
    );
    return <Root />;
  }
);
