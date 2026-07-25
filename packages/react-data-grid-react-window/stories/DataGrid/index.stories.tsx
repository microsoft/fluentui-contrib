import { Meta } from '@storybook/react';
import { DataGrid } from '@fluentui-contrib/react-data-grid-react-window';

export { VirtualizedDataGrid } from './VirtualizedDataGrid.stories';
export { ReactWindowOverrides } from './ReactWindowOverrides.stories';
export { DataGridScrollingIndicators } from './DataGridScrollingIndicators.stories';
export { ResizableDataGrid } from './ResizableDataGrid.stories';

const meta: Meta<typeof DataGrid> = {
  title: 'Packages/react-data-grid-react-window',
  component: DataGrid,
  parameters: {
    docs: {
      description: {
        component:
          'A Fluent UI DataGrid variant virtualized with `react-window` for efficient large-list rendering.',
      },
    },
  },
};

export default meta;
