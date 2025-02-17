import * as React from 'react';
import { ToggleButton, type ToggleButtonProps } from '../ToggleButton';
import { createStrictClass } from '../../strictStyles/createStrictClass';

export const toolbarToggleButtonClassNames = {
  root: 'tco-ToolbarToggleButton',
};

export type ToolbarToggleButtonProps = Omit<ToggleButtonProps, 'className'>;

const rootStrictClassName = createStrictClass(
  toolbarToggleButtonClassNames.root
);

// TODO teams-components should reuse composition patterns
export const ToolbarToggleButton = React.forwardRef<
  HTMLButtonElement,
  ToggleButtonProps
>((props, ref) => {
  return (
    <ToggleButton
      ref={ref}
      {...props}
      className={rootStrictClassName}
      data-appearance={props.appearance}
    />
  );
});
