import {
  ArrowLeft,
  Enter,
  Space,
  Tab,
  ArrowUp,
  ArrowDown,
  ArrowRight,
} from '@fluentui/keyboard-keys';

export const KTP_PREFIX = 'ktp';
export const KTP_SEPARATOR = '-';
export const DATAKTP_TARGET = 'data-ktp-target';
export const KTP_ROOT_ID = 'ktp';
export const KEYTIP_BORDER_RADIUS = 4;
export const SHOW_DELAY = 250;

export const EVENTS = {
  KEYTIP_ADDED: 'fui-keytip-added',
  KEYTIP_REMOVED: 'fui-keytip-removed',
  KEYTIP_UPDATED: 'fui-keytip-updated',
  ENTER_KEYTIP_MODE: 'fui-enter-keytip-mode',
  EXIT_KEYTIP_MODE: 'fui-exit-keytip-mode',
} as const;

export const VISUALLY_HIDDEN_STYLES = {
  clip: 'rect(0px, 0px, 0px, 0px)',
  height: '1px',
  margin: '-1px',
  width: '1px',
  position: 'absolute',
  overflow: 'hidden',
  textWrap: 'nowrap',
} as React.CSSProperties;

export const EXIT_KEYS = [
  Tab,
  Enter,
  Space,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
];
