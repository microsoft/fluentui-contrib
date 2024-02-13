import * as React from 'react';
import {
  makeStyles,
  Button,
  DialogContent,
  Avatar,
} from '@fluentui/react-components';

import {
  DraggableDialog,
  DraggableDialogSurface,
  DraggableDialogHandle,
} from '@fluentui-contrib/react-draggable-dialog';

const useStyles = makeStyles({
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

export const Default = () => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <DraggableDialog open={open} modalType="non-modal" margin={16}>
      <Button onClick={() => setOpen((isOpen) => !isOpen)}>
        Toggle dialog
      </Button>

      <DraggableDialogSurface className={styles.dialog}>
        <DialogContent>
          <DraggableDialogHandle className={styles.handle}>
            <div></div>
          </DraggableDialogHandle>

          <Avatar initials="JD" color="brown" name="John Doe" size={48} />
        </DialogContent>
      </DraggableDialogSurface>
    </DraggableDialog>
  );
};
