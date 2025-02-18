export type FocusFinderFunctions = {
  findAllFocusable: (
    container: HTMLElement,
    acceptCondition?: ((el: HTMLElement) => boolean) | undefined
  ) => HTMLElement[];
  findFirstFocusable: (
    container: HTMLElement
  ) => HTMLElement | null | undefined;
  findLastFocusable: (container: HTMLElement) => HTMLElement | null | undefined;
  findNextFocusable: (
    currentElement: HTMLElement,
    options?: { container?: HTMLElement | undefined }
  ) => HTMLElement | null | undefined;
  findPrevFocusable: (
    currentElement: HTMLElement,
    options?: { container?: HTMLElement | undefined }
  ) => HTMLElement | null | undefined;
};
