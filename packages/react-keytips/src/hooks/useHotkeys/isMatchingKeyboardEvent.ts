import type { KeyWithModifiers } from './useHotkeys.types';

export function isKeyMatchingKeyboardEvent(
  hotkeys: KeyWithModifiers,
  event: KeyboardEvent
): boolean {
  const { alt, ctrl, meta, mod, shift, key } = hotkeys;
  const {
    altKey,
    ctrlKey,
    metaKey,
    shiftKey,
    key: pressedKey,
    code: keyCode,
  } = event;

  if (alt !== altKey && pressedKey !== 'Alt') {
    return false;
  }

  if (shift !== shiftKey && pressedKey !== 'Shift') {
    return false;
  }

  if (mod) {
    if (!ctrlKey && !metaKey) {
      return false;
    }
  } else {
    if (ctrl !== ctrlKey && pressedKey !== 'Control' && pressedKey !== 'Ctrl') {
      return false;
    }
    if (meta !== metaKey && pressedKey !== 'Meta' && pressedKey !== 'Os') {
      return false;
    }
  }

  if (key) {
    if (
      pressedKey.toLowerCase() === key.toLowerCase() ||
      keyCode.replace('Key', '').toLowerCase() === key.toLowerCase()
    ) {
      return true;
    }
    return false;
  }

  // allow only modifiers, e.g. alt+control, alt+meta
  return true;
}
