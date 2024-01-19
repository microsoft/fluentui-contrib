import { ArrowLeft, ArrowRight, Enter } from '@fluentui/keyboard-keys';
import { isHTMLElement, useEventCallback } from '@fluentui/react-utilities';
import * as React from 'react';

export type TreeGridRowId = string;

export const useTreeGridOpenRows = () => {
  const [openRows, setOpenRows] = React.useState(
    () => new Set<TreeGridRowId>()
  );
  const openRow = React.useCallback((rowId: TreeGridRowId) => {
    setOpenRows((previousSet) => new Set(previousSet).add(rowId));
  }, []);
  const closeRow = React.useCallback((rowId: TreeGridRowId) => {
    setOpenRows((previousSet) => {
      const newSet = new Set(previousSet);
      newSet.delete(rowId);
      return newSet;
    });
  }, []);
  const handleKeyDown = useEventCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (isHTMLElement(event.target) && event.target.role === 'row') {
        switch (event.key) {
          case Enter: {
            return event.target.click();
          }
          case ArrowRight: {
            if (
              event.target.getAttribute('aria-expanded') === 'false' &&
              event.target.dataset.treeGridRowId
            ) {
              openRow(event.target.dataset.treeGridRowId);
            }
            return;
          }
          case ArrowLeft: {
            if (
              event.target.getAttribute('aria-expanded') === 'true' &&
              event.target.dataset.treeGridRowId
            ) {
              closeRow(event.target.dataset.treeGridRowId);
            }
            return;
          }
        }
      }
    }
  );
  const handleClick = useEventCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!isHTMLElement(event.target)) {
        return;
      }
      let target: HTMLElement;
      if (event.target.role === 'row') {
        target = event.target;
      } else if (event.target.parentElement?.role === 'row') {
        target = event.target.parentElement;
      } else {
        return;
      }
      if (target.dataset.treeGridRowId) {
        const ariaExpanded = target.getAttribute('aria-expanded');
        if (ariaExpanded === 'false') {
          openRow(target.dataset.treeGridRowId);
        } else if (ariaExpanded === 'true') {
          closeRow(target.dataset.treeGridRowId);
        }
      }
    }
  );
  return {
    openRows,
    setOpenRows,
    getTreeGridProps: () => ({
      onKeyDown: handleKeyDown,
      onClick: handleClick,
    }),
    getTreeGridRowProps: (props: { id?: TreeGridRowId }) => ({
      'data-tree-grid-row-id': props.id,
      'aria-expanded': props.id ? openRows.has(props.id) : undefined,
    }),
  };
};
