import { selectOptionsVisibleAttribute } from './Constants';

/* eslint-disable no-restricted-globals */
export type TimeoutId = ReturnType<typeof setTimeout> | undefined;
export type IntervalId = ReturnType<typeof setInterval> | undefined;

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
  return element?.getAttribute('role') === 'combobox';
};

export const isMenuItemElement = (element: Element | null | undefined) => {
  return element?.getAttribute('role') === 'menuitem';
};

export const isSelectElement = (element: Element | null | undefined) => {
  return element?.tagName === 'SELECT';
};

export const hidePickerOnSeLectElement = (selectElement: HTMLSelectElement) => {
  selectElement.blur();
  selectElement.focus();
  selectElement.removeAttribute(selectOptionsVisibleAttribute);
};
