import * as React from 'react';
import { useTimeout, useAnimationFrame } from '@fluentui/react-utilities';

import { scrollToItemDynamic } from '../Utilities';
import type { ScrollToItemDynamicParams } from '../Utilities';

/**
 * Reference object for measured elements, keyed by index string.
 */
type MeasureRefObject = React.MutableRefObject<{
  [key: string]: (HTMLElement & { handleResize?: () => void }) | null;
}>;

/**
 * Parameters for configuring the useScrollToItemDynamic hook.
 */
type UseScrollToItemDynamicParams = {
  /** Scroll axis direction */
  axis: 'horizontal' | 'vertical';
  /** Whether the scroll direction is reversed */
  reversed?: boolean;
  /** Gap between items in pixels */
  gap: number;
  /** Reference to the scrollable container element */
  scrollViewRef: React.RefObject<HTMLDivElement | null>;
  /** Function to get the size of an item at a given index */
  getItemSize: (index: number) => number;
  /** Function to get the total size of all items */
  getTotalSize: () => number;
  /** Optional function to get the offset for a specific index */
  getOffsetForIndex?: (index: number) => number | null | undefined;
  /** Reference object containing measured elements */
  measureRefObject: MeasureRefObject;
  /** Maximum number of correction attempts */
  maxCorrections?: number;
  /** Timeout in milliseconds between stability checks */
  stabilityTimeout?: number;
  /** Callback to set a flagged index for rendering */
  setFlaggedIndex?: (index: number | null) => void;
  /** Callback invoked when the scroll operation completes successfully */
  onOperationComplete?: (index: number) => void;
  /** Callback invoked when the scroll operation is cancelled */
  onOperationCancel?: (index: number, reason: 'user' | 'cancelled') => void;
};

/**
 * Return type for the useScrollToItemDynamic hook.
 */
type UseScrollToItemDynamicReturn = {
  /** Initiates a scroll operation to the specified index */
  start: (
    index: number,
    behavior: ScrollBehavior,
    callback?: (index: number) => void
  ) => void;
  /** Handles when an item's size is measured or changes */
  handleItemMeasured: (index: number, size: number, delta: number) => void;
  /** Handles when the target item is rendered in the DOM */
  handleRendered: (index: number) => boolean;
  /** Cancels the current scroll operation */
  cancel: () => void;
  /** Returns true if a scroll operation is currently active */
  isActive: () => boolean;
};

/** Handle for timeout operations */
type TimeoutHandle = number;

/**
 * Internal state for an active scroll-to operation.
 */
type ScrollOperation = {
  /** Unique identifier for this operation */
  id: number;
  /** Target item index to scroll to */
  targetIndex: number;
  /** Scroll behavior (smooth, instant, etc.) */
  behavior: ScrollBehavior;
  /** Optional callback to invoke when operation completes */
  callback?: (index: number) => void;
  /** Number of correction attempts remaining */
  correctionsRemaining: number;
  /** Whether a correction is currently pending */
  pendingCorrection: boolean;
  /** Timeout ID for stability checks */
  stabilityTimeoutId: TimeoutHandle | null;
  /** Animation frame ID for scheduled corrections */
  scheduleFrameId: number | null;
  /** Current status of the operation */
  status: 'initial' | 'correcting' | 'stable';
  /** Whether the current scroll is programmatic (not user-initiated) */
  isProgrammaticScroll: boolean;
  /** Timestamp of the last measurement */
  lastMeasurementTimestamp: number;
  /** Whether the target item has been measured */
  hasMeasuredTarget: boolean;
  /** Number of stable iterations remaining before finalization */
  stableIterations: number;
  /** Whether initial alignment has been performed */
  initialAlignmentPerformed: boolean;
  /** Whether we're waiting for smooth scroll animation to complete */
  awaitingSmoothScroll: boolean;
};

/** Default maximum number of correction attempts */
const DEFAULT_MAX_CORRECTIONS = 10;
/** Default timeout in milliseconds between stability checks */
const DEFAULT_STABILITY_TIMEOUT = 150;
/** Pixel tolerance for viewport alignment */
const VIEWPORT_TOLERANCE = 1;
/** Number of stable iterations required before finalization */
const DEFAULT_CORRECTION_SETTLE = 2;
/** Delay to wait for smooth scroll animation to complete before corrections */
const SMOOTH_SCROLL_DELAY = 500;

/**
 * Hook for managing scroll-to operations in dynamic virtualized lists.
 * Handles iterative corrections and stability checks when items have
 * dynamic heights that change after rendering.
 *
 * @returns Controller with methods to start, handle measurements, and cancel scroll operations
 */
export function useScrollToItemDynamic({
  axis,
  reversed,
  gap,
  scrollViewRef,
  getItemSize,
  getTotalSize,
  getOffsetForIndex,
  measureRefObject,
  maxCorrections = DEFAULT_MAX_CORRECTIONS,
  stabilityTimeout = DEFAULT_STABILITY_TIMEOUT,
  setFlaggedIndex,
  onOperationComplete,
  onOperationCancel,
}: UseScrollToItemDynamicParams): UseScrollToItemDynamicReturn {
  const operationRef = React.useRef<ScrollOperation | null>(null);
  const scrollListenerRef = React.useRef<((event: Event) => void) | null>(null);
  const operationIdRef = React.useRef(0);
  const scheduleCorrectionRef = React.useRef<
    ((operation: ScrollOperation) => void) | null
  >(null);
  const scheduleStabilityCheckRef = React.useRef<
    ((operation: ScrollOperation) => void) | null
  >(null);

  const scheduleCorrection = React.useCallback((operation: ScrollOperation) => {
    scheduleCorrectionRef.current?.(operation);
  }, []);

  const scheduleStabilityCheck = React.useCallback(
    (operation: ScrollOperation) => {
      scheduleStabilityCheckRef.current?.(operation);
    },
    []
  );

  const [setStabilityTimeout, clearStabilityTimeoutFn] = useTimeout();
  const [requestProgrammaticFrame] = useAnimationFrame();
  const [requestCorrectionFrame, cancelCorrectionFrame] = useAnimationFrame();

  const clearStabilityTimeout = React.useCallback(
    (operation: ScrollOperation) => {
      if (operation.stabilityTimeoutId === null) {
        return;
      }

      clearStabilityTimeoutFn();
      operation.stabilityTimeoutId = null;
    },
    [clearStabilityTimeoutFn]
  );

  const cancelScheduledFrame = React.useCallback(
    (operation: ScrollOperation) => {
      if (operation.scheduleFrameId === null) {
        return;
      }

      cancelCorrectionFrame();
      operation.scheduleFrameId = null;
    },
    [cancelCorrectionFrame]
  );

  const detachScrollListener = React.useCallback(() => {
    const listener = scrollListenerRef.current;
    const scrollView = scrollViewRef.current;

    if (listener && scrollView) {
      scrollView.removeEventListener('scroll', listener);
    }
    scrollListenerRef.current = null;
  }, [scrollViewRef]);

  /**
   * Clears the current operation, cancelling all timers and cleaning up state.
   */
  const clearOperation = React.useCallback(
    (reason?: 'user' | 'cancelled') => {
      const active = operationRef.current;
      if (!active) {
        return;
      }

      clearStabilityTimeout(active);
      cancelScheduledFrame(active);

      detachScrollListener();
      operationRef.current = null;
      setFlaggedIndex?.(null);

      if (reason && onOperationCancel) {
        onOperationCancel(active.targetIndex, reason);
      }
    },
    [
      cancelScheduledFrame,
      clearStabilityTimeout,
      detachScrollListener,
      onOperationCancel,
      setFlaggedIndex,
    ]
  );

  /**
   * Gets the DOM element for a given index from the measure ref object.
   */
  const getTargetElement = React.useCallback(
    (index: number) => {
      const element = measureRefObject.current[index.toString()];
      return element ?? null;
    },
    [measureRefObject]
  );

  const ensureScrollListener = React.useCallback(() => {
    if (scrollListenerRef.current || !scrollViewRef.current) {
      return;
    }

    const listener = () => {
      const active = operationRef.current;
      if (!active) {
        return;
      }

      // Don't cancel during programmatic scroll or smooth scroll animation
      if (active.isProgrammaticScroll || active.awaitingSmoothScroll) {
        return;
      }

      // User-initiated scroll cancels the operation (including pinning)
      clearOperation('user');
    };

    scrollViewRef.current.addEventListener('scroll', listener, {
      passive: true,
    });
    scrollListenerRef.current = listener;
  }, [clearOperation, scrollViewRef]);

  /**
   * Evaluates whether the target element is properly aligned within the viewport.
   * Returns alignment status, deltas, and overflow information.
   */
  const evaluateTargetAlignment = React.useCallback(
    (index: number) => {
      const scrollView = scrollViewRef.current;
      const element = getTargetElement(index);

      if (!scrollView || !element) {
        return {
          elementExists: Boolean(element),
          aligned: false,
          startDelta: 0,
          endOverflow: 0,
        };
      }

      const elementRect = element.getBoundingClientRect();
      const containerRect = scrollView.getBoundingClientRect();

      const elementStart =
        axis === 'vertical' ? elementRect.top : elementRect.left;
      const containerStart =
        axis === 'vertical' ? containerRect.top : containerRect.left;
      const elementEnd =
        axis === 'vertical' ? elementRect.bottom : elementRect.right;
      const containerEnd =
        axis === 'vertical' ? containerRect.bottom : containerRect.right;

      const startDelta = elementStart - containerStart;
      const endOverflow = Math.max(0, elementEnd - containerEnd);

      const aligned =
        Math.abs(startDelta) <= VIEWPORT_TOLERANCE &&
        endOverflow <= VIEWPORT_TOLERANCE;

      return {
        elementExists: true,
        aligned,
        startDelta,
        endOverflow,
      };
    },
    [axis, getTargetElement, scrollViewRef]
  );

  const scheduleProgrammaticScrollReset = React.useCallback(
    (operation: ScrollOperation) => {
      requestProgrammaticFrame(() => {
        const active = operationRef.current;
        if (!active || active.id !== operation.id) {
          return;
        }

        active.isProgrammaticScroll = false;
      });
    },
    [operationRef, requestProgrammaticFrame]
  );

  /**
   * Applies an instant scroll adjustment by the specified delta.
   * Uses direct property manipulation for synchronous behavior to avoid
   * timing issues with browser reflow.
   */
  const applyScrollByDelta = React.useCallback(
    (operation: ScrollOperation, delta: number) => {
      const scrollView = scrollViewRef.current;
      if (!scrollView || delta === 0) {
        return;
      }

      const adjustedDelta = reversed ? -delta : delta;
      operation.isProgrammaticScroll = true;

      scrollView.scrollBy({
        [axis === 'vertical' ? 'top' : 'left']: adjustedDelta,
        behavior: 'instant',
      });

      scheduleProgrammaticScrollReset(operation);
    },
    [axis, reversed, scheduleProgrammaticScrollReset, scrollViewRef]
  );

  /**
   * Performs the actual scroll operation to the target index.
   * Uses optimized offset calculation when available, otherwise falls back to scrollToItemDynamic.
   */
  const performScroll = React.useCallback(
    (operation: ScrollOperation, behavior: ScrollBehavior) => {
      if (!reversed && axis === 'vertical' && getOffsetForIndex) {
        const offset = getOffsetForIndex(operation.targetIndex);
        if (offset !== undefined && offset !== null && isFinite(offset)) {
          const scrollView = scrollViewRef.current;
          if (scrollView) {
            operation.isProgrammaticScroll = true;
            scrollView.scrollTo({
              top: offset,
              behavior,
            });
            scheduleProgrammaticScrollReset(operation);
            return;
          }
        }
      }

      const params: ScrollToItemDynamicParams = {
        index: operation.targetIndex,
        getItemSize,
        totalSize: getTotalSize(),
        scrollViewRef,
        axis,
        reversed,
        behavior,
        gap,
      };

      scrollToItemDynamic(params);
    },
    [
      axis,
      gap,
      getItemSize,
      getTotalSize,
      reversed,
      scrollViewRef,
      getOffsetForIndex,
      scheduleProgrammaticScrollReset,
    ]
  );

  /**
   * Finalizes a scroll operation, marking it as stable.
   * Invokes completion callbacks and cleans up timers.
   */
  const finalizeOperation = React.useCallback(
    (operation: ScrollOperation) => {
      if (operation.status === 'stable') {
        return;
      }
      operation.status = 'stable';
      clearStabilityTimeout(operation);
      cancelScheduledFrame(operation);
      if (operation.callback) {
        operation.callback(operation.targetIndex);
      }

      onOperationComplete?.(operation.targetIndex);
      setFlaggedIndex?.(null);
      operationRef.current = null;
      detachScrollListener();
    },
    [
      cancelScheduledFrame,
      clearStabilityTimeout,
      detachScrollListener,
      onOperationComplete,
      setFlaggedIndex,
    ]
  );

  scheduleStabilityCheckRef.current = (operation: ScrollOperation) => {
    if (!operation) {
      return;
    }

    clearStabilityTimeout(operation);

    const runCheck = () => {
      const active = operationRef.current;
      if (!active || active.id !== operation.id) {
        return;
      }

      active.stabilityTimeoutId = null;

      // After smooth scroll animation completes, apply instant correction
      const wasAwaitingSmoothScroll = active.awaitingSmoothScroll;
      active.awaitingSmoothScroll = false;

      if (wasAwaitingSmoothScroll) {
        // Force an instant correction to fix position after smooth scroll
        performScroll(active, 'instant');
        active.correctionsRemaining -= 1;
        active.stableIterations = DEFAULT_CORRECTION_SETTLE;
        scheduleStabilityCheck(active);
        return;
      }

      const alignment = evaluateTargetAlignment(active.targetIndex);

      if (!alignment.elementExists || !active.hasMeasuredTarget) {
        if (active.correctionsRemaining > 0) {
          scheduleCorrection(active);
        }
        scheduleStabilityCheck(active);
        return;
      }

      if (!alignment.aligned) {
        let correctionApplied = false;

        if (Math.abs(alignment.startDelta) > VIEWPORT_TOLERANCE) {
          applyScrollByDelta(active, alignment.startDelta);
          correctionApplied = true;
        } else if (alignment.endOverflow > VIEWPORT_TOLERANCE) {
          applyScrollByDelta(active, alignment.endOverflow);
          correctionApplied = true;
        }

        if (!correctionApplied && active.correctionsRemaining > 0) {
          performScroll(active, 'instant');
          correctionApplied = true;
          active.correctionsRemaining -= 1;
        } else if (correctionApplied && active.correctionsRemaining > 0) {
          active.correctionsRemaining -= 1;
        }

        if (correctionApplied) {
          active.stableIterations = DEFAULT_CORRECTION_SETTLE;
          scheduleStabilityCheck(active);
          return;
        }

        if (active.correctionsRemaining <= 0) {
          finalizeOperation(active);
          return;
        }

        scheduleStabilityCheck(active);
        return;
      }

      if (active.pendingCorrection) {
        scheduleStabilityCheck(active);
        return;
      }

      if (active.stableIterations > 0) {
        active.stableIterations -= 1;
        scheduleStabilityCheck(active);
        return;
      }

      finalizeOperation(active);
    };

    // Use longer delay for smooth scroll to let animation complete
    const delay = operation.awaitingSmoothScroll
      ? SMOOTH_SCROLL_DELAY
      : stabilityTimeout;

    // Mark as having a pending timeout (use 1 as a sentinel value since useTimeout
    // doesn't return actual timeout IDs)
    operation.stabilityTimeoutId = 1;
    setStabilityTimeout(runCheck, delay);
  };

  scheduleCorrectionRef.current = (operation: ScrollOperation) => {
    if (!operation) {
      return;
    }

    if (operation.correctionsRemaining <= 0 || operation.pendingCorrection) {
      return;
    }

    operation.pendingCorrection = true;

    const executeCorrection = () => {
      const active = operationRef.current;
      if (!active || active.id !== operation.id) {
        return;
      }

      let correctionApplied = false;
      const alignment = evaluateTargetAlignment(active.targetIndex);

      if (alignment.elementExists) {
        if (Math.abs(alignment.startDelta) > VIEWPORT_TOLERANCE) {
          applyScrollByDelta(active, alignment.startDelta);
          correctionApplied = true;
        } else if (alignment.endOverflow > VIEWPORT_TOLERANCE) {
          applyScrollByDelta(active, alignment.endOverflow);
          correctionApplied = true;
        }
      }

      if (!correctionApplied) {
        performScroll(active, 'instant');
        correctionApplied = true;
      }

      if (correctionApplied) {
        active.correctionsRemaining -= 1;
      }
      active.pendingCorrection = false;
      active.scheduleFrameId = null;

      if (alignment.elementExists && alignment.aligned) {
        finalizeOperation(active);
        return;
      }

      if (active.correctionsRemaining > 0) {
        scheduleCorrection(active);
        return;
      }

      scheduleStabilityCheck(active);
    };

    // Use requestAnimationFrame via useAnimationFrame hook (SSR-safe)
    operation.scheduleFrameId = requestCorrectionFrame(() => {
      executeCorrection();
    });
  };

  /**
   * Handles when an item's size is measured or changes.
   * Triggers corrections and stability checks as needed.
   */
  const handleItemMeasured = React.useCallback(
    (index: number, _size: number, delta: number) => {
      const active = operationRef.current;
      if (!active) {
        return;
      }

      // Ignore measurements after operation is stable
      if (active.status === 'stable') {
        return;
      }

      // Ignore measurements for items after the target
      if (index > active.targetIndex) {
        return;
      }

      active.lastMeasurementTimestamp = Date.now();

      if (index < active.targetIndex && delta !== 0) {
        // For smooth scrolling, skip compensations while animation is in progress
        // The stability check will handle corrections after the animation completes
        if (active.awaitingSmoothScroll) {
          return;
        }

        // Schedule a correction when items before target change size
        if (active.correctionsRemaining > 0) {
          scheduleCorrection(active);
        }
        active.stableIterations = DEFAULT_CORRECTION_SETTLE;
        return;
      }

      if (index === active.targetIndex) {
        active.hasMeasuredTarget = true;
        if (!active.initialAlignmentPerformed) {
          // Use the original scroll behavior for initial alignment
          // This preserves smooth scrolling if the user requested it
          performScroll(active, active.behavior);
          active.initialAlignmentPerformed = true;
        }
        // For smooth scrolling, don't immediately schedule corrections
        // while animation is in progress
        if (
          !active.awaitingSmoothScroll &&
          Math.abs(delta) >= VIEWPORT_TOLERANCE &&
          active.correctionsRemaining > 0
        ) {
          scheduleCorrection(active);
          active.stableIterations = DEFAULT_CORRECTION_SETTLE;
        }
        return;
      }

      // For items not matching any condition above (delta=0, not target),
      // don't do anything - let existing stability check complete
    },
    [
      applyScrollByDelta,
      scheduleCorrection,
      evaluateTargetAlignment,
      scheduleStabilityCheck,
      performScroll,
    ]
  );

  /**
   * Handles when the target item is rendered in the DOM.
   * Schedules corrections and stability checks to ensure proper alignment.
   */
  const handleRendered = React.useCallback(
    (index: number) => {
      const active = operationRef.current;
      if (!active || index !== active.targetIndex) {
        return false;
      }

      if (active.status === 'stable') {
        return true;
      }

      scheduleCorrection(active);
      scheduleStabilityCheck(active);
      return true;
    },
    [scheduleCorrection, scheduleStabilityCheck]
  );

  /**
   * Initiates a scroll operation to the specified index.
   * Cancels any existing operation and starts a new one with corrections and stability checks.
   */
  const start = React.useCallback(
    (
      index: number,
      behavior: ScrollBehavior,
      callback?: (index: number) => void
    ) => {
      cancelScheduledFrame(
        operationRef.current ??
          ({
            scheduleFrameId: null,
          } as ScrollOperation)
      );
      clearOperation();

      const operationId = ++operationIdRef.current;
      const operation: ScrollOperation = {
        id: operationId,
        targetIndex: index,
        behavior,
        callback,
        correctionsRemaining: maxCorrections,
        pendingCorrection: false,
        stabilityTimeoutId: null,
        scheduleFrameId: null,
        status: 'initial',
        isProgrammaticScroll: false,
        stableIterations: DEFAULT_CORRECTION_SETTLE,
        lastMeasurementTimestamp: Date.now(),
        hasMeasuredTarget: false,
        initialAlignmentPerformed: false,
        awaitingSmoothScroll: behavior === 'smooth',
      };

      operationRef.current = operation;
      setFlaggedIndex?.(index);
      ensureScrollListener();

      performScroll(operation, behavior);
      // For smooth scrolling, mark initial alignment as done and don't schedule immediate correction
      // Let the smooth animation play out, then stability checks will trigger corrections if needed
      if (behavior === 'smooth') {
        operation.initialAlignmentPerformed = true;
      } else {
        scheduleCorrection(operation);
      }
      scheduleStabilityCheck(operation);
    },
    [
      cancelScheduledFrame,
      clearOperation,
      ensureScrollListener,
      maxCorrections,
      scheduleCorrection,
      performScroll,
      scheduleStabilityCheck,
      setFlaggedIndex,
    ]
  );

  /**
   * Cancels the current scroll operation and cleans up all timers and listeners.
   */
  const cancel = React.useCallback(() => {
    clearOperation('cancelled');
  }, [clearOperation]);

  /**
   * Returns true if a scroll operation is currently active (not finalized).
   */
  const isActive = React.useCallback(() => {
    return operationRef.current !== null;
  }, []);

  React.useEffect(() => {
    return () => {
      clearOperation();
    };
  }, [clearOperation]);

  return {
    start,
    handleItemMeasured,
    handleRendered,
    cancel,
    isActive,
  };
}
