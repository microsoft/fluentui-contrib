import * as React from 'react';
import { useMergedRefs } from '@fluentui/react-components';

import { useResizeHandle, type UseResizeHandleParams } from './useResizeHandle';

export type TestAreaProps = Pick<
  UseResizeHandleParams,
  | 'variableTarget'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onChange'
  | 'onChangeRejected'
  | 'relative'
  | 'minValue'
  | 'maxValue'
  | 'unit'
> & { useCSSClamp?: boolean };

export function TestArea(props: TestAreaProps) {
  const {
    onDragEnd,
    onDragStart,
    onChange,
    onChangeRejected,

    minValue,
    maxValue,
    relative = false,
    variableTarget = 'wrapper',
    unit = 'px',
    useCSSClamp = false,
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

          codeEl.textContent = `width (from callback): ${data.value}${data.unit}; width (actual DOM): ${elementWidth}px; eventType: ${data.type}`;
        }
      },
      [onChange]
    );

  const handle = useResizeHandle({
    growDirection: 'end',
    relative,
    variableName: '--width',
    unit,

    minValue,
    maxValue,

    onChange: handleChange,
    onChangeRejected,
    onDragEnd,
    onDragStart,
  });

  let elementWidth = relative
    ? `calc(50px + var(--width, 0px))`
    : `var(--width, 50px)`;

  if (relative || useCSSClamp) {
    elementWidth = `clamp(40px, ${elementWidth}, 400px)`;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '600px',
      }}
    >
      {/* To have the same behavior in all browsers ⬇️ */}
      <style>{`html, body { margin: 0; padding: 0; }`}</style>

      <div
        ref={handle.wrapperRef}
        data-testid="wrapper"
        style={{
          display: 'grid',
          height: '400px',

          ...(variableTarget === 'wrapper' && {
            gridTemplateColumns: `10px ${elementWidth} 10px 1fr 10px`,
          }),
          ...(variableTarget === 'element' && {
            gridTemplateColumns: '10px auto 10px 1fr 10px',
          }),
        }}
      >
        <div data-testid="spacer-before" style={{ background: 'lightcyan' }} />
        <div
          data-testid="resizable"
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
          data-testid="static"
          style={{
            border: '2px dotted green',
            boxSizing: 'border-box',
            height: '100%',
          }}
        />
        <div data-testid="spacer-after" style={{ background: 'lightcyan' }} />
      </div>

      <code
        ref={codeRef}
        style={{
          padding: '4px',
          border: '2px solid orange',
          fontSize: 12,
        }}
        data-testid="value"
      >
        Default value
      </code>

      <div>
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
