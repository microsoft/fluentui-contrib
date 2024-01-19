import { makeResetStyles, mergeClasses } from '@fluentui/react-components';

const useResetStyles = makeResetStyles({
  display: 'block',
});

export const useTreeGridStyles = () =>
  mergeClasses('fui-TreeGrid', useResetStyles());
