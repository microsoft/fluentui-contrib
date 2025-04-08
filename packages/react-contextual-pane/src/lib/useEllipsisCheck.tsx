import * as React from 'react';

function hasEllipsis(element: HTMLDivElement): boolean {
  return element.scrollWidth > element.clientWidth;
}

const delay = 100;

export function createResizeObserver(
  timeoutId: number | undefined,
  host: Window & typeof globalThis,
  setHasEllipsisState: (hasEllipsis: boolean) => void,
  element: HTMLDivElement
) {
  return new host.ResizeObserver(() => {
    if (timeoutId) host.clearTimeout(timeoutId);

    timeoutId = host.setTimeout(() => {
      setHasEllipsisState(hasEllipsis(element));
    }, delay);
  });
}

export function useEllipsisCheck(): [boolean, React.RefObject<HTMLDivElement>] {
  const ref = React.useRef<HTMLDivElement>(null);
  const [hasEllipsisState, setHasEllipsisState] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;

    if (!element?.ownerDocument.defaultView) return;

    const host = element.ownerDocument.defaultView;

    setHasEllipsisState(hasEllipsis(element));

    let timeoutId: number | undefined;
    const resizeObserver = createResizeObserver(
      timeoutId,
      host,
      setHasEllipsisState,
      element
    );

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
      if (timeoutId) host.clearTimeout(timeoutId);
    };
  }, []);

  return [hasEllipsisState, ref];
}
