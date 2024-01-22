import * as React from 'react';
import { mergeClasses } from '@fluentui/react-components';
import { useTreeGridStyles } from './useTreeGridStyles.styles';
import { TreeGridProps } from './TreeGrid.types';
import { useNavigation } from '../../hooks/useNavigation';

export const TreeGrid = React.forwardRef(
  (props: TreeGridProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
      <div
        ref={ref}
        role="treegrid"
        {...props}
        className={mergeClasses(useTreeGridStyles(), props.className)}
        {...useNavigation(props)}
      />
    );
  }
);
