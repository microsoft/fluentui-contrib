import * as React from 'react';
import { useDataGrid_unstable } from './useDataGrid';
import { renderDataGrid_unstable } from './renderDataGrid';
import {
  useDataGridStyles_unstable,
  useDataGridContextValues_unstable,
  DataGridProps,
} from '@fluentui/react-components';

export const DataGrid = React.forwardRef<HTMLDivElement, DataGridProps>(
  (props, ref) => {
    const state = useDataGrid_unstable(props, ref);

    useDataGridStyles_unstable(state);

    return renderDataGrid_unstable(
      state,
      useDataGridContextValues_unstable(state)
    );
  }
);

DataGrid.displayName = 'DataGrid';
