import * as React from 'react';
import {
  mergeClasses,
  useTableRowStyles_unstable,
  useTableRow_unstable,
  TableRowState,
} from '@fluentui/react-components';

export type TreeGridRowProps = JSX.IntrinsicElements['div'];

export const TreeGridRow = React.forwardRef(
  (props: TreeGridRowProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const tableRowState: TableRowState = {
      ...useTableRow_unstable({ as: 'div' }, ref),
      noNativeElements: true,
    };
    useTableRowStyles_unstable(tableRowState);
    return (
      <div
        ref={ref}
        {...props}
        className={mergeClasses(tableRowState.root.className, props.className)}
      />
    );
  }
);
