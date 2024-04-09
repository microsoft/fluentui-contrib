import * as React from 'react';
import { mergeClasses } from '@fluentui/react-components';
import { useStyles } from './highContrast.styles';

export const highContrast: React.FC = () => {
  const styles = useStyles();
  return <div className={mergeClasses(styles.root)}>Hello World!</div>;
};
