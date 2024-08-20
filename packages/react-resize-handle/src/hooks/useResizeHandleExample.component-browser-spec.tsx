import * as React from 'react';
import { useResizeHandle } from './useResizeHandle';

export function TestArea() {
  const codeRef = React.useRef<HTMLElement>(null);
  const handleChange = React.useCallback((value: number) => {
    if (codeRef.current) {
      codeRef.current.textContent = `--width: ${value}px;`;
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
          '--width': '50px',
          display: 'grid',
          gridTemplateColumns: 'var(--width) 10px auto',
          width: '100%',
          height: '400px',
          gap: '4px',
        }}
      >
        <div
          ref={handle.elementRef}
          style={{
            border: '2px dotted blue',
            height: '100%',
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
