import { makeResetStyles, mergeClasses } from '@fluentui/react-components';

const useResetStyles = makeResetStyles({
  flex: '1 1 100%',
});

export const useTreeGridCellStyles = () =>
  mergeClasses('fui-TreeGridCell', useResetStyles());
