import * as React from 'react';
import { useResizeHandle, type UseResizeHandleParams } from './useResizeHandle';

export type TestAreaProps = Pick<UseResizeHandleParams, 'variableTarget'>;

export function TestArea(props: TestAreaProps) {
  const { variableTarget = 'wrapper' } = props;

  const codeRef = React.useRef<HTMLElement>(null);
  const handleChange = React.useCallback((_, { value, type }) => {
    if (codeRef.current) {
      codeRef.current.textContent = `--width: ${value}px; eventType: ${type}`;
    }
  }, []);

  const handle = useResizeHandle({
    variableName: '--width',
    growDirection: 'end',
    minValue: 50,
    maxValue: 400,
    onChange: handleChange,
  });

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
            '--width': '50px',
            gridTemplateColumns: 'var(--width) 10px 1fr',
          }),
          ...(variableTarget === 'element' && {
            gridTemplateColumns: 'auto 10px 1fr',
          }),
        }}
      >
        <div
          data-testid="element"
          ref={handle.elementRef}
          style={{
            border: '2px dotted blue',
            height: '100%',

            ...(variableTarget === 'element' && {
              width: 'var(--width, 50px)',
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
          }}
        />
        <div
          style={{
            border: '2px dotted green',
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
    </div>
  );
}
