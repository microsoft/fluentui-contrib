import {
  DataGridProps as BaseDataGridProps,
  DataGridState as BaseDataGridState,
} from '@fluentui/react-components';
import { RefObject } from 'react';
import { VariableSizeGrid, VariableSizeList } from 'react-window';
export type DataGridProps = BaseDataGridProps & {
  bodyRef?: RefObject<VariableSizeGrid | null>;
  headerRef?: RefObject<VariableSizeList | null>;
};

export type DataGridState = BaseDataGridState &
  Required<Pick<DataGridProps, 'bodyRef' | 'headerRef'>>;
