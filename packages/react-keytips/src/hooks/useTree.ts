import type { KeytipProps } from '../components/Keytip';
import * as React from 'react';
import { keytipTargetFromSequence, sequencesToID } from '../utilities';
import { KTP_ROOT_ID } from '../constants';
import { useFluent } from '@fluentui/react-components';

export type KeytipTreeNode = Pick<
  KeytipProps,
  'keySequences' | 'onExecute' | 'onReturn'
> & {
  id: string;
  parent: string;
  children: Set<string>;
  hasDynamicChildren?: boolean;
};

const createNode = ({
  keySequences,
  onExecute,
  onReturn,
  hasDynamicChildren,
}: KeytipProps): KeytipTreeNode => {
  const id = sequencesToID(keySequences);
  const parent =
    keySequences.length > 0
      ? sequencesToID(keySequences.slice(0, keySequences.length - 1))
      : '';

  const node: KeytipTreeNode = {
    id,
    parent,
    children: new Set(),
    keySequences,
    onExecute,
    onReturn,
    hasDynamicChildren,
  };

  return node;
};

const getParentID = (sequence: string[]): string =>
  sequence.length === 0
    ? KTP_ROOT_ID
    : sequencesToID(sequence.slice(0, sequence.length - 1));

export function useTree() {
  const { targetDocument } = useFluent();
  const root: KeytipTreeNode = React.useMemo(
    () => ({
      id: KTP_ROOT_ID,
      children: new Set(),
      parent: '',
      keySequences: [],
    }),
    []
  );

  const currentKeytip = React.useRef<KeytipTreeNode | undefined>(root);

  const [nodeMap, setNodeMap] = React.useState<Map<string, KeytipTreeNode>>(
    () => {
      const initial = new Map<string, KeytipTreeNode>();
      initial.set(KTP_ROOT_ID, root);
      return initial;
    }
  );

  const addNode = React.useCallback((keytip: KeytipProps) => {
    const node = createNode(keytip);
    const parentId = getParentID(node.keySequences);

    setNodeMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(node.id, node);
      const parentNode = newMap.get(parentId);
      if (parentNode) {
        parentNode.children.add(node.id);
      }
      return newMap;
    });
  }, []);

  const removeNode = React.useCallback((keytip: KeytipProps) => {
    const id = sequencesToID(keytip.keySequences);
    setNodeMap((prev) => {
      const newMap = new Map(prev);
      const node = newMap.get(id);
      if (node) {
        newMap.delete(id);
        const parentNode = newMap.get(node.parent);
        if (parentNode) {
          parentNode.children.delete(id);
        }
      }
      return newMap;
    });
  }, []);

  const updateNode = React.useCallback((keytip: KeytipProps) => {
    const id = sequencesToID(keytip.keySequences);
    setNodeMap((prev) => {
      const newMap = new Map(prev);
      const node = newMap.get(id);
      if (node) {
        newMap.set(id, createNode(keytip));
      }
      return newMap;
    });
  }, []);

  const getMatchingNode = React.useCallback(
    (sequence: string) => {
      const { current } = currentKeytip;
      if (!current) {
        return undefined;
      }

      const matchingNodes = [...current.children]
        .map((childId) => nodeMap.get(childId))
        .filter((node) => node?.keySequences.slice(-1)[0] === sequence);

      if (matchingNodes.length === 0) {
        return undefined;
      }

      currentKeytip.current = matchingNodes[0];

      if (matchingNodes.length === 1) {
        return matchingNodes[0];
      }

      //TODO: uncomment to add support for overflowSetSequence
      const target = keytipTargetFromSequence(matchingNodes[0]!.keySequences);
      const potentialTargets = targetDocument!.querySelectorAll(target) ?? [];

      return matchingNodes.length < potentialTargets.length
        ? matchingNodes[0]
        : undefined;
    },
    [nodeMap, targetDocument, currentKeytip]
  );

  const getChildren = React.useCallback((node?: KeytipTreeNode) => {
    const target = node ?? currentKeytip.current;
    return target ? [...target.children] : [];
  }, []);

  const getBack = React.useCallback(() => {
    if (currentKeytip.current) {
      const parent = nodeMap.get(currentKeytip.current.parent);
      if (parent) {
        currentKeytip.current = parent;
      } else {
        // if we reached the root, remove the currentKeytip
        currentKeytip.current = undefined;
      }
    }
  }, [nodeMap]);

  const getPartiallyMatched = React.useCallback(
    (sequence: string) => {
      const children = getChildren(currentKeytip.current);
      const matchingNodes = children
        .map((node) => nodeMap.get(node))
        .filter((node) => node?.keySequences.slice(-1)[0].startsWith(sequence));
      return matchingNodes;
    },
    [nodeMap, getChildren]
  );

  return {
    nodeMap,
    addNode,
    updateNode,
    root,
    currentKeytip,
    getMatchingNode,
    getPartiallyMatched,
    getChildren,
    removeNode,
    getBack,
  };
}
