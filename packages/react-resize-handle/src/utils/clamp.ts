/**
 * Clamps a value between a minimum and maximum range.
 *
 * @param value - The value to be clamped.
 * @param min - The minimum value of the range.
 * @param max - The maximum value of the range.
 * @returns The clamped value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(Math.min(value, max), min);
}
