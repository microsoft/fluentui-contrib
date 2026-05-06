import type {
  ToolbarProps as FluentToolbarProps,
  ToolbarState as FluentToolbarState,
  ToolbarSlots,
} from '@fluentui/react-toolbar';

/**
 * Slots for the Toolbar component.
 * @public
 */
export type { ToolbarSlots };

/**
 * Props for the Toolbar component.
 * Extends Fluent UI ToolbarProps with SharePoint-specific appearance and size options.
 * @public
 */
export type ToolbarProps = Omit<FluentToolbarProps, 'size'> & {
  /**
   * The contextual appearance adds shadow to the toolbar. The static appearance is Fluent default appearance.
   * @default contextual
   */
  appearance?: 'contextual' | 'static';
  /**
   * Toolbar can have small, medium, or large size.
   * @default small
   */
  size?: 'small' | 'medium' | 'large';
};

/**
 * State for the Toolbar component.
 * @public
 */
export type ToolbarState = FluentToolbarState &
  Required<Pick<ToolbarProps, 'appearance'>>;
