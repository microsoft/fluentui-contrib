import { WindowWithFluentGPNShadowDOMAPI } from '../types/FluentGPNShadowDOMAPI';

export type TimeoutId = number | undefined;
export type IntervalId = number | undefined;

export const shouldSubmitForm = (element: Element | null | undefined) =>
  element instanceof HTMLInputElement &&
  (element.type === 'password' ||
    element.type === 'text' ||
    element.type === 'email' ||
    element.type === 'tel');

export const isComboboxElement = (element: Element | null | undefined) => {
  return element?.getAttribute('role') === 'combobox';
};

export const isMenuItemElement = (element: Element | null | undefined) => {
  return element?.getAttribute('role') === 'menuitem';
};

export const isRadioElement = (
  element: Element | null | undefined
): element is HTMLInputElement => {
  return (
    element?.tagName === 'INPUT' && element.getAttribute('type') === 'radio'
  );
};

export const getShadowDOMAPI = (targetDocument: Document | undefined) => {
  const defaultView = targetDocument?.defaultView;
  const shadowDOMAPI = (defaultView as WindowWithFluentGPNShadowDOMAPI)
    ?.__FluentGPNShadowDOMAPI;
  return shadowDOMAPI;
};
