import * as React from 'react';
import {
  renderDataGridRow_unstable,
  DataGridRowProps,
} from '@fluentui/react-components';
import type { ForwardRefComponent } from '@fluentui/react-components';
import { useDataGridRow_unstable } from './useDataGridRow';
import { useDataGridRowStyles_unstable } from './useDataGridRow.styles';

/**
 * DataGridRow component
 */
export const DataGridRow = React.forwardRef((props, ref) => {
  const state = useDataGridRow_unstable(props, ref as React.Ref<HTMLElement>);

  useDataGridRowStyles_unstable(state);
  return renderDataGridRow_unstable(state);
}) as ForwardRefComponent<DataGridRowProps> &
  (<TItem>(props: DataGridRowProps<TItem>) => JSX.Element);

DataGridRow.displayName = 'DataGridRow';
