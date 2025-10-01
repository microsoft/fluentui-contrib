// https://developer.mozilla.org/en-US/docs/Web/API/CSS/paintWorklet_static
type CSSPaintWorklet = {
  addModule: (url: string) => Promise<void>;
};
type CSSWithPaintWorklet = {
  paintWorklet?: CSSPaintWorklet;
};

/**
 * Gets the CSS paintWorklet object for a specific target window.
 *
 * @returns The CSS paintWorklet object for the specified target window or `null` if not available.
 */
export const getCSSPaintWorklet = (
  targetWindow: Window | null
): CSSPaintWorklet | null => {
  if (targetWindow) {
    const targetCSS = (
      targetWindow as Window & {
        CSS?: CSSWithPaintWorklet;
      }
    ).CSS;

    return targetCSS?.paintWorklet ?? null;
  }

  return null;
};
