import { MoverMoveFocusEvent } from '@fluentui/react-tabster';
import {
  handleSelectOnDirection,
  handleSelectOnEnter,
  handleSelectOnEscape,
  isComboboxElement,
  isMenuItemElement,
  isRadioElement,
  isSelectElement,
  shouldSubmitForm,
} from './GamepadUtils';
import { getMoverKeyToKeyboardKeyMapping } from './GamepadMappings';
import { KeyboardKey, MoverKey } from '../types/Keys';

/*
    Synthetic Events
*/
const syntheticKey = Symbol('synthetic');

export type MouseSyntheticEvent = MouseEvent & {
  [syntheticKey]?: boolean;
};

export const isSyntheticMouseEvent = (
  evt: MouseEvent | React.MouseEvent<unknown, MouseEvent>
): boolean => {
  return evt instanceof MouseEvent
    ? !!(evt as MouseSyntheticEvent)?.[syntheticKey]
    : !!(evt.nativeEvent as MouseSyntheticEvent)?.[syntheticKey];
};

export const emitSyntheticKeyboardEvent = (
  event: 'keydown' | 'keyup',
  key: KeyboardKey,
  bubbles: boolean,
  targetDocument: Document
) => {
  const activeElement = targetDocument.activeElement;
  const keyboardEvent = new KeyboardEvent(event, {
    key: key,
    bubbles,
    cancelable: true,
    view: targetDocument.defaultView,
    detail: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
  });
  Object.defineProperty(keyboardEvent, syntheticKey, {
    value: true,
    writable: false,
    enumerable: false,
  });
  activeElement?.dispatchEvent(keyboardEvent);
};

export const emitSyntheticMouseEvent = (
  event: 'mousedown' | 'mouseup' | 'click',
  bubbles: boolean,
  targetDocument: Document
) => {
  const activeElement = targetDocument.activeElement;
  const mouseEvent = new MouseEvent(event, {
    bubbles,
    cancelable: true,
    view: targetDocument.defaultView,
    detail: 0,
    screenX: undefined,
    screenY: undefined,
    clientX: undefined,
    clientY: undefined,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    button: 0,
    buttons: 0,
    relatedTarget: null,
  });
  Object.defineProperty(mouseEvent, syntheticKey, {
    value: true,
    writable: false,
    enumerable: false,
  });
  activeElement?.dispatchEvent(mouseEvent);
};

export const emitSyntheticMoverMoveFocusEvent = (
  key: MoverKey,
  targetDocument: Document
) => {
  const activeElement = targetDocument.activeElement;
  if (isComboboxElement(activeElement) || isRadioElement(activeElement)) {
    const button = getMoverKeyToKeyboardKeyMapping(key);
    emitSyntheticKeyboardEvent('keydown', button, true, targetDocument);
  } else if (isSelectElement(activeElement)) {
    handleSelectOnDirection(targetDocument, key);
  } else {
    activeElement?.dispatchEvent(new MoverMoveFocusEvent({ key }));
  }
};

export const emitSyntheticGroupperMoveFocusEvent = (
  action: KeyboardKey,
  targetDocument: Document
) => {
  const activeElement = targetDocument.activeElement;
  if (action === KeyboardKey.Enter) {
    // Note: GroupperMoveFocusActions.Enter has no effect on components
    // activeElement?.dispatchEvent(new GroupperMoveFocusEvent({ action: GroupperMoveFocusActions.Enter }));

    if (isComboboxElement(activeElement)) {
      emitSyntheticKeyboardEvent('keydown', action, true, targetDocument);
    } else if (isRadioElement(activeElement)) {
      activeElement.checked = !activeElement.checked;
    } else if (isSelectElement(activeElement)) {
      handleSelectOnEnter(activeElement);
    } else {
      emitSyntheticMouseEvent('click', true, targetDocument);
    }
    if (shouldSubmitForm(activeElement)) {
      activeElement?.closest('form')?.requestSubmit?.();
    }
  } else {
    // Note: GroupperMoveFocusActions.Escape has no difference to KeyboardKey.Escape
    if (isSelectElement(activeElement)) {
      handleSelectOnEscape(activeElement, targetDocument);
    } else if (isComboboxElement(activeElement)) {
      emitSyntheticMouseEvent('click', true, targetDocument);
    } else {
      const shouldBubble = isMenuItemElement(activeElement);
      emitSyntheticKeyboardEvent(
        'keydown',
        action,
        shouldBubble,
        targetDocument
      );
    }
  }
};
