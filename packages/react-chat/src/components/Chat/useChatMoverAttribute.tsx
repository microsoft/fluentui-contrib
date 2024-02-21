import { useArrowNavigationGroup } from '@fluentui/react-components';

import type { Types as TabsterTypes } from 'tabster';

export const useChatMoverAttribute_unstable =
  (): TabsterTypes.TabsterDOMAttribute =>
    useArrowNavigationGroup({
      axis: 'vertical',
      memorizeCurrent: true,
      unstable_hasDefault: true,
    });
