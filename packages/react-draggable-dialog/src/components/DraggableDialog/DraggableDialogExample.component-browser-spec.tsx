import * as React from 'react';

import { DialogTitle } from '@fluentui/react-components';

import { DraggableDialog, DraggableDialogProps } from '../DraggableDialog';
import { DraggableDialogHandle } from '../DraggableDialogHandle';
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
        <DraggableDialogHandle>
          <DialogTitle data-testid="drag-handle">Dialog Header</DialogTitle>
        </DraggableDialogHandle>
        <div data-testid="content">{children || contentText}</div>
      </DraggableDialogSurface>
    </DraggableDialog>
  );
};
