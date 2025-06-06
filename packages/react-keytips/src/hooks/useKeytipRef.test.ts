import { useKeytipRef } from './useKeytipRef';
import { useEventService } from './useEventService';
import { renderHook } from '@testing-library/react';
import { EVENTS } from '../constants';

const ID = 'r:id';

jest.mock('./useEventService', () => ({
  useEventService: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useId: () => ID,
}));

describe('useKeytipRef', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    (useEventService as jest.Mock).mockReturnValue({ dispatch });
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
      uniqueId: 'kek',
      keySequences: ['a', '1ee'],
    };

    const { unmount } = renderHook(() => useKeytipRef(keytipProps));

    expect(dispatch).toHaveBeenCalledWith(
      EVENTS.KEYTIP_ADDED,
      expect.objectContaining(expected)
    );

    unmount();

    expect(dispatch).toHaveBeenCalledWith(
      EVENTS.KEYTIP_REMOVED,
      expected.uniqueId
    );
  });

  it('should not dispatch add and remove events', () => {
    const keytipProps = {
      content: '',
      keySequences: ['a'],
    };

    const { unmount } = renderHook(() => useKeytipRef(keytipProps));

    expect(dispatch).not.toHaveBeenCalledWith(EVENTS.KEYTIP_ADDED);

    unmount();

    expect(dispatch).not.toHaveBeenCalledWith(EVENTS.KEYTIP_REMOVED);
  });
});
