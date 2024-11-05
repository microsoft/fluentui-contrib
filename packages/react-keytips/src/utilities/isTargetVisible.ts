import { isDisabled } from './isDisabled';

export const isTargetVisible = (
  target?: HTMLElement,
  win?: Document['defaultView']
): boolean => {
  if (!target || !win) return false;
  if (isDisabled(target)) return false;

  const style = win.getComputedStyle(target);
  return style.display !== 'none' && style.visibility !== 'hidden';
};
