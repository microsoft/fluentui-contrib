/* eslint-disable no-restricted-globals */
import { MoverMoveFocusEvent, TabsterTypes } from '@fluentui/react-tabster';
import {
  getParentForm,
  hidePickerOnSeLectElement,
  isComboboxElement,
  isMenuItemElement,
  isSelectElement,
  shouldSubmitForm,
} from './GamepadUtils';
import { getMoverKeyToKeyboardKeyMapping } from './GamepadMappings';
import { KeyboardKey } from '../types/Keys';
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
  activeElement?: Element | null | undefined
) => {
  const keyboardEvent = new KeyboardEvent(event, {
    key: key,
    bubbles,
    cancelable: true,
    view: window,
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
  activeElement?: Element | null | undefined
) => {
  const mouseEvent = new MouseEvent(event, {
    bubbles,
    cancelable: true,
    view: window,
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
  key: TabsterTypes.MoverKey,
  activeElement?: Element | null | undefined
) => {
  if (isComboboxElement(activeElement)) {
    const button = getMoverKeyToKeyboardKeyMapping(key);
    emitSyntheticKeyboardEvent('keydown', button, true, activeElement);
  } else if (isSelectElement(activeElement)) {
    const selectElement = activeElement as HTMLSelectElement;
    const areOptionsVisible = selectElement.hasAttribute(
      selectOptionsVisibleAttribute
    );

    if (
      (areOptionsVisible && key === TabsterTypes.MoverKeys.ArrowDown) ||
      (!areOptionsVisible && key === TabsterTypes.MoverKeys.ArrowRight)
    ) {
      if (selectElement.selectedIndex < selectElement.options.length - 1) {
        selectElement.selectedIndex++;
      }
    } else if (
      (areOptionsVisible && key === TabsterTypes.MoverKeys.ArrowUp) ||
      (!areOptionsVisible && key === TabsterTypes.MoverKeys.ArrowLeft)
    ) {
      if (selectElement.selectedIndex > 0) {
        selectElement.selectedIndex--;
      }
    } else {
      const button = getMoverKeyToKeyboardKeyMapping(key);
      emitSyntheticKeyboardEvent('keydown', button, true, activeElement);
    }
  } else {
    activeElement?.dispatchEvent(new MoverMoveFocusEvent({ key }));
  }
};

export const emitSyntheticGroupperMoveFocusEvent = (
  action: KeyboardKey,
  activeElement?: Element | null | undefined
) => {
  if (action === KeyboardKey.Enter) {
    // Note: GroupperMoveFocusActions.Enter has no effect on components
    // activeElement?.dispatchEvent(new GroupperMoveFocusEvent({ action: GroupperMoveFocusActions.Enter }));

    if (isComboboxElement(activeElement)) {
      emitSyntheticKeyboardEvent('keydown', action, true, activeElement);
    } else if (activeElement?.tagName === 'SELECT') {
      const selectElement = activeElement as HTMLSelectElement;
      const areOptionsVisible = selectElement.hasAttribute(
        selectOptionsVisibleAttribute
      );
      if (areOptionsVisible) {
        hidePickerOnSeLectElement(selectElement);
      } else {
        selectElement.showPicker();
        selectElement.setAttribute(selectOptionsVisibleAttribute, '_self');
      }
    } else {
      emitSyntheticMouseEvent('click', true, activeElement);
    }
    if (shouldSubmitForm(activeElement)) {
      getParentForm(activeElement)?.requestSubmit?.();
    }
  } else {
    // Note: GroupperMoveFocusActions.Escape has no difference with KeyboardKey.Escape

    if (isSelectElement(activeElement)) {
      const selectElement = activeElement as HTMLSelectElement;
      const areOptionsVisible = selectElement.hasAttribute(
        selectOptionsVisibleAttribute
      );
      if (areOptionsVisible) {
        hidePickerOnSeLectElement(selectElement);
      } else {
        emitSyntheticKeyboardEvent('keydown', action, true, activeElement);
      }
    } else if (isComboboxElement(activeElement)) {
      emitSyntheticMouseEvent('click', true, activeElement);
    } else {
      const shouldBubble = isMenuItemElement(activeElement);
      emitSyntheticKeyboardEvent(
        'keydown',
        action,
        shouldBubble,
        activeElement
      );
    }
  }
};
