export interface PaintWorklet {
  paint(
    ctx: CanvasRenderingContext2D,
    size: PaintWorkletGeometry,
    props: Map<string, string>
  ): void;
}

export interface PaintWorkletGeometry {
  width: number;
  height: number;
}

/**
 * Function that animates values.
 */
export type FallbackAnimationFn = (params: FallbackAnimationParams) => void;

/**
 * Function that creates keyframe animation objects from CSS input.
 */
export type CreateKeyframeAnimationFn = (
  params: CreateKeyframeAnimationParams
) => { anims: FallbackAnimation[]; overallDuration: number } | undefined;

export type FallbackAnimationParams = {
  /**
   * CSS animation-iteration-count longhand property
   * @default 1
   */
  iterationCount?: number;
  /**
   * CSS keyframe animation steps.
   */
  animations: FallbackAnimationSteps[];

  /**
   * CSS animation-delay longhand property.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay
   */
  delay: string;

  /**
   * CSS animation-duration longhand property.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration
   */
  duration: string;

  /**
   * CSS animation-timing-function longhand property.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function
   */
  timingFunction: string;

  /**
   * HTML element where the animation will be applied.
   */
  target: HTMLElement;

  isStopped: () => boolean;

  /**
   * Callback function that will be called on every animation frame.
   */
  onUpdate: CallbackFn;

  /**
   * Callback function that will be called when the animation is complete.
   */
  onComplete: CallbackFn;
};

export type CreateKeyframeAnimationParams = Omit<
  FallbackAnimationParams,
  'onUpdate' | 'onComplete' | 'isStopped'
>;

export type FallbackAnimation = {
  /**
   * Map of current animation values.
   */
  currentValues: FallbackAnimationValues;

  /**
   * Ordered list of keyframes.
   */
  keyframes: FallbackKeyframe[];
};

export type FallbackAnimationSteps = {
  [stepKey: string]: CssValues;
};

export type FallbackKeyframe = {
  /**
   * Time in ms when the keyframe starts, including delay.
   */
  startTime: number;

  /**
   * Time in ms when the keyframe ends, including delay.
   */
  endTime: number;

  /**
   * Duration of the keyframe in ms (endTime - startTime).
   */
  duration: number;

  /**
   * Easing function to apply to the keyframe.
   */
  ease: LerpFn;

  /**
   * Map of values at the start of the keyframe.
   */
  startValues: FallbackAnimationValues;

  /**
   * Map of values at the end of the keyframe.
   */
  endValues: FallbackAnimationValues;
};

export type FallbackAnimationValues = {
  [valueKey: string]: number | number[];
};

export type CssValues = {
  [valueKey: string]: string;
};

export type Eases = 'linear';
export type EaseMap = {
  linear: LerpFn;
};

export type LerpFn = (
  /**
   * Start value.
   */
  start: number | number[],

  /**
   * End value.
   */
  end: number | number[],

  /**
   * Current time in ms of the ease.
   */
  currentTime: number,

  /**
   * Total duration in ms of the ease.
   */
  duration: number,

  /**
   * Delay in ms before the ease starts.
   */
  delay?: number
) => number | number[];
export type CallbackFn = (currentValues: Map<string, string>) => void;
export type TickFn = (
  /**
   * Ordered list of animations to play.
   */
  anims: FallbackAnimation[],

  /**
   * Overall duration of the animation (i.e., lenght of the longest animation + its delay).
   */
  overallDuration: number,

  /**
   * Callback function that will be called when the animation is complete.
   */
  onComplete: CallbackFn,

  /**
   * Callback function that will be called on every animation frame.
   */
  onUpdate: CallbackFn,

  iterationCount: number,
  isStopped: () => boolean
) => void;

export type FallbackAnimationReturn = {
  id: string;
  canvas: HTMLCanvasElement | null;
  play: (
    onComplete: CallbackFn,
    isStopped: () => boolean,
    onUpdate?: CallbackFn
  ) => void;
  cleanup: () => void;
};

export type FallbackAnimationState = {
  target: HTMLElement;
  ctx: CanvasRenderingContext2D | null;
  id: string;
  mode: 'moz-element' | 'webkit-canvas' | 'to-data-url';
  wrapper: HTMLElement | null;
};
