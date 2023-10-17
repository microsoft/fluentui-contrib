import * as React from 'react';
import { getSlots } from '@fluentui/react-components';
import type {
  DataGridBodyState,
  DataGridBodySlots,
} from './DataGridBody.types';
import { FixedSizeGrid as Grid } from 'react-window';

/**
 * Render the final JSX of DataGridVirtualizedBody
 */
export const renderDataGridBody_unstable = (state: DataGridBodyState) => {
  const { slots, slotProps } = getSlots<DataGridBodySlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <Grid
        rowHeight={state.itemSize}
        columnCount={state.columns.length}
        columnWidth={state.columnWidth}
        width={state.width}
        height={state.height}
        itemData={state.rows}
        rowCount={state.rows.length}
        {...state.gridProps}
      >
        {state.virtualizedCell}
      </Grid>
    </slots.root>
  );
};
