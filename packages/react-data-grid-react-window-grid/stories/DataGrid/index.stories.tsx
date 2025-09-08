import { Meta } from '@storybook/react';
import { DataGrid } from '@fluentui-contrib/react-data-grid-react-window-grid';
import description from '../../README.md';

export { VirtualizedDataGrid } from './VirtualizedDataGrid.stories';
export { DataGridScrollingIndicators } from './DataGridScrollingIndicators.stories';

const meta: Meta<typeof DataGrid> = {
  title: 'Packages/react-data-grid-react-window-grid',
  component: DataGrid,
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
};

export default meta;
