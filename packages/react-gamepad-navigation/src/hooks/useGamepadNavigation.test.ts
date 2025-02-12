// import { renderHook } from '@testing-library/react';
import { useGamepadNavigation } from './useGamepadNavigation';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createDocumentMock = (): Document => {
  const externalDocument = document.implementation.createDocument(
    'http://www.w3.org/1999/xhtml',
    'html',
    null
  );
  // `defaultView` is read-only by spec, getter is used as workaround
  // https://github.com/facebook/jest/issues/2227#issuecomment-430435133
  jest
    .spyOn(externalDocument, 'defaultView', 'get')
    .mockReturnValue({} as typeof document.defaultView);
  return externalDocument;
};
describe('useGamepadNavigation', () => {
  it('TODO: add unit test for this hook', () => {
    expect(typeof useGamepadNavigation).toBe('function');
  });
});
