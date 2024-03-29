import * as React from 'react';
import { useDataGridRowStyles_unstable } from '@fluentui/react-components';
import type {
  DataGridRowState,
  ForwardRefComponent,
} from '@fluentui/react-components';
import { useDataGridHeaderRow_unstable } from './useDataGridHeaderRow';
import { renderDataGridHeaderRow_unstable } from './renderDataGridHeaderRow';
import { DataGridHeaderRowProps } from './DataGridHeaderRow.types';

/**
 * DataGridHeaderRow component
 */
export const DataGridHeaderRow: ForwardRefComponent<DataGridHeaderRowProps> &
  (<TItem>(props: DataGridHeaderRowProps<TItem>) => JSX.Element) =
  React.forwardRef((props, ref) => {
    const state = useDataGridHeaderRow_unstable(props, ref);

    useDataGridRowStyles_unstable(state as unknown as DataGridRowState);
    return renderDataGridHeaderRow_unstable(state);
  }) as ForwardRefComponent<DataGridHeaderRowProps> &
    (<TItem>(props: DataGridHeaderRowProps<TItem>) => JSX.Element);

DataGridHeaderRow.displayName = 'DataGridHeaderRow';
