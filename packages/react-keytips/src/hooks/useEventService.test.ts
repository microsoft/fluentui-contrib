import { useEventService } from './useEventService';
import { renderHook } from '@testing-library/react';
import { EVENTS } from '../constants';

jest.mock('@fluentui/react-components', () => {
  return {
    useFluent: jest.fn().mockReturnValue({
      targetDocument: document,
    }),
  };
});

describe('useEventService', () => {
  it('should dispatch and event', () => {
    const { result } = renderHook(() => useEventService());
    const handler = jest.fn();
    const eventName = EVENTS.KEYTIP_ADDED;
    const payload = { uniqueId: '1', content: 'A', keySequences: ['a'] };
    result.current.subscribe(eventName, handler);
    result.current.dispatch(eventName, payload);
    expect(handler).toHaveBeenCalledWith(payload);
  });

  it('should unsubscribe from an event', () => {
    const { result } = renderHook(() => useEventService());
    const handler = jest.fn();
    const eventName = EVENTS.KEYTIP_ADDED;
    const payload = { uniqueId: '1', content: 'A', keySequences: ['a'] };
    const unsubscribe = result.current.subscribe(eventName, handler);
    result.current.dispatch(eventName, payload);
    expect(handler).toHaveBeenCalledWith(payload);
    unsubscribe();
    result.current.dispatch(eventName, payload);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should reset an event', () => {
    const { result } = renderHook(() => useEventService());

    const handler = jest.fn();
    const eventName = EVENTS.KEYTIP_ADDED;
    const payload = { uniqueId: '1', content: 'A', keySequences: ['a'] };

    result.current.subscribe(eventName, handler);

    result.current.dispatch(eventName, payload);

    expect(handler).toHaveBeenCalledWith(payload);
    expect(handler).toHaveBeenCalledTimes(1);

    result.current.reset();

    result.current.dispatch(eventName, { ...payload, uniqueId: '2' });

    // Verify, that handler was not called again after the reset
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
