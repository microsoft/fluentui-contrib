import * as React from 'react';
import { useFocusFinders } from '@fluentui/react-components';

/**
 * returns a method to find the parent row of the current row
 */
export const useFindParentRow = () => {
  const { findPrevFocusable } = useFocusFinders();
  return React.useCallback(
    (currentRow: HTMLElement): HTMLElement | null => {
      const currentLevel = Number(currentRow.getAttribute('aria-level'));
      if (isNaN(currentLevel)) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(
            `TreeGrid: aria-level ${currentLevel} is not a number, at row:`,
            currentRow
          );
        }
        return null;
      }
      if (currentLevel === 1) {
        return null;
      }
      let element = currentRow;
      while (Number(element.getAttribute('aria-level')) !== currentLevel - 1) {
        const nextElement = findPrevFocusable(element);
        if (!nextElement) {
          return null;
        }
        element = nextElement;
      }
      if (element !== currentRow) {
        return element;
      }
      return null;
    },
    [findPrevFocusable]
  );
};
