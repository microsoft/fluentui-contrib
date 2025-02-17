import * as React from 'react';
import { Button, type ButtonProps } from '../Button';
import { createStrictClass } from '../../strictStyles/createStrictClass';

export const toolbarButtonClassNames = {
  root: 'tco-ToolbarButton',
};

export type ToolbarButtonProps = Omit<ButtonProps, 'className'>;

const rootStrictClassName = createStrictClass(toolbarButtonClassNames.root);

// TODO teams-components should reuse composition patterns
export const ToolbarButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <Button
        ref={ref}
        {...props}
        className={rootStrictClassName}
        data-appearance={props.appearance}
      />
    );
  }
);
