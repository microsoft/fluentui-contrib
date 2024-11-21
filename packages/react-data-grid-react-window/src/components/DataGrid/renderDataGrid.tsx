import * as React from 'react';
import {
  DataGridContextValues,
  DataGridState,
  renderDataGrid_unstable as baseRender,
} from '@fluentui/react-components';
import { HeaderRefContextProvider } from '../../contexts/headerRefContext';
import { BodyRefContextProvider } from '../../contexts/bodyRefContext';

/**
 * Render the final JSX of DataGrid
 */
export const renderDataGrid_unstable = (
  state: DataGridState,
  contextValues: DataGridContextValues
) => {
  const headerRef = React.useRef<HTMLDivElement | null>(null);
  const bodyRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <HeaderRefContextProvider value={headerRef}>
      <BodyRefContextProvider value={bodyRef}>
        {baseRender(state, contextValues)}
      </BodyRefContextProvider>
    </HeaderRefContextProvider>
  );
};
