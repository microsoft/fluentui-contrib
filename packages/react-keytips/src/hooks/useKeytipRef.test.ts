import { useKeytipRef } from './useKeytipRef';
import { useKeytipsManager } from './useKeytipsManager';
import { renderHook } from '@testing-library/react';
import { EVENTS } from '../constants';

const ID = 'r:id';

jest.mock('./useKeytipsManager', () => ({
  useKeytipsManager: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useId: () => ID,
}));

describe('useKeytipRef', () => {
  const register = jest.fn();
  const unregister = jest.fn();

  beforeEach(() => {
    register.mockClear();
    (useKeytipsManager as jest.Mock).mockReturnValue({
      register,
      unregister,
    });
  });

  it('should call add and remove events, generate uniqueId, lowercase and truncate sequence', () => {
    const keytipProps = {
      content: '1EEE',
      keySequences: ['A', '1eee'],
      uniqueId: 'kek',
      positioning: {
        target: null,
      },
    };

    const expected = {
      ...keytipProps,
      content: '1EE',
      id: 'ktp-a-1-e-e',
      keySequences: ['a', '1ee'],
    };

    const { unmount } = renderHook(() => useKeytipRef(keytipProps));

    expect(register).toHaveBeenCalledWith(expected);

    unmount();

    expect(unregister).toHaveBeenCalledWith(expected.uniqueId);
  });

  it('should not dispatch add and remove events', () => {
    const keytipProps = {
      content: '',
      keySequences: ['a'],
    };

    const { unmount } = renderHook(() => useKeytipRef(keytipProps));

    expect(register).not.toHaveBeenCalledWith(EVENTS.KEYTIP_ADDED);

    unmount();

    expect(register).not.toHaveBeenCalledWith(EVENTS.KEYTIP_REMOVED);
  });
});
