import * as React from 'react';
import { getSlots, useFluent } from '@fluentui/react-components';
import type {
  DataGridBodyState,
  DataGridBodySlots,
} from './DataGridBody.types';
import { FixedSizeList as List } from 'react-window';

/**
 * Render the final JSX of DataGridVirtualizedBody
 */
export const renderDataGridBody_unstable = (
  state: DataGridBodyState
): JSX.Element => {
  const { slots, slotProps } = getSlots<DataGridBodySlots>(state);
  const { dir } = useFluent();

  return (
    <slots.root {...slotProps.root}>
      <List
        itemSize={state.itemSize}
        width={state.width}
        itemData={state.rows}
        height={state.height}
        itemCount={state.rows.length}
        direction={dir}
        outerRef={state.outerRef}
        {...state.listProps}
      >
        {state.virtualizedRow}
      </List>
    </slots.root>
  );
};
