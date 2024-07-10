import * as React from 'react';
import { mergeClasses } from '@fluentui/react-components';
import { useStyles } from './variantThemeTool.styles';

export const variantThemeTool: React.FC = () => {
  const styles = useStyles();
  return <div className={mergeClasses(styles.root)}>Hello World!</div>;
};
