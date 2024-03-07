import * as React from 'react';
import {
  blobify,
  registerPaintWorklet,
  PaintWorklet,
  PaintWorkletGeometry,
  hasHoudini,
} from '@fluentui-contrib/houdini-utils';
import { Switch } from '@fluentui/react-components';

try {
  CSS.registerProperty({
    name: '--checkerboard-color-1',
    syntax: '<color>',
    initialValue: 'rgba(9,9,121,1)',
    inherits: false,
  });
  CSS.registerProperty({
    name: '--checkerboard-color-2',
    syntax: '<color>',
    initialValue: 'rgba(9,9,121,1)',
    inherits: false,
  });
  CSS.registerProperty({
    name: '--checkerboard-color-3',
    syntax: '<color>',
    initialValue: 'rgba(9,9,121,1)',
    inherits: false,
  });
} catch {
  /* empty */
}

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

export const Default = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const animationRef = React.useRef<Animation | null>(null);
  const [running, setRunning] = React.useState(true);
  React.useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    if (running) {
      animationRef.current = ref.current.animate(
        [
          {
            '--checkerboard-color-1': 'red',
            '--checkerboard-color-2': 'green',
            '--checkerboard-color-3': 'blue',
          },
          {
            '--checkerboard-color-1': 'blue',
            '--checkerboard-color-2': 'red',
            '--checkerboard-color-3': 'green',
          },
          {
            '--checkerboard-color-1': 'green',
            '--checkerboard-color-2': 'blue',
            '--checkerboard-color-3': 'red',
          },
        ],
        {
          duration: 1000,
          iterations: Infinity,
          easing: 'linear',
        }
      );
    } else {
      animationRef.current?.cancel();
      animationRef.current = null;
    }
  }, [running]);

  if (!hasHoudini()) {
    return (
      <div>
        ⚠️ This browser does not support houdini, please take a look at the
        fallback example.
      </div>
    );
  }

  return (
    <>
      <Switch
        onChange={(e, data) => setRunning(data.checked)}
        checked={running}
        label="Toggle animation"
      />
      <div
        ref={ref}
        style={
          {
            background: 'paint(mypaintworklet)',
            height: 200,
            width: 200,
            '--checkerboard-color-1': 'red',
            '--checkerboard-color-2': 'green',
            '--checkerboard-color-3': 'blue',
          } as React.CSSProperties
        }
      />
    </>
  );
};
