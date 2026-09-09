/**
 * Generates a unique DOM ID for fallback animations.
 * Fast and simple implementation using timestamp + random suffix.
 */
export function generateFallbackId(): string {
  return `f-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;
}
