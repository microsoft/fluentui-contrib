import type { KeytipProps, KeytipWithId } from '../components/Keytip';
import * as React from 'react';
import { sequencesToID, createNode } from '../utilities';
import { KTP_ROOT_ID } from '../constants';
import { useFluent } from '@fluentui/react-components';

export type KeytipTreeNode = Pick<
  KeytipProps,
  'keySequences' | 'onExecute' | 'onReturn' | 'dynamic'
> & {
  id: string;
  uniqueId: string;
  target: HTMLElement | null;
  parent: string;
  children: Set<string>;
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
      uniqueId: KTP_ROOT_ID,
      children: new Set(),
      target: null,
      parent: '',
      keySequences: [],
    }),
    []
  );

  const nodeMap = React.useRef<Map<string, KeytipTreeNode>>(
    new Map([[KTP_ROOT_ID, root]])
  );

  const currentKeytip = React.useRef<KeytipTreeNode | undefined>();

  const addNode = React.useCallback((keytip: KeytipWithId) => {
    const node = createNode({
      ...keytip,
      nodeMap: [...nodeMap.current.values()],
    });

    nodeMap.current.set(node.uniqueId, node);

    [...nodeMap.current.values()].forEach((n) => {
      if (n.id === node.parent) {
        n.children.add(node.uniqueId);
      }
    });
  }, []);

  const removeNode = React.useCallback((keytip: KeytipWithId) => {
    const node = nodeMap.current.get(keytip.uniqueId);

    if (node) {
      nodeMap.current.delete(keytip.uniqueId);
      const parentNode = [...nodeMap.current.values()].find(
        (n) => n.id === node.parent
      );

      if (parentNode) {
        parentNode.children.delete(keytip.uniqueId);
      }
    }
  }, []);

  const updateNode = React.useCallback((keytip: KeytipWithId) => {
    const node = nodeMap.current.get(keytip.uniqueId);

    if (node) {
      const prevParent = node.parent;
      const parent = getParentID(keytip.keySequences);
      if (prevParent !== parent) {
        [...nodeMap.current.values()].forEach((node) => {
          if (node.id === prevParent) {
            node.children.delete(keytip.uniqueId);
          }
          if (node.id === parent) {
            node.children.add(keytip.uniqueId);
          }
        });
      }

      nodeMap.current.set(
        keytip.uniqueId,
        createNode({ ...keytip, nodeMap: [...nodeMap.current.values()] })
      );
    }
  }, []);

  const getMatchingNode = React.useCallback(
    (sequence: string) => {
      const { current } = currentKeytip;
      if (!current) {
        return undefined;
      }

      const matchingNodes = [...current.children]
        .map((childId) => nodeMap.current.get(childId))
        .filter((node) => node?.keySequences.slice(-1)[0] === sequence);

      if (matchingNodes.length === 0) {
        return undefined;
      }

      currentKeytip.current = matchingNodes[0];

      return matchingNodes[0];
    },
    [targetDocument]
  );

  const getChildren = React.useCallback((node?: KeytipTreeNode) => {
    const target = node ?? currentKeytip.current;
    return target && target.children ? [...target.children.values()] : [];
  }, []);

  const getNode = React.useCallback((id: string) => {
    const node = [...nodeMap.current.values()].find((node) => node.id === id);
    return node;
  }, []);

  const getBack = React.useCallback(() => {
    if (currentKeytip.current) {
      const parent = getNode(currentKeytip.current.parent);
      if (parent) {
        currentKeytip.current = parent;
      } else {
        // if we reached the root, remove the currentKeytip
        currentKeytip.current = undefined;
      }
    }
  }, []);

  const getPartiallyMatched = React.useCallback(
    (sequence: string) => {
      const children = getChildren(currentKeytip.current);
      const matchingNodes = children
        .map((node) => nodeMap.current.get(node))
        .filter((node) => node?.keySequences.slice(-1)[0].startsWith(sequence));
      return matchingNodes;
    },
    [getChildren]
  );

  const isCurrentKeytipParent = React.useCallback((keytip: KeytipProps) => {
    if (!currentKeytip.current) return false;
    const fullSequence = keytip.keySequences.slice(0, -1);
    const parentID =
      fullSequence.length === 0 ? KTP_ROOT_ID : sequencesToID(fullSequence);
    return currentKeytip.current.id === parentID;
  }, []);

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
    isCurrentKeytipParent,
    getBack,
  };
}
