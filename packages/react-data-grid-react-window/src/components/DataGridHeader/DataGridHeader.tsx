import * as React from 'react';
import {
  renderDataGridHeader_unstable,
  type DataGridHeaderProps,
  type ForwardRefComponent,
} from '@fluentui/react-components';
import { useDataGridHeader_unstable } from './useDataGridHeader';
import { useDataGridHeaderStyles_unstable } from './useDataGridHeaderStyles.styles';

/**
 * DataGridHeader component
 */
export const DataGridHeader: ForwardRefComponent<DataGridHeaderProps> &
  ((props: DataGridHeaderProps) => JSX.Element) = React.forwardRef(
  (props, ref) => {
    const state = useDataGridHeader_unstable(
      props,
      ref as React.Ref<HTMLElement>
    );

    useDataGridHeaderStyles_unstable(state);
    return renderDataGridHeader_unstable(state);
  }
) as ForwardRefComponent<DataGridHeaderProps> &
  ((props: DataGridHeaderProps) => JSX.Element);

DataGridHeader.displayName = 'DataGridHeader';
