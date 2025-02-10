import { KTP_SEPARATOR, KTP_ROOT_ID } from '../constants';
import type { KeytipProps } from '../components/Keytip';
import { useTree } from './useTree';
import { renderHook } from '@testing-library/react';

const KTP_FULL_PREFIX = 'ktp-';

// Sample Nodes
/**
 *   Tree should end up looking like (when all added)
 *
 *            a
 *          /   \
 *         c     e
 *        /     / \
 *       b     d   f
 *
 */

function createKeytipProps(
  keySequences: string[],
  uniqueId: string
): KeytipProps & { uniqueId: string } {
  return {
    keySequences,
    uniqueId,
    content: '',
  };
}

// Node B
const keytipIdB = KTP_FULL_PREFIX + 'c' + KTP_SEPARATOR + 'b';
const keytipSequenceB: string[] = ['c', 'b'];
const uniqueIdB = '1';
const keytipPropsB = createKeytipProps(keytipSequenceB, uniqueIdB);
// Node C
const keytipIdC = KTP_FULL_PREFIX + 'c';
const keytipSequenceC: string[] = ['c'];
const uniqueIdC = '2';
const keytipPropsC = createKeytipProps(keytipSequenceC, uniqueIdC);
// Node D
const keytipIdD = KTP_FULL_PREFIX + 'e' + KTP_SEPARATOR + 'd';
const keytipSequenceD: string[] = ['e', 'd'];
const uniqueIdD = '3';
const keytipPropsD = createKeytipProps(keytipSequenceD, uniqueIdD);
// Node E
const keytipIdE = KTP_FULL_PREFIX + 'e';
const keytipSequenceE: string[] = ['e'];
const uniqueIdE = '4';
const keytipPropsE = createKeytipProps(keytipSequenceE, uniqueIdE);
// Node F
const keytipSequenceF: string[] = ['e', 'f'];
const uniqueIdF = '5';
const keytipPropsF = createKeytipProps(keytipSequenceF, uniqueIdF);

function verifySampleTree(tree: ReturnType<typeof useTree>) {
  const nodeB = tree.nodeMap.current.get(uniqueIdB);
  const nodeC = tree.nodeMap.current.get(uniqueIdC);
  const nodeD = tree.nodeMap.current.get(uniqueIdD);
  const nodeE = tree.nodeMap.current.get(uniqueIdE);
  const nodeF = tree.nodeMap.current.get(uniqueIdF);

  // Test each node's parent and children
  expect(nodeB?.parent).toEqual(keytipIdC);
  expect(nodeB?.children.size).toBe(0);

  expect(nodeC?.parent).toEqual(KTP_ROOT_ID);
  expect(nodeC?.children.size).toBe(1);
  expect(nodeC?.children).toContain(uniqueIdB);

  expect(nodeD?.parent).toEqual(keytipIdE);
  expect(nodeD?.children.size).toBe(0);

  expect(nodeE?.parent).toEqual(KTP_ROOT_ID);
  expect(nodeE?.children.size).toBe(2);
  expect(nodeE?.children).toContain(uniqueIdD);
  expect(nodeE?.children).toContain(uniqueIdF);

  expect(nodeF?.parent).toEqual(keytipIdE);
  expect(nodeF?.children.size).toBe(0);

  // Test root's children
  expect(tree.root.children.size).toBe(2);
  expect(tree.root.children).toContain(uniqueIdC);
  expect(tree.root.children).toContain(uniqueIdE);
}

describe('useTree', () => {
  describe('addNode', () => {
    it('creates a correct Tree when many nodes are added in order', () => {
      const { result } = renderHook(() => useTree());

      result.current.addNode(keytipPropsC);
      result.current.addNode(keytipPropsE);
      result.current.addNode(keytipPropsB);
      result.current.addNode(keytipPropsD);
      result.current.addNode(keytipPropsF);

      verifySampleTree(result.current);
    });

    it('creates a correct Tree when many nodes are added out of order', () => {
      const { result } = renderHook(() => useTree());

      result.current.addNode(keytipPropsF);
      result.current.addNode(keytipPropsC);
      result.current.addNode(keytipPropsB);
      result.current.addNode(keytipPropsD);
      result.current.addNode(keytipPropsE);

      verifySampleTree(result.current);
    });

    it('should initialize with default node', () => {
      const { result } = renderHook(() => useTree());

      expect(result.current.root).toEqual({
        id: KTP_ROOT_ID,
        children: new Set(),
        isShortcut: false,
        target: null,
        hasMenu: false,
        parent: '',
        keySequences: [],
        uniqueId: KTP_ROOT_ID,
      });

      expect(Object.keys(result.current.nodeMap)).toHaveLength(1);
    });

    it('should add node under root', () => {
      const { result } = renderHook(() => useTree());

      result.current.addNode(keytipPropsC);

      const nodeC = result.current.nodeMap.current.get(uniqueIdC);

      expect(result.current.nodeMap.current.size).toBe(2);
      expect(result.current.root.children.size).toBe(1);
      expect(result.current.root.children).toContain(uniqueIdC);
      expect(nodeC?.id).toEqual(keytipIdC);
      expect(nodeC?.children.size).toBe(0);
      expect(nodeC?.parent).toEqual(KTP_ROOT_ID);
    });

    it('should add node two levels from root', () => {
      const { result } = renderHook(() => useTree());

      result.current.addNode(keytipPropsC);
      result.current.addNode(keytipPropsB);

      const nodeC = result.current.nodeMap.current.get(uniqueIdC);

      expect(nodeC?.children.size).toBe(1);
      expect(nodeC?.children).toContain(uniqueIdB);

      const nodeB = result.current.nodeMap.current.get(uniqueIdB);

      expect(nodeB?.id).toEqual(keytipIdB);
      expect(nodeB?.children.size).toBe(0);
      expect(nodeB?.parent).toEqual(keytipIdC);
    });

    it('add a child node before its parent', () => {
      const { result } = renderHook(() => useTree());

      result.current.addNode(keytipPropsB);

      const nodeB = result.current.nodeMap.current.get(uniqueIdB);
      // Test B has C set as parent
      expect(nodeB?.parent).toEqual(keytipIdC);
      // Test root still has no children
      expect(result.current.root.children.size).toBe(0);

      result.current.addNode(keytipPropsC);

      const nodeC = result.current.nodeMap.current.get(uniqueIdC);
      // Test C has B as its child
      expect(nodeC?.children.size).toBe(1);
      expect(nodeC?.children).toContain(uniqueIdB);

      // Test root has C as its child
      expect(result.current.root.children.size).toBe(1);
      expect(result.current.root.children).toContain(uniqueIdC);
    });
  });

  describe('updateNode', () => {
    it('correctly updates node attributes', () => {
      const { result } = renderHook(() => useTree());

      result.current.addNode(keytipPropsB);

      const updatedKeytipProps = {
        ...keytipPropsB,
        dynamic: true,
      };

      result.current.updateNode(updatedKeytipProps);
      const nodeB = result.current.nodeMap.current.get(uniqueIdB);
      expect(nodeB?.dynamic).toEqual(true);
    });

    it('correctly updates node when keytip sequence changes', () => {
      const { result } = renderHook(() => useTree());

      result.current.addNode(keytipPropsC);
      result.current.addNode(keytipPropsB);

      const updatedKeytipId = KTP_FULL_PREFIX + 'c' + KTP_SEPARATOR + 'g';
      const updatedKeytipSequence = ['c', 'g'];
      const updatedKeytipProps = createKeytipProps(
        updatedKeytipSequence,
        uniqueIdB
      );

      result.current.updateNode(updatedKeytipProps);

      const updatedNode = result.current.nodeMap.current.get(uniqueIdB);
      const updatedNodeParent = result.current.nodeMap.current.get(uniqueIdC);
      expect(updatedNode?.id).toEqual(updatedKeytipId);
      expect(updatedNode?.keySequences).toEqual(updatedKeytipSequence);
      expect(updatedNodeParent?.children).toContain(uniqueIdB);
    });

    it('correctly updates when the keytips parent has changed', () => {
      const { result } = renderHook(() => useTree());
      // Add all nodes to the tree
      result.current.addNode(keytipPropsC);
      result.current.addNode(keytipPropsE);
      result.current.addNode(keytipPropsB);
      result.current.addNode(keytipPropsD);
      result.current.addNode(keytipPropsF);

      verifySampleTree(result.current);

      // Change node 'd' to have parent 'c' instead of parent 'e'
      /**
       *            a
       *          /   \
       *         c     e
       *        / \     \
       *       b   d     f
       */

      const updatedKeytipId = KTP_FULL_PREFIX + 'c' + KTP_SEPARATOR + 'd';

      const updatedKeytipSequence = ['c', 'd'];

      const updatedKeytipProps = createKeytipProps(
        updatedKeytipSequence,
        uniqueIdD
      );

      result.current.updateNode(updatedKeytipProps);

      const updatedNode = result.current.nodeMap.current.get(uniqueIdD);
      const updatedParent = result.current.nodeMap.current.get(uniqueIdC);
      const previousParent = result.current.nodeMap.current.get(uniqueIdE);

      // Validate updated node properties
      expect(updatedNode?.id).toEqual(updatedKeytipId);
      expect(updatedNode?.parent).toEqual(keytipIdC);
      // Validate new parent properties
      expect(updatedParent?.children).toContain(uniqueIdD);
      // Validate old parent properties, shouldn't have it in children
      expect(previousParent?.children.has(uniqueIdD)).toBe(false);

      // Revert, make node 'd' have parent 'e' again
      result.current.updateNode(keytipPropsD);
      const nodeD = result.current.nodeMap.current.get(uniqueIdD);
      const nodeC = result.current.nodeMap.current.get(uniqueIdC);
      const nodeE = result.current.nodeMap.current.get(uniqueIdE);
      // Node props are back to original
      expect(nodeD?.id).toEqual(keytipIdD);
      expect(nodeD?.parent).toEqual(keytipIdE);
      // E has D as a child
      expect(nodeE?.children).toContain(uniqueIdD);
      // C does not have D as a child
      expect(nodeC?.children.has(uniqueIdD)).toBe(false);
      expect(nodeC?.children.has(updatedKeytipId)).toBe(false);
    });
  });

  describe('removeNode', () => {
    it('removes a child node of root and has no children', () => {
      const { result } = renderHook(() => useTree());
      result.current.addNode(keytipPropsC);
      // Remove C from the tree
      result.current.removeNode(keytipPropsC.uniqueId);
      // Verify that C is not in the node map
      expect(result.current.nodeMap.current.get(uniqueIdC)).toBeUndefined();
      // Verify that root has no children
      expect(result.current.root.children.size).toBe(0);
    });

    it('removes multiple nodes in order correctly', () => {
      const { result } = renderHook(() => useTree());

      result.current.addNode(keytipPropsC);
      result.current.addNode(keytipPropsB);
      // Remove B
      result.current.removeNode(keytipPropsB.uniqueId);
      // Verify that B is not in the node map
      expect(result.current.nodeMap.current.get(uniqueIdB)).toBeUndefined();
      // Verify C has no children
      const nodeC = result.current.nodeMap.current.get(uniqueIdC);
      expect(nodeC?.children.size).toBe(0);
      // Remove C
      result.current.removeNode(keytipPropsC.uniqueId);
      // Verify that C is not in the node map
      expect(result.current.nodeMap.current.get(uniqueIdC)).toBeUndefined();
      // Verify that root has no children
      expect(result.current.root.children.size).toBe(0);
    });

    it('removed node will be able to be re-added in place', () => {
      const { result } = renderHook(() => useTree());

      result.current.addNode(keytipPropsC);
      result.current.addNode(keytipPropsB);
      // Remove C
      result.current.removeNode(keytipPropsC.uniqueId);
      // Verify that C is not in the node map
      expect(result.current.nodeMap.current.get(uniqueIdC)).toBeUndefined();
      // Verify that B still has C as its parent
      expect(result.current.nodeMap.current.get(uniqueIdB)?.parent).toEqual(
        keytipIdC
      );
      // Verify that root has no children
      expect(result.current.root.children.size).toBe(0);
      // Re-add C
      result.current.addNode(keytipPropsC);
      // Verify that C is in the node map
      const nodeC = result.current.nodeMap.current.get(uniqueIdC);
      // Verify that C's parent is the root
      expect(nodeC?.parent).toEqual(KTP_ROOT_ID);
      // Verify that the root has C as a child
      expect(result.current.root.children.size).toBe(1);
      expect(result.current.root.children).toContain(uniqueIdC);
      // Verify that B is a child of C
      expect(nodeC?.children.size).toBe(1);
      expect(nodeC?.children).toContain(uniqueIdB);
      // Verify B has parent C
      expect(result.current.nodeMap.current.get(uniqueIdB)?.parent).toEqual(
        keytipIdC
      );
    });
    it('correctly removes a node when overflowSetSequence is defined', () => {
      const { result } = renderHook(() => useTree());

      const keytipPropsEWithOverflow = {
        ...keytipPropsE,
        overflowSetSequence: keytipSequenceC,
      };

      result.current.addNode(keytipPropsC);
      result.current.addNode(keytipPropsEWithOverflow);
      // Remove E
      result.current.removeNode(keytipPropsEWithOverflow.uniqueId);
      const nodeE = result.current.nodeMap.current.get(uniqueIdE);
      expect(nodeE).toBeUndefined();
      const nodeC = result.current.nodeMap.current.get(uniqueIdC);
      expect(nodeC?.children.size).toBe(0);
    });
  });

  describe('matching tests', () => {
    // Matching tests tree
    /**
     *   Tree should end up looking like:
     *
     *              a
     *           /  |  \
     *          q   e1  e2
     *             / \
     *            k   p
     *
     */

    // Node Q
    const keytipSequenceQ: string[] = ['q'];
    const uniqueIdQ = '1';
    const keytipPropsQ = createKeytipProps(keytipSequenceQ, uniqueIdQ);

    // Node K
    const keytipSequenceK: string[] = ['e1', 'k'];
    const uniqueIdK = '2';
    const keytipPropsK = createKeytipProps(keytipSequenceK, uniqueIdK);

    // Node P
    const keytipSequenceP: string[] = ['e1', 'p'];
    const uniqueIdP = '3';
    const keytipPropsP = createKeytipProps(keytipSequenceP, uniqueIdP);

    // Node E1
    const keytipIdE1 = KTP_FULL_PREFIX + 'e' + KTP_SEPARATOR + '1';
    const keytipSequenceE1: string[] = ['e1'];
    const uniqueIdE1 = '4';
    const keytipPropsE1 = createKeytipProps(keytipSequenceE1, uniqueIdE1);

    // Node E2
    const keytipIdE2 = KTP_FULL_PREFIX + 'e' + KTP_SEPARATOR + '2';
    const keytipSequenceE2: string[] = ['e2'];
    const uniqueIdE2 = '5';
    const keytipPropsE2 = createKeytipProps(keytipSequenceE2, uniqueIdE2);

    const { result } = renderHook(() => useTree());

    beforeEach(() => {
      result.current.addNode(keytipPropsQ);
      result.current.addNode(keytipPropsK);
      result.current.addNode(keytipPropsP);
      result.current.addNode(keytipPropsE1);
      result.current.addNode(keytipPropsE2);
    });

    describe('getMatchingNode', () => {
      it('gets the matched node under the specified node', () => {
        result.current.currentKeytip.current = result.current.root;
        expect(result.current.getMatchingNode('n')).toBeUndefined();
        expect(result.current.getMatchingNode('q')).toEqual(
          result.current.nodeMap.current.get(uniqueIdQ)
        );
      });
    });

    describe('getPartiallyMatchedNodes', () => {
      it('gets the correct list of matching nodes', () => {
        result.current.currentKeytip.current = result.current.root;
        expect(result.current.getPartiallyMatched('n')).toHaveLength(0);
        const matchingENodes = result.current.getPartiallyMatched('e');
        expect(matchingENodes).toHaveLength(2);
        const matchingNodeIDs = matchingENodes.map((node) => node?.id);
        expect(matchingNodeIDs).toContain(keytipIdE1);
        expect(matchingNodeIDs).toContain(keytipIdE2);
      });
    });
  });

  describe('getChildren', () => {
    it('works for a passed in node', () => {
      const { result } = renderHook(() => useTree());
      result.current.addNode(keytipPropsC);
      result.current.addNode(keytipPropsE);
      result.current.addNode(keytipPropsB);
      result.current.addNode(keytipPropsD);
      result.current.addNode(keytipPropsF);

      const childrenOfE = result.current.getChildren(
        result.current.nodeMap.current.get(uniqueIdE)
      );

      expect(childrenOfE).toHaveLength(2);
      expect(childrenOfE).toContain(uniqueIdD);
      expect(childrenOfE).toContain(uniqueIdF);
    });

    it('gets the children of the current node when no parameter is passed', () => {
      const { result } = renderHook(() => useTree());

      result.current.addNode(keytipPropsC);
      result.current.addNode(keytipPropsE);
      result.current.addNode(keytipPropsB);
      result.current.addNode(keytipPropsD);
      result.current.addNode(keytipPropsF);

      result.current.currentKeytip.current =
        result.current.nodeMap.current.get(uniqueIdE);

      const childrenOfE = result.current.getChildren();
      expect(childrenOfE).toHaveLength(2);
      expect(childrenOfE).toContain(uniqueIdD);
      expect(childrenOfE).toContain(uniqueIdF);
    });
  });

  describe('isParent', () => {
    it('matches the root', () => {
      const { result } = renderHook(() => useTree());
      result.current.currentKeytip.current = result.current.root;
      expect(result.current.isCurrentKeytipParent(keytipPropsC)).toEqual(true);
    });

    it('matches a keytip to its parent', () => {
      const { result } = renderHook(() => useTree());
      result.current.addNode(keytipPropsC);
      result.current.currentKeytip.current =
        result.current.nodeMap.current.get(uniqueIdC);
      expect(result.current.isCurrentKeytipParent(keytipPropsB)).toEqual(true);
    });
  });
});
