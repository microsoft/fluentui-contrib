import { makeStrictStyles } from '../../strictStyles/makeStrictStyles';

export const itemRegistrationVars = {
  toolbarItemMarginInlineStart: '--toolbar-item-margin-inline-start',
};

let propertyRegisterComplete = false;

export const registerCustomProperties = (win: typeof globalThis) => {
  if (propertyRegisterComplete) {
    return;
  }

  try {
    win.CSS.registerProperty({
      name: itemRegistrationVars.toolbarItemMarginInlineStart,
      syntax: '<length>',
      inherits: false,
      initialValue: '0px',
    });
  } catch {
    // ignore multiple registration error
  }

  propertyRegisterComplete = true;
};

export const useItemRegistrationStyles = makeStrictStyles({
  root: {
    marginInlineStart: `var(${itemRegistrationVars.toolbarItemMarginInlineStart})`,
  },
});
