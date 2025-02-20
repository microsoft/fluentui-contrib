import * as React from 'react';
import { Button, type ButtonProps } from '../Button';
import { createStrictClass } from '../../strictStyles/createStrictClass';
import { useItemRegistration } from './itemRegistration';
import { useMergedRefs } from '@fluentui/react-components';
import { mergeStrictClasses } from '../../strictStyles/mergeStrictClasses';

export const toolbarButtonClassNames = {
  root: 'tco-ToolbarButton',
};

export type ToolbarButtonProps = Omit<ButtonProps, 'className'>;

const rootStrictClassName = createStrictClass(toolbarButtonClassNames.root);

// TODO teams-components should reuse composition patterns
export const ToolbarButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { ref: registerRef, styles } = useItemRegistration({
      appearance: props.appearance,
      type: 'button',
    });

    return (
      <Button
        ref={useMergedRefs(ref, registerRef)}
        {...props}
        className={mergeStrictClasses(rootStrictClassName, styles.root)}
        data-appearance={props.appearance}
      />
    );
  }
);
