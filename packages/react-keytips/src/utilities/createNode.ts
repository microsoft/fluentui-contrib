import { sequencesToID } from './sequencesToID';
import { KeytipTreeNode } from '../hooks/useTree';
import { KeytipWithId } from '../components/Keytip/internal/Keytip.types';

export const createNode = ({
  keySequences,
  nodeMap,
  positioning,
  overflowSequence = [],
  ...props
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
    ...props,
    overflowSequence,
    id,
    target: positioning?.target as HTMLElement,
    keySequences,
    parent,
    children,
  };

  return node;
};
