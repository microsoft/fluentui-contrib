import { useId } from '@fluentui/react-components';
import { WindowWithFluentGPNShadowDOMAPI } from '../types/FluentGPNShadowDOMAPI';
import { KeyboardKey } from '../types/Keys';
import { selectOptionsVisibleAttribute } from './Constants';
import { emitSyntheticKeyboardEvent } from './GamepadEvents';

export type TimeoutId = number | undefined;
export type IntervalId = number | undefined;

export const shouldSubmitForm = (element: Element | null | undefined) =>
  element instanceof HTMLInputElement &&
  (element.type === 'password' ||
    element.type === 'text' ||
    element.type === 'email' ||
    element.type === 'tel');

export const getParentForm = (
  element: Element | null | undefined,
  body: HTMLElement
) => {
  let current = element?.parentElement;
  while (current && current != body) {
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

export const isRadioElement = (element: Element | null | undefined) => {
  return element?.getAttribute('type') === 'radio';
};

export const isSelectElement = (element: Element | null | undefined) => {
  return element?.tagName === 'SELECT';
};

export const hidePickerOnSeLectElement = (selectElement: HTMLSelectElement) => {
  selectElement.blur();
  selectElement.focus();
  selectElement.removeAttribute(selectOptionsVisibleAttribute);
};

export const handleSelectOnEnter = (activeElement: Element | null) => {
  const htmlSelect = activeElement as HTMLSelectElement;
  const openOptions = htmlSelect.hasAttribute(selectOptionsVisibleAttribute);
  if (openOptions) {
    hidePickerOnSeLectElement(htmlSelect);
  } else {
    htmlSelect.showPicker();
    htmlSelect.setAttribute(selectOptionsVisibleAttribute, '_self');
  }
};

export const handleSelectOnEscape = (targetDocument: Document) => {
  const htmlSelect = targetDocument?.activeElement as HTMLSelectElement;
  const openOptions = htmlSelect.hasAttribute(selectOptionsVisibleAttribute);
  if (openOptions) {
    hidePickerOnSeLectElement(htmlSelect);
  } else {
    emitSyntheticKeyboardEvent(
      'keydown',
      KeyboardKey.Escape,
      true,
      targetDocument
    );
  }
};

export const getshadowDOMAPI = (targetDocument: Document | undefined) => {
  const defaultView = targetDocument?.defaultView;
  let shadowDOMAPI = (defaultView as WindowWithFluentGPNShadowDOMAPI)
    ?.__FluentGPNShadowDOMAPI;
  if (!shadowDOMAPI) {
    shadowDOMAPI = {
      gamepadInitialized: false,
      windowId: useId('window'),
    };
    (defaultView as WindowWithFluentGPNShadowDOMAPI).__FluentGPNShadowDOMAPI =
      shadowDOMAPI;
  }
  return shadowDOMAPI;
};
