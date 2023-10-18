/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { ColumnIdContextProvider, type DataGridRowSlots, useFluent, getSlots } from '@fluentui/react-components';
import { FixedSizeList as List } from 'react-window';
import { DataGridHeaderRowState } from './DataGridHeaderRow.types';

/**
 * Render the final JSX of DataGridHeaderRow
 */
export const renderDataGridHeaderRow_unstable = (state: DataGridHeaderRowState) => {
  const { slots, slotProps } = getSlots<DataGridRowSlots>(state);
  const { dir } = useFluent();
  const layout = 'horizontal';

  return (
    <slots.root {...slotProps.root}>
        {slots.selectionCell && <slots.selectionCell {...slotProps.selectionCell} />}
        {
            <List
                itemSize={state.itemSize}
                width={state.width}
                itemData={state.columnDefs}
                height={state.height}
                itemCount={state.columnDefs.length}
                direction={dir}
                layout={layout}
                {...state.listProps}
                style={{overflow: 'hidden'}}
                >
                {state.virtualizedCell}
            </List>
        }
    </slots.root>
  );
};
