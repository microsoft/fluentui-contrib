/**
 * CSS Module mock for Jest.
 *
 * Returns the class name string as the value for any accessed key,
 * matching the behavior of identity-obj-proxy without an extra dependency.
 * Tests should query by role/label — not by class name — so the exact
 * value returned here does not matter for behavior assertions.
 */
module.exports = new Proxy(
  {},
  {
    get: (_, key) => (key === '__esModule' ? false : String(key)),
  },
);
