import { MoverMoveFocusEvent } from '@fluentui/react-tabster';
import {
  getParentForm,
  handleSelectOnEnter,
  handleSelectOnEscape,
  isComboboxElement,
  isMenuItemElement,
  isSelectElement,
  shouldSubmitForm,
} from './GamepadUtils';
import { getMoverKeyToKeyboardKeyMapping } from './GamepadMappings';
import { KeyboardKey, MoverKey, MoverKeys } from '../types/Keys';
import { selectOptionsVisibleAttribute } from './Constants';

/*
    Synthetic Events
*/
const syntheticKey = Symbol('synthetic');
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace React {
    interface KeyboardEvent {
      readonly [syntheticKey]?: boolean;
    }
    interface MouseEvent {
      readonly [syntheticKey]?: boolean;
    }
  }
  interface KeyboardEvent {
    readonly [syntheticKey]?: boolean;
  }
  interface MouseEvent {
    readonly [syntheticKey]?: boolean;
  }
}

export const isSyntheticMouseEvent = (
  evt: React.MouseEvent<unknown, MouseEvent> | MouseEvent
): boolean => {
  return evt instanceof MouseEvent
    ? !!evt?.[syntheticKey]
    : !!evt.nativeEvent?.[syntheticKey];
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
  if (isComboboxElement(activeElement)) {
    const button = getMoverKeyToKeyboardKeyMapping(key);
    emitSyntheticKeyboardEvent('keydown', button, true, targetDocument);
  } else if (isSelectElement(activeElement)) {
    const htmlSelect = activeElement as HTMLSelectElement;
    const openOptions = htmlSelect.hasAttribute(selectOptionsVisibleAttribute);

    if (openOptions && key === MoverKeys.ArrowDown) {
      if (htmlSelect.selectedIndex < htmlSelect.options.length - 1) {
        htmlSelect.selectedIndex++;
      }
    } else if (openOptions && key === MoverKeys.ArrowUp) {
      if (htmlSelect.selectedIndex > 0) {
        htmlSelect.selectedIndex--;
      }
    } else if (!openOptions) {
      const button = getMoverKeyToKeyboardKeyMapping(key);
      emitSyntheticKeyboardEvent('keydown', button, true, targetDocument);
    }
    // TODO: account for navigation to active select sibling elements vs options
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
    } else if (isSelectElement(activeElement)) {
      handleSelectOnEnter(activeElement);
    } else {
      emitSyntheticMouseEvent('click', true, targetDocument);
    }
    if (shouldSubmitForm(activeElement)) {
      getParentForm(activeElement, targetDocument.body)?.requestSubmit?.();
    }
  } else {
    // Note: GroupperMoveFocusActions.Escape has no difference to KeyboardKey.Escape
    if (isSelectElement(activeElement)) {
      handleSelectOnEscape(targetDocument);
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
