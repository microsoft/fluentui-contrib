import * as React from 'react';
import {
  renderDataGrid_unstable as renderDataGridBase,
  DataGridState,
  DataGridContextValues,
} from '@fluentui/react-components';
import { HeaderListRefContextProvider } from '../../contexts/headerListRefContext';
import { FixedSizeGrid, FixedSizeList } from 'react-window';
import { BodyRefContextProvider } from '../../contexts/bodyRefContext';
/**
 * Render the final JSX of DataGrid
 */
export const renderDataGrid_unstable = (
  state: DataGridState,
  contextValues: DataGridContextValues
) => {
  const headerRef = React.useRef<FixedSizeList>(null);
  const bodyRef = React.useRef<FixedSizeGrid>(null);
  return (
    <HeaderListRefContextProvider value={headerRef}>
      <BodyRefContextProvider value={bodyRef}>
        {renderDataGridBase(state, contextValues)}
      </BodyRefContextProvider>
    </HeaderListRefContextProvider>
  );
};
