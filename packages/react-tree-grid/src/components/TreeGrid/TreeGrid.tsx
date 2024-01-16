import * as React from 'react';
import { makeResetStyles, mergeClasses } from '@fluentui/react-components';

export type TreeGridProps = JSX.IntrinsicElements['div'];

const useStyles = makeResetStyles({
  display: 'block',
});

export const TreeGrid = React.forwardRef(
  (props: TreeGridProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const styles = useStyles();
    return (
      <div
        ref={ref}
        {...props}
        className={mergeClasses(styles, props.className)}
      />
    );
  }
);
