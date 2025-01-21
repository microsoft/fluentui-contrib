/* eslint-disable no-restricted-globals */
import {
  GroupperMoveFocusActions,
  MoverKeys,
  MoverMoveFocusEvent,
  TabsterTypes,
} from '@fluentui/react-tabster';
import { consolePrefix } from './GamepadNavigation';
import {
  getParentForm,
  isComboboxElement,
  isMenuItemElement,
  isSelectElement,
  shouldSubmitForm,
} from './GamepadUtils';

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

export const emitSyntheticKeyboardEvent = (
  event: 'keydown' | 'keyup',
  key: string,
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
  console.log(
    consolePrefix,
    `${event}: ${key} KeyboardEvent  @ tag:${activeElement?.tagName} role:${activeElement?.role} bubbles:${bubbles} ariaExpanded:${activeElement?.ariaExpanded} children:${activeElement?.childElementCount}`
  );
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
  console.log(
    consolePrefix,
    `${event} MouseEvent @ tag:${activeElement?.tagName} role:${activeElement?.role} bubbles:${bubbles} ariaExpanded:${activeElement?.ariaExpanded} children:${activeElement?.childElementCount}`
  );
};

export const emitSyntheticMoverMoveFocusEvent = (
  key: TabsterTypes.MoverKey,
  activeElement?: Element | null | undefined
) => {
  const ariaExpanded = activeElement?.ariaExpanded ?? false;
  const childElementCount = activeElement?.childElementCount ?? -1;
  if (isComboboxElement(activeElement)) {
    const button =
      key === MoverKeys.ArrowUp
        ? 'ArrowUp'
        : key === MoverKeys.ArrowDown
        ? 'ArrowDown'
        : key === MoverKeys.ArrowLeft
        ? 'ArrowLeft'
        : 'ArrowRight';
    emitSyntheticKeyboardEvent('keydown', button, true, activeElement);
  } else if (isSelectElement(activeElement)) {
    // TODO: Implement select element navigation
  } else {
    activeElement?.dispatchEvent(new MoverMoveFocusEvent({ key }));
    console.log(
      consolePrefix,
      `${key} Mover MoverFocusEvent @ tag:${activeElement?.tagName} role:${activeElement?.role} ariaExpanded:${ariaExpanded} children:${childElementCount}`
    );
  }
};

export const emitSyntheticGroupperMoveFocusEvent = (
  action: TabsterTypes.GroupperMoveFocusAction,
  activeElement?: Element | null | undefined
) => {
  const keyVallue =
    action === GroupperMoveFocusActions.Enter ? 'Enter' : 'Escape';

  if (keyVallue === 'Enter') {
    // activeElement?.dispatchEvent(new GroupperMoveFocusEvent({ action }));
    // console.warn(
    //   consolePrefix,
    //   `${keyVallue} Groupper @ ${activeElement?.tagName} bubbles:${shouldBubble} ariaExpanded:${activeElement?.ariaExpanded} children:${activeElement?.childElementCount}`
    // );

    if (isComboboxElement(activeElement)) {
      emitSyntheticKeyboardEvent('keydown', 'Enter', true, activeElement);
    } else if (activeElement?.tagName === 'SELECT') {
      // emitSyntheticMouseEvent('mousedown', true, activeElement);
      // activeElement?.dispatchEvent(new GroupperMoveFocusEvent({ action }));
      (activeElement as HTMLSelectElement)?.showPicker();
    } else {
      emitSyntheticMouseEvent('click', true, activeElement);
    }
    // submit the form if the active element is a submit button or an input with type="submit"
    if (shouldSubmitForm(activeElement)) {
      getParentForm(activeElement)?.requestSubmit?.();
    }
  } else {
    const shouldBubble = isMenuItemElement(activeElement);
    emitSyntheticKeyboardEvent(
      'keydown',
      keyVallue,
      shouldBubble,
      activeElement
    );
  }
};
