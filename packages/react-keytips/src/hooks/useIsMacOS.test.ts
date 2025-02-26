import { renderHook } from '@testing-library/react';
import { useFluent } from '@fluentui/react-components';
import { useIsMacOS } from './useIsMacOS';

jest.mock('@fluentui/react-shared-contexts', () => ({
  useFluent_unstable: jest.fn(),
}));

describe('useIsMacOS', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return true for macOS platform', () => {
    (useFluent as jest.Mock).mockReturnValue({
      targetDocument: {
        defaultView: {
          navigator: {
            platform: 'MacIntel',
          },
        },
      },
    });

    const { result } = renderHook(() => useIsMacOS());

    expect(result.current).toBe(true);
  });

  it('should return false for Windows platform', () => {
    (useFluent as jest.Mock).mockReturnValue({
      targetDocument: {
        defaultView: {
          navigator: {
            platform: 'Win32',
          },
        },
      },
    });

    const { result } = renderHook(() => useIsMacOS());

    expect(result.current).toBe(false);
  });

  it('should return false when targetDocument is undefined (default to Windows)', () => {
    (useFluent as jest.Mock).mockReturnValue({
      targetDocument: undefined,
    });

    const { result } = renderHook(() => useIsMacOS());

    expect(result.current).toBe(false);
  });

  it('should return false when defaultView is undefined (default to Windows)', () => {
    (useFluent as jest.Mock).mockReturnValue({
      targetDocument: {
        defaultView: undefined,
      },
    });

    const { result } = renderHook(() => useIsMacOS());

    expect(result.current).toBe(false);
  });

  it('should return false when navigator is undefined (default to Windows)', () => {
    (useFluent as jest.Mock).mockReturnValue({
      targetDocument: {
        defaultView: {
          navigator: undefined,
        },
      },
    });

    const { result } = renderHook(() => useIsMacOS());

    expect(result.current).toBe(false);
  });
});
