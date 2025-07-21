jest.mock('@fluentui/react-components', () => ({
  useFluent: () => ({ targetDocument: undefined }),
  useId: (prefix: string) => `${prefix}-mock-id`,
}));

import { renderHook } from '@testing-library/react';
import { useGamepadNavigation } from './useGamepadNavigation';

describe('useGamepadNavigation', () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('handles missing targetDocument gracefully', () => {
    const warnSpy = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => undefined);
    renderHook(() => useGamepadNavigation({}));
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});
