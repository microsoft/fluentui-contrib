export const assertDialogParent = (
  hasParent: boolean,
  componentName: string
) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!hasParent) {
      console.error(
        `Warning: ${componentName} is not a descendant of DraggableDialog`
      );
    }
  }
};
