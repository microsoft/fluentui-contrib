import type { KeytipProps } from '../Keytip.types';

/** @internal */
export type KeytipWithId = KeytipProps & {
  uniqueId: string;
};
