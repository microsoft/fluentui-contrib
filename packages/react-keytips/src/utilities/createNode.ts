import { sequencesToID } from './sequencesToID';
import { KeytipTreeNode } from '../hooks/useTree';
import { KeytipWithId } from '../components/Keytip/Keytip.types';

export const createNode = ({
  keySequences,
  onExecute,
  onReturn,
  dynamic,
  nodeMap,
  hasMenu,
  positioning,
  uniqueId,
}: KeytipWithId & {
  nodeMap: Map<string, KeytipTreeNode>;
}): KeytipTreeNode => {
  const id = sequencesToID(keySequences);

  const parent =
    keySequences.length > 0 ? sequencesToID(keySequences.slice(0, -1)) : '';

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
    isShortcut: false,
    hasMenu,
    dynamic,
    keySequences,
    onExecute,
    onReturn,
  };

  return node;
};
