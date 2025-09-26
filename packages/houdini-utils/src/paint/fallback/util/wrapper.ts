import { getDocument } from '../../../util/featureDetect';

const createWrapper = (
  id: string,
  target?: HTMLElement | null
): HTMLElement => {
  const localDocument = getDocument(target);
  let wrapper = localDocument.getElementById(id);

  if (!wrapper) {
    wrapper = localDocument.createElement('div');
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

// TOOD id
export const appendWrapper = (parent: HTMLElement, id = 'foo'): HTMLElement => {
  const wrapper = createWrapper(id);

  if (!wrapper.isConnected) {
    parent.appendChild(wrapper);
  }

  return wrapper;
};
