import { useArrowNavigationGroup } from '@fluentui/react-components';

export const useChatMoverAttribute_unstable = (): ReturnType<
  typeof useArrowNavigationGroup
> =>
  useArrowNavigationGroup({
    axis: 'vertical',
    memorizeCurrent: true,
    unstable_hasDefault: true,
  });
