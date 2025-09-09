import * as React from 'react';
import { getSlots } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import type {
  DataGridBodyState,
  DataGridBodySlots,
} from './DataGridBody.types';
import { VariableSizeGrid as Grid } from 'react-window';
import { dataGridBodyGridClassName } from './useDataGridBodyStyles.styles';

/**
 * Render the final JSX of DataGridVirtualizedBody
 */
export const renderDataGridBody_unstable = (
  state: DataGridBodyState
): JSXElement => {
  const { slots, slotProps } = getSlots<DataGridBodySlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <Grid
        className={dataGridBodyGridClassName}
        ref={state.gridRef}
        rowHeight={state.rowHeight}
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
