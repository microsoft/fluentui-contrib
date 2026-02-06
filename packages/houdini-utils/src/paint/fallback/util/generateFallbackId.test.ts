import { generateFallbackId } from './generateFallbackId';

describe('generateFallbackId', () => {
  it('should generate IDs with correct prefix', () => {
    const id = generateFallbackId();
    expect(id).toMatch(/^f-/);
  });

  it('should generate unique IDs', () => {
    const ids = new Set<string>();
    for (let i = 0; i < 1000; i++) {
      ids.add(generateFallbackId());
    }
    expect(ids.size).toBe(1000);
  });
});
