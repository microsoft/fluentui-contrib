export { ContextualPaneEventTypes } from './events-contextual-pane.constants';
export { dismissPane } from './dismiss-pane';
export { arrowBack } from './arrow-back-pane';

import { isDismissPane } from './dismiss-pane';
import { isArrowBack } from './arrow-back-pane';

export const assertEvents = {
  isDismissPane,
  isArrowBack,
};
