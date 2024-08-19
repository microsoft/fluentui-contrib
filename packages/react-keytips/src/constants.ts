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
export const KTP_FULL_PREFIX = KTP_PREFIX + KTP_SEPARATOR;
export const DATAKTP_TARGET = 'data-ktp-target';
export const KTP_ROOT_ID = 'ktp';

export const EVENTS = {
  KEYTIP_ADDED: 'fui-keytip-added',
  KEYTIP_REMOVED: 'fui-keytip-removed',
  KEYTIP_UPDATED: 'fui-keytip-updated',
  ENTER_KEYTIP_MODE: 'fui-enter-keytip-mode',
  EXIT_KEYTIP_MODE: 'fui-exit-keytip-mode',
} as const;

export const EXIT_KEYS = [
  Tab,
  Enter,
  Space,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
];
