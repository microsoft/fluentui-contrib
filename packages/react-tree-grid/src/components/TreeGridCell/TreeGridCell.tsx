/** @jsxRuntime classic */
/** @jsx createElement */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from '@fluentui/react-jsx-runtime';
import * as React from 'react';
import {
  ForwardRefComponent,
  getIntrinsicElementProps,
  mergeClasses,
  slot,
} from '@fluentui/react-components';
import { useTreeGridCellStyles } from './useTreeGridCellStyles.styles';
import { TreeGridCellProps } from './TreeGridCell.types';

export const TreeGridCell: ForwardRefComponent<TreeGridCellProps> =
  React.forwardRef((props, ref) => {
    const styles = useTreeGridCellStyles();
    const { header, className, ...rest } = props;
    const Root = slot.always(
      getIntrinsicElementProps('div', {
        ref,
        role: header ? 'columnheader' : 'gridcell',
        ...rest,
        className: mergeClasses(styles, className),
      }),
      {
        elementType: 'div',
      }
    );
    return <Root />;
  });
