import type {
  TabListProps as BaseTabListProps,
  TabListState as BaseTabListState,
} from '@fluentui/react-tabs';

/**
 * TabList properties.
 * @alpha
 */
export type TabListProps = Omit<BaseTabListProps, 'appearance'> & {
  /**
   * Apply different appearances to the tabs inside.
   *
   * - 'transparent': No background or border styling
   * - 'subtle-circular': Adds background and border styling
   *
   * @default 'transparent'
   */
  appearance?: 'transparent' | 'subtle-circular';
};

/**
 * State used in rendering the TabList component.
 * @alpha
 */
export type TabListState = Omit<BaseTabListState, 'appearance'> &
  Required<Pick<TabListProps, 'appearance'>>;
