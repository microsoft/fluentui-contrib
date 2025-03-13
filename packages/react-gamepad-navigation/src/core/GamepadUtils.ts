import { WindowWithFluentGPNShadowDOMAPI } from '../types/FluentGPNShadowDOMAPI';
import { KeyboardKey, MoverKey, MoverKeys } from '../types/Keys';
import { selectOptionsVisibleAttribute } from './Constants';
import { emitSyntheticKeyboardEvent } from './GamepadEvents';
import { getMoverKeyToKeyboardKeyMapping } from './GamepadMappings';

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

export const isSelectElement = (
  element: Element | null | undefined
): element is HTMLSelectElement => {
  return element?.tagName === 'SELECT';
};

export const hidePickerOnSelectElement = (htmlSelect: HTMLSelectElement) => {
  htmlSelect.blur();
  htmlSelect.focus();
  htmlSelect.removeAttribute(selectOptionsVisibleAttribute);
};

export const handleSelectOnEnter = (htmlSelect: HTMLSelectElement) => {
  const openOptions = htmlSelect.hasAttribute(selectOptionsVisibleAttribute);
  if (openOptions) {
    hidePickerOnSelectElement(htmlSelect);
  } else {
    htmlSelect.showPicker();
    htmlSelect.setAttribute(selectOptionsVisibleAttribute, '');
  }
};

export const handleSelectOnEscape = (
  htmlSelect: HTMLSelectElement,
  targetDocument: Document
) => {
  const openOptions = htmlSelect.hasAttribute(selectOptionsVisibleAttribute);
  if (openOptions) {
    hidePickerOnSelectElement(htmlSelect);
  } else {
    emitSyntheticKeyboardEvent(
      'keydown',
      KeyboardKey.Escape,
      true,
      targetDocument
    );
  }
};

export const handleSelectOnDirection = (
  targetDocument: Document,
  key: MoverKey
) => {
  const htmlSelect = targetDocument.activeElement as HTMLSelectElement;
  const openOptions = htmlSelect.hasAttribute(selectOptionsVisibleAttribute);

  // TODO: account for navigation to active select sibling elements vs options
  if (openOptions && key === MoverKeys.ArrowDown) {
    if (htmlSelect.selectedIndex < htmlSelect.options.length - 1) {
      htmlSelect.selectedIndex++;
      const selectedOption = htmlSelect.options[htmlSelect.selectedIndex];
      if (selectedOption) {
        htmlSelect.value = selectedOption.value;
        selectedOption.selected = true;
        selectedOption.focus();
      }
    }
  } else if (openOptions && key === MoverKeys.ArrowUp) {
    if (htmlSelect.selectedIndex > 0) {
      htmlSelect.selectedIndex--;
      const selectedOption = htmlSelect.options[htmlSelect.selectedIndex];
      if (selectedOption) {
        htmlSelect.value = selectedOption.value;
        selectedOption.selected = true;
        selectedOption.focus();
      }
    }
  } else if (!openOptions) {
    const button = getMoverKeyToKeyboardKeyMapping(key);
    emitSyntheticKeyboardEvent('keydown', button, true, targetDocument);
  }
};
export const getShadowDOMAPI = (targetDocument: Document | undefined) => {
  const defaultView = targetDocument?.defaultView;
  const shadowDOMAPI = (defaultView as WindowWithFluentGPNShadowDOMAPI)
    ?.__FluentGPNShadowDOMAPI;
  return shadowDOMAPI;
};
