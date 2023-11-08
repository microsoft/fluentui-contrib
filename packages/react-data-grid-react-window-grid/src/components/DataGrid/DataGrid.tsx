import * as React from 'react';
import { useDataGrid_unstable } from './useDataGrid';
import {
  renderDataGrid_unstable,
  useDataGridStyles_unstable,
  useDataGridContextValues_unstable,
  DataGridProps,
} from '@fluentui/react-components';
import { HeaderListRefContextProvider } from '../../contexts/headerListRefContext';

export const DataGrid = React.forwardRef<HTMLDivElement, DataGridProps>(
  (props, ref) => {
    const headerRef = React.useRef<HTMLDivElement | null>(null);
    const state = useDataGrid_unstable(props, ref);

    useDataGridStyles_unstable(state);
    return (
      <HeaderListRefContextProvider value={headerRef}>
        {renderDataGrid_unstable(
          state,
          useDataGridContextValues_unstable(state)
        )}
      </HeaderListRefContextProvider>
    );
  }
);

DataGrid.displayName = 'DataGrid';
