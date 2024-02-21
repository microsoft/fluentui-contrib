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
import { TreeGridCellProps } from './TreeGridCell.types';

export const TreeGridCell: ForwardRefComponent<TreeGridCellProps> =
  React.forwardRef((props, ref) => {
    const { header, className, ...rest } = props;
    const Root = slot.always(
      getIntrinsicElementProps('div', {
        ref,
        role: header ? 'columnheader' : 'gridcell',
        ...rest,
        className: mergeClasses('fui-TreeGridCell', className),
      }),
      {
        elementType: 'div',
      }
    );
    return <Root />;
  });
