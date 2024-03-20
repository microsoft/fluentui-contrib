import * as React from 'react';
import {
  makeStyles,
  Button,
  DialogContent,
  Avatar,
  DialogTrigger,
  Field,
  Input,
  shorthands,
} from '@fluentui/react-components';

import {
  DraggableDialog,
  DraggableDialogSurface,
  DraggableDialogHandle,
  DraggableDialogPosition,
} from '@fluentui-contrib/react-draggable-dialog';

const useStyles = makeStyles({
  container: {
    ...shorthands.gap('16px'),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  dialog: {
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

export const InitialPosition = () => {
  const styles = useStyles();
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
    <div className={styles.container}>
      <DraggableDialog
        margin={16}
        position={position}
        onPositionChange={onPositionChange}
      >
        <DialogTrigger>
          <Button>Toggle dialog</Button>
        </DialogTrigger>

        <DraggableDialogSurface className={styles.dialog}>
          <DialogContent>
            <DraggableDialogHandle className={styles.handle}>
              <div></div>
            </DraggableDialogHandle>

            <Avatar initials="JD" color="brown" name="John Doe" size={48} />
          </DialogContent>
        </DraggableDialogSurface>
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
