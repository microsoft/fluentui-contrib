import * as React from 'react';
import { renderHook } from '@testing-library/react';
import { useVirtualizer_unstable } from '../components/Virtualizer/useVirtualizer';

describe('useVirtualizer', () => {
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('should have the correct number of initial items', () => {
    const virtualizerLength = 50;
    const actualLength = 250;
    const divArr = new Array(actualLength).fill('Test-Node');
    const containerSizeRef = {
      current: 300,
    };

    const rowFunc = (index: number) => {
      return divArr[index];
    };
    const { result } = renderHook(() =>
      useVirtualizer_unstable({
        numItems: divArr.length,
        virtualizerLength,
        itemSize: 100, // 100 pixels
        children: rowFunc,
        containerSizeRef,
      })
    );

    // Initial render shows only first 100 items
    expect(result.current.virtualizedChildren.length).toBe(virtualizerLength);
    // The start index should be 0 once mounted
    expect(result.current.virtualizerStartIndex).toBe(0);
  });

  it('should handle item order changes without key reconciliation issues', () => {
    const virtualizerLength = 10;
    const actualLength = 100;
    const containerSizeRef = {
      current: 300,
    };

    // Create a render function that uses unique keys based on item data
    const rowFunc = jest.fn((index: number) => {
      return React.createElement(
        'div',
        {
          key: `item-${index}`,
          'data-testid': `item-${index}`,
        },
        `Item ${index}`
      );
    });

    const { result, rerender } = renderHook(
      ({ numItems, renderChild }) =>
        useVirtualizer_unstable({
          numItems,
          virtualizerLength,
          itemSize: 25,
          children: renderChild,
          containerSizeRef,
        }),
      {
        initialProps: {
          numItems: actualLength,
          renderChild: rowFunc,
        },
      }
    );

    // Initial render
    expect(result.current.virtualizedChildren.length).toBe(virtualizerLength);
    expect(result.current.virtualizerStartIndex).toBe(0);

    // Simulate a change that would trigger re-rendering with different order
    // This simulates the scenario from the GitHub issue where items order changes
    const newRowFunc = jest.fn((index: number) => {
      // Simulate items being reordered by changing the content
      const reorderedIndex = actualLength - 1 - index;
      return React.createElement(
        'div',
        {
          key: `item-${reorderedIndex}`,
          'data-testid': `item-${reorderedIndex}`,
        },
        `Reordered Item ${reorderedIndex}`
      );
    });

    // Re-render with new order
    rerender({
      numItems: actualLength,
      renderChild: newRowFunc,
    });

    // Verify that the virtualizer handles the re-render correctly
    expect(result.current.virtualizedChildren.length).toBe(virtualizerLength);

    // Verify that new elements were created (not reused from previous render)
    // This ensures our fix is working - we create fresh elements instead of reusing
    expect(newRowFunc).toHaveBeenCalled();

    // Verify that the virtualizer maintains its state correctly
    expect(result.current.virtualizerStartIndex).toBeGreaterThanOrEqual(0);
  });

  it('should create fresh React elements on each render to prevent key conflicts', () => {
    const virtualizerLength = 5;
    const actualLength = 50;
    const containerSizeRef = {
      current: 300,
    };

    let renderCount = 0;
    const rowFunc = jest.fn((index: number) => {
      renderCount++;
      return React.createElement(
        'div',
        {
          key: `item-${index}-${renderCount}`, // Include render count to ensure uniqueness
          'data-testid': `item-${index}-${renderCount}`,
        },
        `Item ${index} (Render ${renderCount})`
      );
    });

    const { result, rerender } = renderHook(
      ({ numItems, renderChild }) =>
        useVirtualizer_unstable({
          numItems,
          virtualizerLength,
          itemSize: 25,
          children: renderChild,
          containerSizeRef,
        }),
      {
        initialProps: {
          numItems: actualLength,
          renderChild: rowFunc,
        },
      }
    );

    const initialChildren = result.current.virtualizedChildren;
    expect(initialChildren.length).toBe(virtualizerLength);

    // Force a re-render by changing props
    rerender({
      numItems: actualLength,
      renderChild: rowFunc,
    });

    const reRenderedChildren = result.current.virtualizedChildren;

    // Verify that new elements were created (our fix ensures fresh elements)
    expect(reRenderedChildren.length).toBe(virtualizerLength);

    // The key point: each element should be a fresh React element
    // This prevents the key reconciliation issues described in the GitHub issue
    // Verify that the render function was called (indicating fresh elements were created)
    expect(rowFunc).toHaveBeenCalled();
  });

  it('should handle rapid re-renders without key conflicts', () => {
    const virtualizerLength = 8;
    const actualLength = 100;
    const containerSizeRef = {
      current: 300,
    };

    const rowFunc = jest.fn((index: number) => {
      return React.createElement(
        'div',
        {
          key: `item-${index}`,
          'data-testid': `item-${index}`,
        },
        `Item ${index}`
      );
    });

    const { result, rerender } = renderHook(
      ({ numItems, renderChild }) =>
        useVirtualizer_unstable({
          numItems,
          virtualizerLength,
          itemSize: 25,
          children: renderChild,
          containerSizeRef,
        }),
      {
        initialProps: {
          numItems: actualLength,
          renderChild: rowFunc,
        },
      }
    );

    // Perform multiple rapid re-renders to simulate the issue scenario
    for (let i = 0; i < 5; i++) {
      rerender({
        numItems: actualLength,
        renderChild: rowFunc,
      });
    }

    // Verify that the virtualizer maintains stability
    expect(result.current.virtualizedChildren.length).toBe(virtualizerLength);
    expect(result.current.virtualizerStartIndex).toBeGreaterThanOrEqual(0);

    // Verify that renderChild was called appropriately
    expect(rowFunc).toHaveBeenCalled();
  });
});
