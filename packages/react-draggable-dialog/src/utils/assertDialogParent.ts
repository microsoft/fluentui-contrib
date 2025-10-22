export const assertDialogParent = (
  hasParent: boolean,
  componentName: string
): void => {
  if (process.env.NODE_ENV !== 'production') {
    if (!hasParent) {
      console.error(
        `Warning: ${componentName} needs to be a descendant of DraggableDialog. Example:\n` +
          `  <DraggableDialog>\n    <${componentName} />\n  </DraggableDialog>`
      );
    }
  }
};
