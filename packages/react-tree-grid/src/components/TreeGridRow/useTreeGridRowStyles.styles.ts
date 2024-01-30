import {
  makeResetStyles,
  mergeClasses,
  createFocusOutlineStyle,
} from '@fluentui/react-components';

const useResetStyles = makeResetStyles({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  ...createFocusOutlineStyle(),
});

export const useTreeGridRowStyles = () => {
  return mergeClasses('fui-TreeGridRow', useResetStyles());
};
