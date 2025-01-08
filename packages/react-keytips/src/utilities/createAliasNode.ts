import { sequencesToID } from './sequencesToID';
import { KeytipTreeNode } from '../hooks/useTree';
import { KeytipWithId } from '../components/Keytip/Keytip.types';
import { KTP_ROOT_ID } from '../constants';

export const createAliasNode = ({
  keySequences,
  onExecute,
  uniqueId,
  onReturn,
}: KeytipWithId): KeytipTreeNode => {
  const id = sequencesToID(keySequences.slice(-1));

  const node: KeytipTreeNode = {
    target: null,
    id,
    uniqueId: `${uniqueId}-alias`,
    isShortcut: true,
    parent: KTP_ROOT_ID,
    children: new Set(),
    onExecute,
    onReturn,
    hasMenu: false,
    dynamic: false,
    keySequences: keySequences,
  };

  return node;
};
