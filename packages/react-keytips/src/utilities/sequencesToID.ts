import { KTP_PREFIX, KTP_SEPARATOR } from '../constants';

export function sequencesToID(keySequences: string[]): string {
  return keySequences
    .reduce((prevValue: string, keySequence: string): string => {
      return (
        prevValue + KTP_SEPARATOR + keySequence.split('').join(KTP_SEPARATOR)
      );
    }, KTP_PREFIX)
    .toLowerCase();
}
