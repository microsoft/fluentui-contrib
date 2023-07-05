import * as React from 'react';
import { getSlots } from '@fluentui/react-components';
import type {
  DataGridBodyState,
  DataGridBodySlots,
} from './DataGridBody.types';
import { FixedSizeList as List } from 'react-window';

/**
 * Render the final JSX of DataGridVirtualizedBody
 */
export const renderDataGridBody_unstable = (state: DataGridBodyState) => {
  const { slots, slotProps } = getSlots<DataGridBodySlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <List
        itemSize={state.itemSize}
        width={state.width}
        itemData={state.rows}
        height={state.height}
        itemCount={state.rows.length}
      >
        {state.virtualizedRow}
      </List>
    </slots.root>
  );
};
