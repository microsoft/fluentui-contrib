const MODIFIERS = new Set(['shift', 'alt', 'control', 'meta', 'mod']);

export function parseHotkey(hotkey: string): {
  key: string | undefined;
  alt: boolean;
  ctrl: boolean;
  shift: boolean;
  meta: boolean;
  mod: boolean;
} {
  const keys = hotkey.toLowerCase().split('+');

  const modifiers = {
    alt: keys.includes('alt'),
    ctrl: keys.includes('ctrl') || keys.includes('control'),
    shift: keys.includes('shift'),
    meta: keys.includes('meta'),
    mod: keys.includes('mod'),
  };

  const key = keys.find((k) => !MODIFIERS.has(k));

  return {
    ...modifiers,
    key,
  };
}
