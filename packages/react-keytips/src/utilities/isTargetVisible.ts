export const isTargetVisible = (
  target?: HTMLElement,
  win?: Document['defaultView']
): boolean => {
  if (!target || !win) return false;
  if (target?.hasAttribute('disabled')) return false;

  const style = win.getComputedStyle(target as HTMLElement);
  return style.display !== 'none' && style.visibility !== 'hidden';
};
