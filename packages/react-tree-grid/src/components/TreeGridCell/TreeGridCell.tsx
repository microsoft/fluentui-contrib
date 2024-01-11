import * as React from 'react';
import {
  mergeClasses,
  useTableCell_unstable,
  TableCellState,
  useTableCellStyles_unstable,
} from '@fluentui/react-components';

export type TreeGridCellProps = JSX.IntrinsicElements['div'];

export const TreeGridCell = React.forwardRef(
  (props: TreeGridCellProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const tableCellState: TableCellState = {
      ...useTableCell_unstable({ as: 'div' }, ref),
      noNativeElements: true,
    };
    useTableCellStyles_unstable(tableCellState);
    return (
      <div
        ref={ref}
        {...props}
        className={mergeClasses(tableCellState.root.className, props.className)}
      />
    );
  }
);
