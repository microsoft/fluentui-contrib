import { makeResetStyles, mergeClasses } from '@fluentui/react-components';

const useResetStyles = makeResetStyles({
  flex: '1 1 auto',
});

export const useTreeGridCellStyles = () =>
  mergeClasses('fui-TreeGridCell', useResetStyles());
