import * as React from 'react';
import {
  useDataGridRowStyles_unstable,
  renderDataGridRow_unstable,
  DataGridRowProps,
} from '@fluentui/react-components';
import type { ForwardRefComponent } from '@fluentui/react-components';
import { useDataGridRow_unstable } from './useDataGridRow.styles';

/**
 * DataGridRow component
 */
export const DataGridRow: ForwardRefComponent<DataGridRowProps> &
  (<TItem>(props: DataGridRowProps<TItem>) => JSX.Element) = React.forwardRef(
  (props, ref) => {
    const state = useDataGridRow_unstable(props, ref);

    useDataGridRowStyles_unstable(state);
    return renderDataGridRow_unstable(state);
  }
) as ForwardRefComponent<DataGridRowProps> &
  (<TItem>(props: DataGridRowProps<TItem>) => JSX.Element);

DataGridRow.displayName = 'DataGridRow';
