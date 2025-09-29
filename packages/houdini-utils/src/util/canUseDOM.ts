/**
 * Verifies if an application can use DOM.
 *
 * Note: Copied from Fluent UI to avoid dependency on the entire library
 */
export function canUseDOM(): boolean {
  return (
    // eslint-disable-next-line no-restricted-globals
    typeof window !== 'undefined' &&
    // eslint-disable-next-line no-restricted-globals
    !!(window.document && window.document.createElement)
  );
}
