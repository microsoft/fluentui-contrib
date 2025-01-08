import * as React from 'react';
import {
  DataGridContextValues,
  renderDataGrid_unstable as baseRender,
} from '@fluentui/react-components';
import { HeaderRefContextProvider } from '../../contexts/headerRefContext';
import { BodyRefContextProvider } from '../../contexts/bodyRefContext';
import { DataGridState } from './DataGrid.types';

/**
 * Render the final JSX of DataGrid
 */
export const renderDataGrid_unstable = (
  state: DataGridState,
  contextValues: DataGridContextValues
) => {
  return (
    <HeaderRefContextProvider value={state.headerRef}>
      <BodyRefContextProvider value={state.bodyRef}>
        {baseRender(state, contextValues)}
      </BodyRefContextProvider>
    </HeaderRefContextProvider>
  );
};
