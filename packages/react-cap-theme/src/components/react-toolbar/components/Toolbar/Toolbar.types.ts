import type {
  ToolbarProps as FluentToolbarProps,
  ToolbarState as FluentToolbarState,
  ToolbarContextValues as FluentToolbarContextValues,
} from '@fluentui/react-toolbar';

/**
 * Props for the Toolbar component.
 * @alpha
 */
export type ToolbarProps = FluentToolbarProps & {
  /**
   * The contextual appearance adds shadow to the toolbar. The static appearance is Fluent default appearance.
   * @default contextual
   */
  appearance?: 'contextual' | 'static';
  /**
   * Defines the alignment of the toolbar content.
   * @default start
   */
  layout?: 'start' | 'space-between' | 'end';
  /**
   * Controls the width behavior of the toolbar.
   * - 'contained': Toolbar takes only the space needed for its content (inline-flex)
   * - 'full': Toolbar takes the full width of its container (flex)
   * @default contained
   */
  width?: 'contained' | 'full';
};

/**
 * State for the Toolbar component.
 * @alpha
 */
export type ToolbarState = FluentToolbarState &
  Required<Pick<ToolbarProps, 'appearance' | 'layout' | 'width'>>;

/**
 * Context values for the Toolbar component.
 * Extends Fluent UI's ToolbarContextValues with SharePoint-specific appearance context.
 * @alpha
 */
export type ToolbarContextValues = FluentToolbarContextValues &
  Pick<ToolbarState, 'appearance'>;
