import { useFluent } from '@fluentui/react-components';
import * as React from 'react';

type HandleProps = {
  position: 'start' | 'end' | 'top' | 'bottom';
  onDoubleClick?: () => void;
};

export const Handle = React.forwardRef<HTMLDivElement, HandleProps>(
  (props, ref) => {
    const { position, ...rest } = props;
    const { dir } = useFluent();

    const handleClick: React.MouseEventHandler = React.useCallback((event) => {
      if (event.detail === 2) {
        props.onDoubleClick?.();
      }
    }, []);

    const positioningAttr =
      dir === 'ltr'
        ? position === 'start'
          ? 'left'
          : 'right'
        : position === 'start'
        ? 'right'
        : 'left';

    const positioningProps =
      position === 'start' || position === 'end'
        ? {
            [positioningAttr]: '-12px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '8px',
            height: '100px',
            cursor: 'ew-resize',
          }
        : {
            ...(position === 'top' ? { top: '-12px' } : { bottom: '-12px' }),
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100px',
            height: '8px',
            cursor: 'ns-resize',
          };

    return (
      <div
        {...rest}
        ref={ref}
        onClick={handleClick}
        style={{
          position: 'absolute',
          borderRadius: '4px',
          backgroundColor: 'gray',
          ...positioningProps,
        }}
      />
    );
  }
);
