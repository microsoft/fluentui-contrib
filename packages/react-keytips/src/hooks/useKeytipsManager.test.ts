import { useKeytipsManager } from './useKeytipsManager';
import { renderHook } from '@testing-library/react';

jest.mock('@fluentui/react-components', () => {
  return {
    useId: () => 'keytip-id',
    useFluent: jest.fn().mockReturnValue({
      targetDocument: document,
    }),
  };
});

describe('useKeytipsManager', () => {
  it('keeps registered keytips in sync through update and removal', () => {
    const { result } = renderHook(() => useKeytipsManager());

    const uniqueId = result.current.register({
      content: 'A',
      keySequences: ['a'],
    });

    expect(result.current.getKeytips()[uniqueId]).toEqual(
      expect.objectContaining({
        uniqueId,
        content: 'A',
        keySequences: ['a'],
      })
    );

    result.current.update({
      uniqueId,
      content: 'B',
      keySequences: ['b'],
    });

    expect(result.current.getKeytips()[uniqueId]).toEqual(
      expect.objectContaining({
        uniqueId,
        content: 'B',
        keySequences: ['b'],
      })
    );
    expect(result.current.getKeytips()[uniqueId].content).toBe('B');

    result.current.unregister(uniqueId);

    expect(result.current.getKeytips()[uniqueId]).toBeUndefined();
  });
});
