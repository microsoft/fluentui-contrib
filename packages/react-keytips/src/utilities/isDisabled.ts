export const isDisabled = (target?: HTMLElement): boolean => {
  if (!target) return false;

  return (
    target.hasAttribute('disabled') ||
    target.getAttribute('aria-disabled')?.toLowerCase() === 'true'
  );
};
