type HotkeyOptions = {
  preventDefault?: boolean;
  stopPropagation?: boolean;
  delay?: number;
};

export type KeyWithModifiers = {
  alt: boolean;
  ctrl: boolean;
  shift: boolean;
  meta: boolean;
  mod: boolean;
  key?: string;
};

export type Hotkey = [string, (ev: KeyboardEvent) => void, HotkeyOptions?];
