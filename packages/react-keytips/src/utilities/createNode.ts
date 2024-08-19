import { sequencesToID } from './sequencesToID';
import { KeytipTreeNode } from '../hooks/useTree';
import { KeytipWithId } from '../components/Keytip/Keytip.types';

export const createNode = ({
  keySequences,
  uniqueId,
  onExecute,
  onReturn,
  dynamic,
  nodeMap,
  positioning,
}: KeytipWithId & {
  nodeMap: KeytipTreeNode[];
}): KeytipTreeNode => {
  const id = sequencesToID(keySequences);
  const parent =
    keySequences.length > 0
      ? sequencesToID(keySequences.slice(0, keySequences.length - 1))
      : '';

  const children = new Set<string>();

  nodeMap.forEach((node) => {
    if (node.parent === id) {
      children.add(node.uniqueId);
    }
  });

  const node: KeytipTreeNode = {
    id,
    uniqueId,
    target: positioning?.target as HTMLElement,
    parent,
    children,
    keySequences: keySequences.map((key) => key.toLowerCase()),
    onExecute,
    onReturn,
    dynamic,
  };

  return node;
};
