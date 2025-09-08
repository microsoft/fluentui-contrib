import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { useDataGridBodyStyles_unstable } from './useDataGridBodyStyles.styles';
import { useDataGridBody_unstable } from './useDataGridBody';
import { renderDataGridBody_unstable } from './renderDataGridBody';
import type { DataGridBodyProps } from './DataGridBody.types';

/**
 * DataGridBody component
 */
export const DataGridBody = React.forwardRef<HTMLElement, DataGridBodyProps>(
  (props, ref) => {
    const state = useDataGridBody_unstable(props, ref);

    useDataGridBodyStyles_unstable(state);
    return renderDataGridBody_unstable(state);
  }
) as ForwardRefComponent<DataGridBodyProps> &
  (<TItem>(props: DataGridBodyProps<TItem>) => JSXElement);

DataGridBody.displayName = 'DataGridBody';
