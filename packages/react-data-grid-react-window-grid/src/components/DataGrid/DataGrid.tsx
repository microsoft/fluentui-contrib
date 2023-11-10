import * as React from 'react';
import { useDataGrid_unstable } from './useDataGrid';
import {
  renderDataGrid_unstable,
  useDataGridStyles_unstable,
  useDataGridContextValues_unstable,
  DataGridProps,
} from '@fluentui/react-components';
import { HeaderListRefContextProvider } from '../../contexts/headerListRefContext';
import { FixedSizeGrid, FixedSizeList } from 'react-window';
import { BodyRefContextProvider } from '../../contexts/bodyRefContext';

export const DataGrid = React.forwardRef<HTMLDivElement, DataGridProps>(
  (props, ref) => {
    const headerRef = React.useRef<FixedSizeList>(null);
    const bodyRef = React.useRef<FixedSizeGrid>(null);
    const state = useDataGrid_unstable(props, ref);

    useDataGridStyles_unstable(state);
    return (
      <HeaderListRefContextProvider value={headerRef}>
        <BodyRefContextProvider value={bodyRef}>
        {renderDataGrid_unstable(
          state,
          useDataGridContextValues_unstable(state)
        )}
        </BodyRefContextProvider>
      </HeaderListRefContextProvider>
    );
  }
);

DataGrid.displayName = 'DataGrid';
