import { DATAKTP_TARGET } from '../constants';
import { sequencesToID } from './sequencesToID';

export function keytipTargetFromSequence(keySequences: string[]): string {
  return '[' + DATAKTP_TARGET + '="' + sequencesToID(keySequences) + '"]';
}
