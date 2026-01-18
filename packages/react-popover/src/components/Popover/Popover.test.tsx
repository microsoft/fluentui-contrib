import * as React from 'react';
import { Popover } from './Popover';
import { renderHook } from '@testing-library/react';
import { usePopover_unstable } from './usePopover';
import { isConformant } from '../../testing/isConformant';

describe('Popover', () => {
  isConformant({
    Component: Popover,
    displayName: 'Popover',
    requiredProps: { children: <div>hello</div> },
    disabledTests: [
      // Popover does not render DOM elements
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      // Popover does not have own styles
      'make-styles-overrides-win',
    ],
    testOptions: {
      'consistent-callback-args': {
        legacyCallbacks: ['onOpenChange'],
      },
    },
  });

  /**
   * Note: see more visual regression tests for Popover in /apps/vr-tests.
   */
  it('Should create popover state with id', () => {
    // Act
    const { result } = renderHook(() =>
      usePopover_unstable({ children: <div /> })
    );

    // Assert
    expect(result.current.id).toBeDefined();
    expect(result.current.id).toContain('popover-');
  });

  it('Should default to closed state', () => {
    // Act
    const { result } = renderHook(() =>
      usePopover_unstable({ children: <div /> })
    );

    // Assert
    expect(result.current.open).toBe(false);
  });

  it('Should respect defaultOpen prop', () => {
    // Act
    const { result } = renderHook(() =>
      usePopover_unstable({ children: <div />, defaultOpen: true })
    );

    // Assert
    expect(result.current.open).toBe(true);
  });

  it('Should respect controlled open prop', () => {
    // Act
    const { result } = renderHook(() =>
      usePopover_unstable({ children: <div />, open: true })
    );

    // Assert
    expect(result.current.open).toBe(true);
  });
});
