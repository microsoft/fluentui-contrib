import * as React from 'react';
import {
  mergeClasses,
  useArrowNavigationGroup,
  useFocusableGroup,
} from '@fluentui/react-components';
import { useTreeGridRowStyles } from './useTreeGridRowStyles.styles';
import { TreeGridRowProps } from './TreeGridRow.types';
import { useMergedTabsterAttributes_unstable } from '@fluentui/react-tabster';

export const TreeGridRow = React.forwardRef(
  (props: TreeGridRowProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const styles = useTreeGridRowStyles();
    const tabsterAttributes = useMergedTabsterAttributes_unstable(
      useArrowNavigationGroup({
        axis: 'horizontal',
        memorizeCurrent: true,
      }),
      useFocusableGroup({
        tabBehavior: 'limited-trap-focus',
        ignoreDefaultKeydown: { Enter: true },
      })
    );
    return (
      <div
        ref={ref}
        role="row"
        tabIndex={0}
        {...props}
        className={mergeClasses(styles, props.className)}
        {...tabsterAttributes}
      />
    );
  }
);
