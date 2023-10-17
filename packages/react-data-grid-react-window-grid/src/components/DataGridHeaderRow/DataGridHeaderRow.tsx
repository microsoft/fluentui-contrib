import * as React from 'react';
import {
  useDataGridRowStyles_unstable,
  DataGridRowProps,
} from '@fluentui/react-components';
import type { ForwardRefComponent } from '@fluentui/react-components';
import { useDataGridHeaderRow_unstable } from './useDataGridHeaderRow';
import { renderDataGridHeaderRow_unstable } from './renderDataGridHeaderRow';
import { DataGridHeaderRowProps } from './DataGridHeaderRow.types';
import { useDataGridHeaderRowStyles_unstable } from './useDataGridHeaderRowStyles.styles';

/**
 * DataGridRow component
 */
export const DataGridHeaderRow: ForwardRefComponent<DataGridHeaderRowProps> &
  (<TItem>(props: DataGridHeaderRowProps<TItem>) => JSX.Element) = React.forwardRef(
  (props, ref) => {
    const state = useDataGridHeaderRow_unstable(props, ref);

    useDataGridHeaderRowStyles_unstable(state);
    return renderDataGridHeaderRow_unstable(state);
  }
) as ForwardRefComponent<DataGridRowProps> &
  (<TItem>(props: DataGridRowProps<TItem>) => JSX.Element);

  DataGridHeaderRow.displayName = 'DataGridHeaderRow';
