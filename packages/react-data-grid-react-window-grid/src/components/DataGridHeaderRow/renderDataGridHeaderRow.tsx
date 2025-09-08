import * as React from 'react';
import {
  type DataGridRowSlots,
  useFluent,
  getSlots,
} from '@fluentui/react-components';
import { VariableSizeList as List } from 'react-window';
import { DataGridHeaderRowState } from './DataGridHeaderRow.types';

export const dataGridHeaderListClassName =
  'fui-DataGridReactWindowGridHeader__list';

/**
 * Render the final JSX of DataGridHeaderRow
 */
export const renderDataGridHeaderRow_unstable = (
  state: DataGridHeaderRowState
): JSX.Element => {
  const { slots, slotProps } = getSlots<DataGridRowSlots>(state);
  const { dir } = useFluent();
  const layout = 'horizontal';

  return (
    <slots.root {...slotProps.root}>
      {slots.selectionCell && (
        <slots.selectionCell {...slotProps.selectionCell} />
      )}
      {
        <List
          className={dataGridHeaderListClassName}
          ref={state.listRef}
          itemSize={state.itemSize}
          width={state.width}
          itemData={state.columnDefs}
          height={state.height}
          itemCount={state.columnDefs.length}
          direction={dir}
          layout={layout}
          {...state.listProps}
          style={{ overflow: 'hidden' }}
          onScroll={state.onScroll}
        >
          {state.virtualizedCell}
        </List>
      }
    </slots.root>
  );
};
