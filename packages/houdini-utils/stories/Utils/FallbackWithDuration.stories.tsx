import * as React from 'react';
import {
  blobify,
  registerPaintWorklet,
  fallbackPaintAnimation,
  hasMozElement,
  hasWebkitCanvas,
  PaintWorklet,
  PaintWorkletGeometry,
} from '@fluentui-contrib/houdini-utils';
import { Button } from '@fluentui/react-components';

class MyPaintWorklet implements PaintWorklet {
  public static get inputProperties() {
    return [
      '--checkerboard-color-1',
      '--checkerboard-color-2',
      '--checkerboard-color-3',
    ];
  }

  paint(
    ctx: CanvasRenderingContext2D,
    geom: PaintWorkletGeometry,
    properties: Map<string, string>
  ) {
    // Use `ctx` as if it was a normal canvas
    const colors = [
      properties.get('--checkerboard-color-1'),
      properties.get('--checkerboard-color-2'),
      properties.get('--checkerboard-color-3'),
    ].filter(Boolean) as string[];

    const size = 32;
    for (let y = 0; y < geom.height / size; y++) {
      for (let x = 0; x < geom.width / size; x++) {
        const color = colors[(x + y) % colors.length];
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.rect(x * size, y * size, size, size);
        ctx.fill();
      }
    }
  }
}

registerPaintWorklet(
  URL.createObjectURL(blobify('mypaintworklet', MyPaintWorklet)),
  ''
).then(() => console.log('registered'));

export const fallback = (target: HTMLElement) => {
  return fallbackPaintAnimation(target, new MyPaintWorklet(), {
    duration: '1000ms',
    timingFunction: 'ease-in-out',
    iterationCount: [2],
    target,
    onComplete: () => null,
    onUpdate: () => null,
    delay: '0',
    animations: [
      {
        '0%': {
          '--checkerboard-color-1': 'var(--red)',
          '--checkerboard-color-2': 'var(--green)',
          '--checkerboard-color-3': 'var(--blue)',
        },
        '50%': {
          '--checkerboard-color-1': 'var(--blue)',
          '--checkerboard-color-2': 'var(--red)',
          '--checkerboard-color-3': 'var(--green)',
        },
        '100%': {
          '--checkerboard-color-1': 'var(--green)',
          '--checkerboard-color-2': 'var(--blue)',
          '--checkerboard-color-3': 'var(--red)',
        },
      },
    ],
  });
};

const getBackgroundImage = (id: string) => {
  if (hasMozElement()) {
    return `-moz-element(#${id})`;
  } else if (hasWebkitCanvas()) {
    return `-webkit-canvas(${id})`;
  }

  return undefined;
};

const useFallbackAnimation = (options: { onComplete: () => void }) => {
  const stateRef = React.useRef<'rest' | 'play'>('rest');
  const playRef = React.useRef<() => void>(() => null);
  const stopRef = React.useRef<() => void>(() => null);
  const cleanupRef = React.useRef<() => void>(() => null);
  const targetRef = React.useCallback((node: HTMLElement | null) => {
    if (!node) {
      cleanupRef.current();
      return;
    }

    const { id, play, stop, canvas, cleanup } = fallback(node);
    stopRef.current = stop;
    cleanupRef.current = cleanup;
    const backgroundImage = getBackgroundImage(id);

    const onComplete = () => {
      stateRef.current = 'rest';
      options.onComplete();
    };

    let onUpdate: () => void = () => null;

    if (backgroundImage) {
      node.style.backgroundImage = backgroundImage;
    } else {
      onUpdate = () => {
        if (canvas) {
          const backgroundImage = `url(${canvas.toDataURL('image/png')})`;
          node.style.backgroundImage = backgroundImage;
        }
      };
    }

    playRef.current = () => {
      if (stateRef.current === 'rest') {
        stateRef.current = 'play';
        play(onComplete, onUpdate);
      }
    };
  }, []);

  return {
    targetRef,
    play: () => playRef.current(),
    stop: () => stopRef.current(),
  };
};

export const FallbackWithDuration = () => {
  const { targetRef, play } = useFallbackAnimation({
    onComplete: () => setRunning(false),
  });
  const [running, setRunning] = React.useState(false);
  React.useEffect(() => {
    if (running) {
      play();
    }
  }, [running]);

  return (
    <>
      <Button disabled={running} onClick={() => setRunning(true)}>
        Play
      </Button>
      <div
        ref={targetRef}
        style={
          {
            height: 200,
            width: 200,
            '--red': '#ff0000',
            '--green': '#008000',
            '--blue': '#0000ff',
          } as React.CSSProperties
        }
      />
    </>
  );
};
