import { Meta } from '@storybook/react';
import { DataGrid } from '@fluentui-contrib/react-data-grid-react-window-grid';

export { VirtualizedDataGrid } from './VirtualizedDataGrid.stories';
export { DataGridScrollingIndicators } from './DataGridScrollingIndicators.stories';

const meta: Meta<typeof DataGrid> = {
  title: 'Packages/react-data-grid-react-window-grid',
  component: DataGrid,
  parameters: {
    docs: {
      description: {
        component:
          'A Fluent UI DataGrid variant with two-dimensional virtualization (rows and columns) powered by `react-window` grid primitives.',
      },
    },
  },
};

export default meta;
