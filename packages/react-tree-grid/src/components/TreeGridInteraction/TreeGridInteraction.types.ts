import type { Slot } from '@fluentui/react-components';
import { ExtractSlotProps } from '@fluentui/react-utilities';

export type TreeGridInteractionProps = ExtractSlotProps<Slot<'div'>> & {
  /**
   * aria-roledescription is required for a treegrid interaction,
   * it is used to provide the user with input about the interactivity of the element.
   * Something generic as "Interactive content" should be enough
   *
   * @example
   * ```tsx
   * <TreeGridInteraction aria-roledescription="Interactive content">
   *   <Field label="Type here">
   *     <Input />
   *   </Field>
   * </TreeGridInteraction>
   * ```
   */
  'aria-roledescription': string;
  /**
   * aria-description is required for a treegrid interaction,
   * it should be used to explain the interaction that the user should have with the element.
   *
   * @example
   * ```tsx
   * <TreeGridInteraction aria-description="Interact with Enter, then leave with Escape">
   *   <Field label="Type here">
   *     <Input />
   *   </Field>
   * </TreeGridInteraction>
   * ```
   */
  'aria-description': string;
  /**
   * aria-label is required for a treegrid interaction.
   *
   * @example
   * ```tsx
   * <TreeGridInteraction aria-label="TreeGrid Interactive Input">
   *   <Field label="Type here">
   *     <Input />
   *   </Field>
   * </TreeGridInteraction>
   * ```
   */
  'aria-label': string;
};
