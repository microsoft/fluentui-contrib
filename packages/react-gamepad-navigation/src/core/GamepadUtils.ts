/* eslint-disable no-restricted-globals */
export const shouldSubmitForm = (element: Element | null | undefined) =>
  element instanceof HTMLInputElement &&
  (element.type === 'password' ||
    element.type === 'text' ||
    element.type === 'email' ||
    element.type === 'tel');

export const getParentForm = (element: Element | null | undefined) => {
  let current = element?.parentElement;
  while (current && current != document.body) {
    if (current instanceof HTMLFormElement) {
      return current;
    }
    current = current.parentElement;
  }
  return null;
};

export const isComboboxElement = (element: Element | null | undefined) => {
  return (
    (element?.tagName === 'INPUT' || element?.tagName === 'BUTTON') &&
    element?.getAttribute('role') === 'combobox'
  );
};

export const isMenuItemElement = (element: Element | null | undefined) => {
  return (
    element?.tagName === 'DIV' && element?.getAttribute('role') === 'menuitem'
  );
};

export const isSelectElement = (element: Element | null | undefined) => {
  return element?.tagName === 'SELECT';
};

export const isRadioGroupElement = (element: Element | null | undefined) => {
  return element instanceof HTMLInputElement && element?.type === 'radio';
};
