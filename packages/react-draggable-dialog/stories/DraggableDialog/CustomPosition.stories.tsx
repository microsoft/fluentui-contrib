import * as React from 'react';
import {
  makeStyles,
  Button,
  DialogContent,
  Avatar,
  DialogTrigger,
  Field,
  Input,
  makeResetStyles,
} from '@fluentui/react-components';

import {
  DraggableDialog,
  DraggableDialogSurface,
  DraggableDialogHandle,
  DraggableDialogPosition,
} from '@fluentui-contrib/react-draggable-dialog';

const useContainerStyles = makeResetStyles({
  gap: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

const useDialogContentStyles = makeStyles({
  surface: {
    width: '215px',
    height: '120px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  handle: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
});

/* React.memo is used to prevent unnecessary re-renders of the dialog content */
const CustomDialogContent = React.memo(() => {
  const contentStyles = useDialogContentStyles();

  return (
    <DraggableDialogSurface className={contentStyles.surface}>
      <DialogContent>
        <DraggableDialogHandle className={contentStyles.handle}>
          <div></div>
        </DraggableDialogHandle>

        <Avatar initials="JD" color="brown" name="John Doe" size={48} />
      </DialogContent>
    </DraggableDialogSurface>
  );
});

export const CustomPosition = () => {
  const containerStyles = useContainerStyles();
  const [position, setPosition] = React.useState({ x: 100, y: 100 });

  const onFieldChange = React.useCallback(
    (coordinate: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setPosition((pos) => ({
        ...pos,
        [coordinate]: Number(event.target.value),
      }));
    },
    []
  );

  const onPositionChange = React.useCallback(
    ({ x, y }: DraggableDialogPosition) => {
      setPosition({
        x: Math.round(x),
        y: Math.round(y),
      });
    },
    []
  );

  return (
    <div className={containerStyles}>
      <DraggableDialog
        margin={16}
        position={position}
        onPositionChange={onPositionChange}
        modalType="non-modal"
      >
        <DialogTrigger>
          <Button>Open dialog</Button>
        </DialogTrigger>

        <CustomDialogContent />
      </DraggableDialog>

      <div>
        <strong>Position:</strong>

        <Field label="X">
          <Input
            type="number"
            onChange={onFieldChange('x')}
            value={position.x.toString()}
          />
        </Field>

        <Field label="Y">
          <Input
            type="number"
            onChange={onFieldChange('y')}
            value={position.y.toString()}
          />
        </Field>
      </div>
    </div>
  );
};
