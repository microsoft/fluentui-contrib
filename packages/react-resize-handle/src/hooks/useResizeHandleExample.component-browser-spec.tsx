import * as React from 'react';
import { useMergedRefs } from '@fluentui/react-components';

import { useResizeHandle, type UseResizeHandleParams } from './useResizeHandle';

export type TestAreaProps = Pick<
  UseResizeHandleParams,
  'variableTarget' | 'onDragStart' | 'onDragEnd' | 'onChange' | 'relative'
>;

export function TestArea(props: TestAreaProps) {
  const {
    onDragEnd,
    onDragStart,
    onChange,

    relative = false,
    variableTarget = 'wrapper',
  } = props;

  const codeRef = React.useRef<HTMLElement>(null);
  const elementRef = React.useRef<HTMLDivElement>(null);

  const handleChange: NonNullable<UseResizeHandleParams['onChange']> =
    React.useCallback(
      (ev, data) => {
        onChange?.(ev, data);

        const codeEl = codeRef.current;
        const elementEl = elementRef.current;

        if (codeEl && elementEl) {
          const elementWidth = elementEl.getBoundingClientRect().width;

          codeEl.textContent = `--width (from callback): ${data.value}px; --width (actual DOM): ${elementWidth}px; eventType: ${data.type}`;
        }
      },
      [onChange]
    );

  const handle = useResizeHandle({
    growDirection: 'end',
    relative,
    variableName: '--width',

    minValue: 50,
    maxValue: 400,

    onChange: handleChange,
    onDragEnd,
    onDragStart,
  });

  const elementWidth = relative
    ? `clamp(50px, calc(50px + var(--width, 0px)), 400px)`
    : `var(--width, 50px)`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div
        ref={handle.wrapperRef}
        data-testid="wrapper"
        style={{
          display: 'grid',
          width: '100%',
          height: '400px',
          gap: '4px',

          ...(variableTarget === 'wrapper' && {
            gridTemplateColumns: `${elementWidth} 10px 1fr`,
          }),
          ...(variableTarget === 'element' && {
            gridTemplateColumns: 'auto 10px 1fr',
          }),
        }}
      >
        <div
          data-testid="element"
          ref={useMergedRefs(handle.elementRef, elementRef)}
          style={{
            border: '2px dotted blue',
            boxSizing: 'border-box',
            height: '100%',

            ...(variableTarget === 'element' && {
              width: elementWidth,
            }),
          }}
        />
        <div
          tabIndex={0}
          ref={handle.handleRef}
          role="separator"
          style={{
            cursor: 'ew-resize',
            backgroundColor: 'grey',
            borderRadius: '4px',
            boxSizing: 'border-box',
          }}
        />
        <div
          style={{
            border: '2px dotted green',
            boxSizing: 'border-box',
            height: '100%',
          }}
        />
      </div>
      <code
        ref={codeRef}
        style={{ padding: '4px', border: '2px solid orange' }}
        data-testid="value"
      >
        Default value
      </code>
      <div style={{ position: 'fixed', top: 10, right: 10 }}>
        <button
          data-testid="reset"
          onClick={() => {
            handle.setValue(relative ? 0 : 50);
          }}
        >
          reset
        </button>
      </div>
    </div>
  );
}
