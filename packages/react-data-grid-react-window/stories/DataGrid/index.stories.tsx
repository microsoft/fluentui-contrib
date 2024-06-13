import { Meta } from '@storybook/react';
import { DataGrid } from '@fluentui-contrib/react-data-grid-react-window';
export { VirtualizedDataGrid } from './VirtualizedDataGrid.stories';
export { ReactWindowOverrides } from './ReactWindowOverrides.stories';
export { DataGridScrollingIndicators } from './DataGridScrollingIndicators.stories';

const meta: Meta<typeof DataGrid> = {
  component: DataGrid,
};

export default meta;
