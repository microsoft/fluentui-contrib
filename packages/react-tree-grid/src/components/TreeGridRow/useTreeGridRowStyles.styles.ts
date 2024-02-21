import {
  makeResetStyles,
  mergeClasses,
  createFocusOutlineStyle,
} from '@fluentui/react-components';

const useResetStyles = makeResetStyles({
  display: 'flex',
  position: 'relative',
  ...createFocusOutlineStyle(),
});

export const useTreeGridRowStyles = () =>
  mergeClasses('fui-TreeGridRow', useResetStyles());
