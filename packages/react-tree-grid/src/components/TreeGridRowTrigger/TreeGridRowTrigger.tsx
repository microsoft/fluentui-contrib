import * as React from 'react';
import {
  applyTriggerPropsToChildren,
  getTriggerChild,
  useEventCallback,
  type FluentTriggerComponent,
  type TriggerProps,
} from '@fluentui/react-utilities';
import { useTreeGridRowContext } from '../../contexts/TreeGridRowContext';
import { useARIAButtonProps } from '@fluentui/react-aria';

export interface TreeGridRowTriggerProps
  extends TriggerProps<TreeGridRowTriggerChildProps> {
  /**
   * Enables internal trigger mechanism that ensures the child provided will be a compliant ARIA button.
   * @default false
   */
  enableButtonEnhancement?: boolean;
}

/**
 * Props that are passed to the child of the TreeGridTrigger when cloned to ensure correct behaviour for the TreeGrid
 */
interface TreeGridRowTriggerChildProps {
  onClick?(event: React.MouseEvent): void;
}

/**
 * A non-visual component that wraps its child
 * and configures them to be the trigger that will open or close a `TreeGridRow`.
 * This component should only accept one child.
 *
 * This component sole purpose is to avoid opting out of the internal controlled open state of a `TreeGrid`
 * Besides being a trigger that opens/close a TreeGrid through context this component doesn't do much,
 * making it basically unnecessary in cases where the trigger is outside of the `TreeGrid` component.
 */
export const TreeGridRowTrigger: React.FC<TreeGridRowTriggerProps> = (
  props
) => {
  const { children, enableButtonEnhancement = false } = props;

  const child = getTriggerChild(children);

  const { requestOpenChange, open } = useTreeGridRowContext();

  const handleClick = useEventCallback((event: React.MouseEvent) => {
    child?.props.onClick?.(event);
    if (!event.isDefaultPrevented()) {
      requestOpenChange({ open: !open, event, type: 'click' });
    }
  });

  const triggerChildProps = {
    ...child?.props,
    ref: child?.ref,
    onClick: handleClick,
  } as const;

  const ariaButtonTriggerChildProps = useARIAButtonProps(
    child?.type === 'button' || child?.type === 'a' ? child.type : 'div',
    {
      ...triggerChildProps,
      type: 'button',
    }
  );

  return applyTriggerPropsToChildren(
    children,
    enableButtonEnhancement ? ariaButtonTriggerChildProps : triggerChildProps
  );
};

TreeGridRowTrigger.displayName = 'TreeGridRowTrigger';
// type casting here is required to ensure internal type FluentTriggerComponent is not leaked
(TreeGridRowTrigger as FluentTriggerComponent).isFluentTriggerComponent = true;
