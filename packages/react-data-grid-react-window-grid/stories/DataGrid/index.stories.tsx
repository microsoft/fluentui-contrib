import * as React from 'react';
import { Meta } from '@storybook/react';
import { DataGrid } from '@fluentui-contrib/react-data-grid-react-window-grid';
export { VirtualizedDataGrid } from './VirtualizedDataGrid.stories';

const meta: Meta<typeof DataGrid> = {
  component: DataGrid,
};

export default meta;
