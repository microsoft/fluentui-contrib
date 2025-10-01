/**
 * @jest-environment node
 */

import { addModule } from './addModule';

describe('addModule (node)', () => {
  it('should resolve when targetWindow is undefined', async () => {
    await expect(
      addModule(undefined, 'https://example.com/', 'module.js')
    ).resolves.toBeUndefined();
  });
});
