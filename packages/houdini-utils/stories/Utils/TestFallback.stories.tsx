import * as React from 'react';
import {
  PaintWorklet,
  PaintWorkletGeometry,
  hasHoudini,
  hasMozElement,
  hasWebkitCanvas,
  fallbackPaintAnimation,
} from '@fluentui-contrib/houdini-utils';
import { Switch, tokens } from '@fluentui/react-components';

class MyPaintWorklet implements PaintWorklet {
  public static get inputProperties() {
    return [
      '--liveness-angle',
      '--liveness-color-1',
      '--liveness-color-2',
      '--liveness-color-3',
      '--liveness-stroke-width',
      '--liveness-progress',
      'border-top-left-radius',
      'border-top-right-radius',
      'border-bottom-right-radius',
      'border-bottom-left-radius',
    ];
  }

  /**
   * roundRect does not meet the browser support matrix of Fluent UI
   * @link https://react.fluentui.dev/?path=/docs/concepts-developer-browser-support-matrix--page#full-browser-support-matrix
   */
  private roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    radii: number | number[] = 0
  ) {
    if (ctx.roundRect) {
      ctx.roundRect(x, y, w, h, radii);
    } else {
      let rad: number[] = [0, 0, 0, 0];
      if (Array.isArray(radii)) {
        if (radii.length === 4) {
          rad = radii;
        } else if (radii.length === 1) {
          rad = new Array(4).fill(radii[0]);
        } else if (radii.length === 2) {
          rad = [radii[0], radii[1], radii[0], radii[1]];
        } else if (radii.length === 3) {
          rad = [radii[0], radii[1], radii[2], radii[1]];
        }
      } else if (typeof radii === 'number') {
        rad = new Array(4).fill(radii);
      }

      ctx.moveTo(x + rad[0], y);
      ctx.arcTo(x + w, y, x + w, y + h, rad[1]);
      ctx.arcTo(x + w, y + h, x, y + h, rad[2]);
      ctx.arcTo(x, y + h, x, y, rad[3]);
      ctx.arcTo(x, y, x + w, y, rad[0]);
      ctx.closePath();
    }
  }

  /**
   * Canvas drawing context only handles numbers, so we need to parse percentage values
   * The percentage handling is explicitly wrong since it doesn't take into account both dimensions.
   *
   * However 50% is generally used for circles so we should handle that to some degree
   * @param value border radius in pixel value
   * @returns border radius in pixel value
   */
  private parseBorderRadiusValue(value: string, size: number) {
    const parsed = parseFloat(value);
    if (value.includes('%')) {
      return (parsed / 100) * size;
    }

    return parsed;
  }

  private parseProps(props: Map<string, string>, geom: PaintWorkletGeometry) {
    const angle = parseFloat(String(props.get('--liveness-angle')));
    const strokeWidth = parseFloat(
      String(props.get('--liveness-stroke-width'))
    );

    return {
      angle,
      strokeWidth,
      progress: parseFloat(String(props.get('--liveness-progress'))),
      colors: [
        String(props.get(`--liveness-color-1`)),
        String(props.get(`--liveness-color-2`)),
        String(props.get(`--liveness-color-3`)),
      ],
      borderTopLeftRadius: this.parseBorderRadiusValue(
        String(props.get('border-top-left-radius')),
        geom.width
      ),
      borderTopRightRadius: this.parseBorderRadiusValue(
        String(props.get('border-top-right-radius')),
        geom.width
      ),
      borderBottomLeftRadius: this.parseBorderRadiusValue(
        String(props.get('border-bottom-left-radius')),
        geom.width
      ),
      borderBottomRightRadius: this.parseBorderRadiusValue(
        String(props.get('border-bottom-right-radius')),
        geom.width
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
    ctx.globalCompositeOperation = 'source-over';
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
    this.roundRect(
      ctx,
      strokeWidth,
      strokeWidth,
      width - strokeWidth * 2,
      height - strokeWidth * 2,
      radii
    );

    ctx.fill();
  }

  /**
   * Renders a cone that will clip the border.
   * When there no progress the cone is in fact a circle and hides the entire border
   * As the progress increases the cone becomes smaller and smaller which gradually reveals the border
   */
  private renderClippingCone(
    ctx: CanvasRenderingContext2D,
    options: { width: number; height: number; progress: number }
  ) {
    const { width, height, progress } = options;

    function toRadians(deg: number) {
      return (deg * Math.PI) / 180;
    }

    // move both the start and end angles as progress increases to create
    // the effect that the border is moving around like a snake
    const rotation = 90 * progress;
    let startAngle = toRadians(360 * progress + rotation);
    let endAngle = toRadians(rotation);

    if (progress === 0) {
      startAngle = toRadians(360);
      endAngle = toRadians(0);
    }

    if (progress === 1) {
      startAngle = toRadians(0);
      endAngle = toRadians(0);
    }

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    const midX = width / 2;
    const midY = height / 2;
    ctx.moveTo(midX, midY);
    ctx.arc(midX, midY, 400, startAngle, endAngle);
    ctx.lineTo(midX, midY);
    ctx.closePath();
    ctx.fillStyle = 'yellow';
    ctx.fill();
  }

  paint(
    ctx: CanvasRenderingContext2D,
    size: PaintWorkletGeometry,
    props: Map<string, string>
  ) {
    const {
      angle,
      strokeWidth,
      colors,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      progress,
    } = this.parseProps(props, size);
    const { width, height } = size;

    this.renderGradientRect(ctx, { colors, angle, width, height });

    this.renderClippingCone(ctx, { width, height, progress });

    this.renderClippingBorderRect(ctx, {
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      strokeWidth,
      width,
      height,
    });
  }
}

export const fallback = (target: HTMLElement) => {
  const START_ANGLE = (3 * Math.PI) / 4;
  const startAngle = String(START_ANGLE);
  const endAngle = String(START_ANGLE + 2 * Math.PI);
  return fallbackPaintAnimation(target, new MyPaintWorklet(), {
    duration: '500ms, 1000ms',
    timingFunction: 'linear',
    target,
    onComplete: () => null,
    onUpdate: () => null,
    iterationCount: [1, Infinity],
    delay: '0',
    animations: [
      {
        '0%': {
          '--liveness-progress': '0',
        },
        '100%': {
          '--liveness-progress': '1',
        },
      },
      {
        '0%': {
          '--liveness-angle': startAngle,
        },
        '100%': {
          '--liveness-angle': endAngle,
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

const useFallbackAnimation = () => {
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
    stop: () => {
      if (stateRef.current === 'play') {
        stopRef.current();
        stateRef.current = 'rest';
      }
    },
  };
};

export const TestFallback = () => {
  const [running, setRunning] = React.useState(false);
  const { targetRef, play, stop } = useFallbackAnimation();
  React.useLayoutEffect(() => {
    if (running) {
      play();
    } else {
      stop();
    }
  }, [running]);

  return (
    <>
      <Switch
        onChange={(e, data) => setRunning(data.checked)}
        checked={running}
        label="Toggle animation"
      />
      <div
        ref={targetRef}
        style={
          {
            background: 'paint(testworklet)',
            borderRadius: '20px',
            height: 200,
            width: 200,
            padding: 2,
            '--liveness-color-1': tokens.colorPaletteLilacBorderActive,
            '--liveness-color-2': tokens.colorBrandStroke1,
            '--liveness-color-3': tokens.colorPaletteLightTealBorderActive,
            '--liveness-stroke-width': '2px',
          } as React.CSSProperties
        }
      />
    </>
  );
};
