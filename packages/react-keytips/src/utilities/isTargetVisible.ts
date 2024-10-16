import type { PositioningProps } from '@fluentui/react-positioning';

export const isTargetVisible = (
  target?: PositioningProps['target'],
  win?: Document['defaultView']
): boolean => {
  if (!target || !win) return false;
  const style = win.getComputedStyle(target as HTMLElement);
  return style.display !== 'none' && style.visibility !== 'hidden';
};
