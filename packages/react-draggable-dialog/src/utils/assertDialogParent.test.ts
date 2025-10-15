import { assertDialogParent } from './assertDialogParent';

describe('assertDialogParent', () => {
  const originalEnv = process.env.NODE_ENV;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    process.env.NODE_ENV = originalEnv;
  });

  describe('when hasParent is true', () => {
    it('should not log an error regardless of environment', () => {
      process.env.NODE_ENV = 'development';
      assertDialogParent(true, 'TestComponent');
      expect(consoleErrorSpy).not.toHaveBeenCalled();

      process.env.NODE_ENV = 'production';
      assertDialogParent(true, 'TestComponent');
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });
  });

  describe('when hasParent is false', () => {
    it('should log an error in development environment', () => {
      process.env.NODE_ENV = 'development';
      const componentName = 'TestComponent';

      assertDialogParent(false, componentName);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `Warning: ${componentName} needs to be a descendant of DraggableDialog. Example:\n` +
          `  <DraggableDialog>\n    <${componentName} />\n  </DraggableDialog>`
      );
    });

    it('should not log an error in production environment', () => {
      process.env.NODE_ENV = 'production';

      assertDialogParent(false, 'TestComponent');

      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should log an error in test environment', () => {
      process.env.NODE_ENV = 'test';
      const componentName = 'AnotherComponent';

      assertDialogParent(false, componentName);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `Warning: ${componentName} needs to be a descendant of DraggableDialog. Example:\n` +
          `  <DraggableDialog>\n    <${componentName} />\n  </DraggableDialog>`
      );
    });
  });

  describe('error message formatting', () => {
    it('should include the correct component name in the error message', () => {
      process.env.NODE_ENV = 'development';
      const componentName = 'CustomDialogComponent';

      assertDialogParent(false, componentName);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          `Warning: ${componentName} needs to be a descendant of DraggableDialog`
        )
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining(`<${componentName} />`)
      );
    });
  });
});
