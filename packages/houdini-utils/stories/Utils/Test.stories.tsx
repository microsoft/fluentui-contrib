import * as React from 'react';
import {
  blobify,
  registerPaintWorklet,
  PaintWorklet,
  PaintWorkletGeometry,
  hasHoudini,
} from '@fluentui-contrib/houdini-utils';
import { Switch, tokens, Button } from '@fluentui/react-components';

try {
  CSS.registerProperty({
    // Percentage!
    name: '--liveness-border-top-visibility',
    syntax: '<percentage>',
    inherits: true,
    initialValue: '0%',
  });

  CSS.registerProperty({
    // Percentage!
    name: '--liveness-border-right-visibility',
    syntax: '<percentage>',
    inherits: true,
    initialValue: '0%',
  });

  CSS.registerProperty({
    // Percentage!
    name: '--liveness-border-bottom-visibility',
    syntax: '<percentage>',
    inherits: true,
    initialValue: '0%',
  });

  CSS.registerProperty({
    // Percentage!
    name: '--liveness-border-left-visibility',
    syntax: '<percentage>',
    inherits: true,
    initialValue: '0%',
  });

  CSS.registerProperty({
    // Radians!
    name: '--liveness-angle',
    syntax: '<number>',
    inherits: true,
    initialValue: String((3 * Math.PI) / 4),
  });

  CSS.registerProperty({
    name: '--liveness-color-1',
    syntax: '<color>',
    inherits: true,
    initialValue: 'transparent',
  });

  CSS.registerProperty({
    name: '--liveness-color-2',
    syntax: '<color>',
    inherits: true,
    initialValue: 'transparent',
  });

  CSS.registerProperty({
    name: '--liveness-color-3',
    syntax: '<color>',
    inherits: true,
    initialValue: 'transparent',
  });

  CSS.registerProperty({
    name: '--liveness-stroke-width',
    syntax: '<length>',
    inherits: true,
    initialValue: '2px',
  });
} catch {
  /* empty */
}

class MyPaintWorklet implements PaintWorklet {
  public static get inputProperties() {
    return [
      '--liveness-angle',
      '--liveness-color-1',
      '--liveness-color-2',
      '--liveness-color-3',
      '--liveness-stroke-width',
      '--liveness-border-top-visibility',
      '--liveness-border-right-visibility',
      '--liveness-border-bottom-visibility',
      '--liveness-border-left-visibility',
      'border-top-left-radius',
      'border-top-right-radius',
      'border-bottom-right-radius',
      'border-bottom-left-radius',
    ];
  }

  private parseProps(props: Map<string, string>) {
    const angle = parseFloat(String(props.get('--liveness-angle')));

    const borderTopVisibility =
      parseFloat(String(props.get('--liveness-border-top-visibility'))) / 100;
    const borderRightVisibility =
      parseFloat(String(props.get('--liveness-border-right-visibility'))) / 100;
    const borderBottomVisibility =
      parseFloat(String(props.get('--liveness-border-bottom-visibility'))) /
      100;
    const borderLeftVisibility =
      parseFloat(String(props.get('--liveness-border-left-visibility'))) / 100;
    const strokeWidth = parseFloat(
      String(props.get('--liveness-stroke-width'))
    );

    return {
      angle,
      borderBottomVisibility,
      borderLeftVisibility,
      borderTopVisibility,
      borderRightVisibility,
      strokeWidth,
      colors: [
        String(props.get(`--liveness-color-1`)),
        String(props.get(`--liveness-color-2`)),
        String(props.get(`--liveness-color-3`)),
      ],
      borderTopLeftRadius: parseFloat(
        String(props.get('border-top-left-radius'))
      ),
      borderTopRightRadius: parseFloat(
        String(props.get('border-top-right-radius'))
      ),
      borderBottomLeftRadius: parseFloat(
        String(props.get('border-bottom-left-radius'))
      ),
      borderBottomRightRadius: parseFloat(
        String(props.get('border-bottom-right-radius'))
      ),
    };
  }

  /**
   * Renders the main gradient rectangle which will spin
   */
  private renderGradientRect(
    ctx: CanvasRenderingContext2D,
    options: { colors: string[]; angle: number; width: number; height: number }
  ) {
    const { angle, width, height, colors } = options;
    const midX = width / 2;
    const midY = height / 2;
    const length = Math.sqrt(midX * midX + midY * midY);

    const lenX = Math.cos(angle) * length;
    const lenY = Math.sin(angle) * length;

    const x1 = midX - lenX;
    const y1 = midY - lenY;
    const x2 = midX + lenX;
    const y2 = midY + lenY;

    const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(0.5, colors[1]);
    gradient.addColorStop(1, colors[2]);

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = gradient;
    // main rectangle with gradient
    ctx.fillRect(0, 0, width, height);
  }

  /**
   * Renders a clipping rect inside the gradient rect to get a border effect
   */
  private renderClippingBorderRect(
    ctx: CanvasRenderingContext2D,
    options: {
      borderTopLeftRadius: number;
      borderTopRightRadius: number;
      borderBottomLeftRadius: number;
      borderBottomRightRadius: number;
      strokeWidth: number;
      width: number;
      height: number;
    }
  ) {
    const {
      strokeWidth,
      width,
      height,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
    } = options;
    const radii = [
      Math.max(borderTopLeftRadius - strokeWidth, 0),
      Math.max(borderTopRightRadius - strokeWidth, 0),
      Math.max(borderBottomRightRadius - strokeWidth, 0),
      Math.max(borderBottomLeftRadius - strokeWidth, 0),
    ];

    ctx.globalCompositeOperation = 'destination-out';
    // This should never render because of the composition mode.
    // Using an obviously wrong color so if it _does_ render
    // we'll catch it early.
    ctx.fillStyle = 'yellow';
    ctx.beginPath();

    // mask rectangle
    // clips the gradient to have a border
    ctx.roundRect(
      strokeWidth,
      strokeWidth,
      width - strokeWidth * 2,
      height - strokeWidth * 2,
      radii
    );

    ctx.fill();
  }

  /**
   * Renders two overlapping rects that will shrink based on each side's visibility
   * Provides the effect that the border is being 'drawn' around the rect
   */
  private renderClippingProgressBorderRects(
    ctx: CanvasRenderingContext2D,
    options: {
      borderBottomVisibility: number;
      borderLeftVisibility: number;
      borderTopVisibility: number;
      borderRightVisibility: number;
      strokeWidth: number;
      width: number;
      height: number;
    }
  ) {
    const {
      borderBottomVisibility,
      borderLeftVisibility,
      borderRightVisibility,
      borderTopVisibility,
      height,
      strokeWidth,
      width,
    } = options;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.fillStyle = 'cyan';
    ctx.rect(
      width,
      height,
      Math.min(-width * (1 - borderTopVisibility), -strokeWidth),
      -height * (1 - borderRightVisibility)
    );
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = 'pink';
    ctx.rect(
      0,
      0 + strokeWidth,
      Math.max(
        (width - strokeWidth) * (1 - borderBottomVisibility),
        strokeWidth
      ),
      height * (1 - borderLeftVisibility)
    );
    ctx.fill();
  }

  paint(
    ctx: CanvasRenderingContext2D,
    size: PaintWorkletGeometry,
    props: Map<string, string>
  ) {
    const {
      angle,
      borderBottomVisibility,
      borderLeftVisibility,
      borderTopVisibility,
      borderRightVisibility,
      strokeWidth,
      colors,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
    } = this.parseProps(props);
    const { width, height } = size;

    this.renderGradientRect(ctx, { colors, angle, width, height });
    this.renderClippingBorderRect(ctx, {
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      strokeWidth,
      width,
      height,
    });
    this.renderClippingProgressBorderRects(ctx, {
      borderBottomVisibility,
      borderLeftVisibility,
      borderTopVisibility,
      borderRightVisibility,
      height,
      strokeWidth,
      width,
    });

    // top
    // ctx.beginPath();
    // ctx.fillStyle = 'pink';
    // ctx.rect(width, 0, -width * (1 - borderTopVisibility), strokeWidth);
    // ctx.fill();

    // // left
    // ctx.beginPath();
    // ctx.fillStyle = 'pink';
    // ctx.rect(0, 0, strokeWidth, width * (1 - borderLeftVisibility));
    // ctx.fill();

    // // right
    // ctx.beginPath();
    // ctx.fillStyle = 'pink';
    // ctx.rect(
    //   width,
    //   height,
    //   -strokeWidth,
    //   -height * (1 - borderRightVisibility)
    // );
    // ctx.fill();

    // // bottom
    // ctx.beginPath();
    // ctx.fillStyle = 'pink';
    // ctx.rect(0, height, width * (1 - borderBottomVisibility), -strokeWidth);
    // ctx.fill();
  }
}

registerPaintWorklet(
  URL.createObjectURL(blobify('testworklet', MyPaintWorklet)),
  ''
).then(() => console.log('registered'));

export const Test = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const drawAnimRef = React.useRef<Animation | null>(null);
  const spinAnimRef = React.useRef<Animation | null>(null);
  const [running, setRunning] = React.useState(false);
  React.useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    if (running) {
      drawAnimRef.current = ref.current.animate(
        [
          {
            '--liveness-border-top-visibility': '0%',
            '--liveness-border-right-visibility': '0%',
            '--liveness-border-bottom-visibility': '0%',
            '--liveness-border-left-visibility': '0%',
          },
          {
            '--liveness-border-top-visibility': '100%',
            '--liveness-border-right-visibility': '0%',
            '--liveness-border-bottom-visibility': '0%',
            '--liveness-border-left-visibility': '0%',
          },
          {
            '--liveness-border-top-visibility': '100%',
            '--liveness-border-right-visibility': '100%',
            '--liveness-border-bottom-visibility': '0%',
            '--liveness-border-left-visibility': '0%',
          },
          {
            '--liveness-border-top-visibility': '100%',
            '--liveness-border-right-visibility': '100%',
            '--liveness-border-bottom-visibility': '100%',
            '--liveness-border-left-visibility': '0%',
          },
          {
            '--liveness-border-top-visibility': '100%',
            '--liveness-border-right-visibility': '100%',
            '--liveness-border-bottom-visibility': '100%',
            '--liveness-border-left-visibility': '100%',
          },
        ],
        { duration: 200, easing: 'linear', fill: 'forwards' }
      );

      // drawAnimRef.current.persist();

      const START_ANGLE = (3 * Math.PI) / 4;
      const startAngle = String(START_ANGLE);
      const endAngle = String(START_ANGLE + 2 * Math.PI);
      spinAnimRef.current = ref.current.animate(
        [{ '--liveness-angle': startAngle }, { '--liveness-angle': endAngle }],
        { duration: 2000, delay: 0, easing: 'linear', iterations: Infinity }
      );
    } else {
      drawAnimRef.current?.cancel();
      spinAnimRef.current?.cancel();
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
            background: 'paint(testworklet)',
            borderRadius: '4px',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2,
            '--liveness-color-1': tokens.colorPaletteLilacBorderActive,
            '--liveness-color-2': tokens.colorBrandStroke1,
            '--liveness-color-3': tokens.colorPaletteLightTealBorderActive,
          } as React.CSSProperties
        }
      >
        <Button>Liveness button</Button>
      </div>
    </>
  );
};
