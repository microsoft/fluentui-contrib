import type { KeytipProps, KeytipWithId } from '../components/Keytip';
import * as React from 'react';
import { sequencesToID, createNode, createAliasNode } from '../utilities/index';
import { KTP_ROOT_ID } from '../constants';
import { useFluent } from '@fluentui/react-components';

export type KeytipTreeNode = Pick<
  KeytipProps,
  | 'keySequences'
  | 'onExecute'
  | 'onReturn'
  | 'dynamic'
  | 'hasMenu'
  | 'isShortcut'
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
      isShortcut: false,
      target: null,
      parent: '',
      hasMenu: false,
      keySequences: [],
    }),
    []
  );

  const nodeMap = React.useRef<Map<string, KeytipTreeNode>>(
    new Map([[KTP_ROOT_ID, root]])
  );

  const currentKeytip = React.useRef<KeytipTreeNode | undefined>();

  const addNode = React.useCallback((newNode: KeytipWithId) => {
    // if newNode has isShortcut:true, create alias node under the root
    if (newNode.isShortcut) {
      const alias = createAliasNode(newNode);
      nodeMap.current.set(alias.uniqueId, alias);
      const root = nodeMap.current.get(KTP_ROOT_ID);
      root?.children.add(alias.uniqueId);
    }

    const node = createNode({
      ...newNode,
      nodeMap: nodeMap.current,
    });

    nodeMap.current.set(node.uniqueId, node);

    // if there are nodes that are parent of current node, add it to their children
    for (const n of nodeMap.current.values()) {
      if (n.id === node.parent) {
        n.children.add(node.uniqueId);
      }
    }
  }, []);

  const removeNode = React.useCallback((id: string) => {
    const node = nodeMap.current.get(id);

    if (node) {
      nodeMap.current.delete(id);

      // find and remove the node from its parent
      const parentNode = Array.from(nodeMap.current.values()).find(
        (n) => n.id === node.parent
      );

      if (parentNode) {
        parentNode.children.delete(id);
      }
    }
  }, []);

  const updateNode = React.useCallback((keytip: KeytipWithId) => {
    const node = nodeMap.current.get(keytip.uniqueId);

    if (node) {
      const prevParent = node.parent;
      const parent = getParentID(keytip.keySequences);

      if (prevParent !== parent) {
        for (const node of nodeMap.current.values()) {
          if (node.id === prevParent) {
            node.children.delete(keytip.uniqueId);
          }

          if (node.id === parent) {
            node.children.add(keytip.uniqueId);
          }
        }
      }

      nodeMap.current.set(
        keytip.uniqueId,
        createNode({ ...keytip, nodeMap: nodeMap.current })
      );
    }
  }, []);

  const getMatchingNode = React.useCallback(
    (sequence: string) => {
      const { current } = currentKeytip;

      if (!current) {
        return undefined;
      }

      const matchingNodes = Array.from(current.children)
        .map((childId) => nodeMap.current.get(childId))
        .filter((node) => node?.keySequences.slice(-1)[0] === sequence);

      if (matchingNodes.length === 0) {
        return undefined;
      }

      const matched = matchingNodes[0];

      if (!matched) return undefined;

      currentKeytip.current = matched;

      return matched;
    },
    [targetDocument]
  );

  const getChildren = React.useCallback((node?: KeytipTreeNode) => {
    const target = node ?? currentKeytip.current;
    return target && target.children
      ? Array.from(target.children.values())
      : [];
  }, []);

  const getBack = React.useCallback(() => {
    if (currentKeytip.current) {
      const parent = Array.from(nodeMap.current.values()).find(
        (n) => n.id === currentKeytip.current?.parent
      );
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
    const sequence = keytip.keySequences.slice(0, -1) ?? [];
    const parentID =
      sequence.length === 0 ? KTP_ROOT_ID : sequencesToID(sequence);
    return currentKeytip.current.id === parentID;
  }, []);

  const getNode = (id: string) =>
    [...nodeMap.current.values()].find((node) => node.id === id);

  return {
    nodeMap,
    addNode,
    getNode,
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
