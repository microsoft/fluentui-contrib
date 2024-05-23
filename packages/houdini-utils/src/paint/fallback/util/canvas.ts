export const createMozContext = (
  id: string
): CanvasRenderingContext2D | null => {
  // TODO: fix global
  // eslint-disable-next-line no-restricted-globals
  const canvas = document.createElement('canvas');
  canvas.id = id;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    console.error('Unable to create moz-element rendering context');
    return null;
  }
  // Canvas needs to be in the DOM
  // Move it waaaay off screen
  ctx.canvas.style.position = 'absolute';
  ctx.canvas.style.top = '-99999px';
  ctx.canvas.style.left = '-99999px';

  return ctx;
};

export const createDataUrlContext = (
  id: string
): CanvasRenderingContext2D | null => {
  return createMozContext(id);
};

export const createWebkitContext = (
  id: string,
  width: number,
  height: number
): CanvasRenderingContext2D | null => {
  // TODO: fix global
  // eslint-disable-next-line no-restricted-globals
  const ctx = document.getCSSCanvasContext?.('2d', id, width, height) ?? null;
  if (!ctx) {
    return null;
  }

  // This positioning along with the fixed positioning of
  // the wrapper ensures the canvas is always in the viewport
  ctx.canvas.style.position = 'absolute';

  return ctx;
};

export const appendCanvas = (
  parent: HTMLElement,
  canvas: HTMLCanvasElement
): void => {
  if (!canvas.isConnected) {
    parent.appendChild(canvas);
  }
};

export const handleCanvasResize = (
  wrapper: HTMLElement,
  ctx: CanvasRenderingContext2D | null,
  id: string,
  width: number,
  height: number
): CanvasRenderingContext2D | null => {
  if (!ctx) {
    const newCtx = createWebkitContext(id, width, height);
    if (!newCtx) {
      return null;
    }

    appendCanvas(wrapper as HTMLElement, newCtx.canvas);
    return newCtx;
  }

  const canvas = ctx.canvas;
  canvas.width = width;
  canvas.height = height;

  return ctx;
};
