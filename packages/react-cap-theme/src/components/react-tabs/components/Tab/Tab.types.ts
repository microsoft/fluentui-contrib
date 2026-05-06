import type { TabState as BaseTabState } from '@fluentui/react-tabs';
import type { TabListState } from '../TabList/TabList.types';

/**
 * State used in rendering the Tab component.
 * @alpha
 */
export type TabState = BaseTabState & Pick<TabListState, 'appearance'>;
