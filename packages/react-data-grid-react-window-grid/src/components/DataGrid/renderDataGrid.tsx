import * as React from 'react';
import {
  renderDataGrid_unstable as renderDataGridBase,
  DataGridContextValues,
} from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { HeaderListRefContextProvider } from '../../contexts/headerListRefContext';
import { BodyRefContextProvider } from '../../contexts/bodyRefContext';
import { DataGridState } from './DataGrid.types';
/**
 * Render the final JSX of DataGrid
 */
export const renderDataGrid_unstable = (
  state: DataGridState,
  contextValues: DataGridContextValues
): JSXElement => {
  return (
    <HeaderListRefContextProvider value={state.headerRef}>
      <BodyRefContextProvider value={state.bodyRef}>
        {renderDataGridBase(state, contextValues)}
      </BodyRefContextProvider>
    </HeaderListRefContextProvider>
  );
};
