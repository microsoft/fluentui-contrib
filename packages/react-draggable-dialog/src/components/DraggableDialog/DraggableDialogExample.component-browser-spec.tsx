import * as React from 'react';

import { DraggableDialog, DraggableDialogProps } from '../DraggableDialog';
import { DraggableDialogSurface } from '../DraggableDialogSurface';

export type DraggableDialogTestExampleProps = Omit<
  DraggableDialogProps,
  'children'
> & {
  children?: React.ReactNode;
  contentText?: string;
  surfaceProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const DraggableDialogTestExample: React.FC<
  DraggableDialogTestExampleProps
> = (props) => {
  const {
    contentText = 'Dialog Content',
    children,
    surfaceProps,
    ...rest
  } = props;

  return (
    <DraggableDialog {...rest}>
      <DraggableDialogSurface tabIndex={0} {...surfaceProps}>
        <div data-testid="content">{children || contentText}</div>
      </DraggableDialogSurface>
    </DraggableDialog>
  );
};
