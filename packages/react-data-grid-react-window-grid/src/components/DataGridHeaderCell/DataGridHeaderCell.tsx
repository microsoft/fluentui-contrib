import * as React from 'react';
import {
  useDataGridHeaderCell_unstable,
  useDataGridHeaderCellStyles_unstable,
  DataGridHeaderCellProps,
  renderDataGridHeaderCell_unstable,
} from '@fluentui/react-components';

export const DataGridHeaderCell = React.forwardRef<
  HTMLDivElement,
  DataGridHeaderCellProps
>((props, ref) => {
  const state = useDataGridHeaderCell_unstable(props, ref);

  useDataGridHeaderCellStyles_unstable(state);

  return renderDataGridHeaderCell_unstable(state);
});

DataGridHeaderCell.displayName = 'DataGridHeaderCell';
