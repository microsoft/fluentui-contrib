import { sequencesToID } from './sequencesToID';
import { KeytipTreeNode } from '../hooks/useTree';
import { KeytipWithId } from '../components/Keytip/Keytip.types';

export const createNode = ({
  keySequences,
  uniqueId,
  onExecute,
  onReturn,
  dynamic,
  isShortcut,
  nodeMap,
  positioning,
  dependentKeys = [],
}: KeytipWithId & {
  nodeMap: Map<string, KeytipTreeNode>;
  isShortcut?: boolean;
  dependentKeys?: string[];
}): KeytipTreeNode => {
  const id = sequencesToID(keySequences);
  const parent =
    keySequences.length > 0
      ? sequencesToID(keySequences.slice(0, keySequences.length - 1))
      : '';

  const children = new Set<string>();

  // fill in children set, if there are nodes that has this node as parent
  for (const node of nodeMap.values()) {
    if (node.parent === id) {
      children.add(node.uniqueId);
    }
  }

  const node: KeytipTreeNode = {
    id,
    uniqueId,
    target: positioning?.target as HTMLElement,
    parent,
    children,
    dependentKeys,
    keySequences: keySequences.map((key) => key.toLowerCase()),
    onExecute,
    onReturn,
    dynamic,
    isShortcut,
  };

  return node;
};
