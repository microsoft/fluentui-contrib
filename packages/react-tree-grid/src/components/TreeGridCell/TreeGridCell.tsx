import * as React from 'react';
import { mergeClasses } from '@fluentui/react-components';
import { useTreeGridCellStyles } from './useTreeGridCellStyles.styles';

export type TreeGridCellProps = Omit<JSX.IntrinsicElements['div'], 'header'> & {
  header?: boolean;
};

export const TreeGridCell = React.forwardRef(
  (props: TreeGridCellProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const styles = useTreeGridCellStyles();
    const { header, className, ...rest } = props;
    return (
      <div
        ref={ref}
        role={header ? 'rowheader' : 'gridcell'}
        {...rest}
        className={mergeClasses(styles, className)}
      />
    );
  }
);
