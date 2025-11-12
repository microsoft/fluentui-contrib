const createWrapper = (id: string, targetEl: HTMLElement): HTMLElement => {
  const targetDocument = targetEl.ownerDocument;
  let wrapper = targetDocument.getElementById(id);

  if (!wrapper) {
    wrapper = targetDocument.createElement('div');
    wrapper.id = id;
    // Safari requires the canvas to have be visible in the
    // viewport at some point (from what I can tell, the feature
    // isn't well-documented but this seems to give the most
    // reliable results).
    // Making the wrapper fixed ensures that it is always in the viewport.
    wrapper.style.position = 'fixed';
    wrapper.style.overflow = 'hidden';
    wrapper.style.width = '1px';
    wrapper.style.height = '1px';
    wrapper.style.left = '0';
    wrapper.style.top = '0';
    // Don't render
    wrapper.style.opacity = '0';
    // Kick in even more rendering/layout optimizations if possible
    wrapper.style.contain = 'strict';
    // Make sure this thing is untouchable
    wrapper.style.userSelect = 'none';
    wrapper.tabIndex = -1;
  }

  return wrapper;
};

export const appendWrapper = (
  id: string,
  parentEl: HTMLElement
): HTMLElement => {
  const wrapperEl = createWrapper(id, parentEl);

  if (!wrapperEl.isConnected) {
    parentEl.appendChild(wrapperEl);
  }

  return wrapperEl;
};
