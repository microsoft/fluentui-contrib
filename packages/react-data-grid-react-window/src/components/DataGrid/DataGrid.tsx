import * as React from 'react';
import { useDataGrid_unstable } from './useDataGrid';
import { renderDataGrid_unstable } from './renderDataGrid';

import {
  useDataGridContextValues_unstable,
  DataGridProps,
} from '@fluentui/react-components';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useDataGridStyles_unstable } from './useDataGridStyles.styles';

export const DataGrid: ForwardRefComponent<DataGridProps> = React.forwardRef(
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
