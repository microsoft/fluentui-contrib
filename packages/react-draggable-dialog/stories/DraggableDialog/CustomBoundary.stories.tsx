import * as React from 'react';
import {
  makeStyles,
  shorthands,
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
  boundary: {
    ...shorthands.padding('16px'),
    width: '800px',
    height: '800px',
    position: 'relative',
    marginTop: '16px',
    backgroundColor: '#babaca',
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

export const CustomBoundary = () => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);
  const boundaryRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <Button onClick={() => setOpen((isOpen) => !isOpen)}>
        Toggle dialog
      </Button>

      <div ref={boundaryRef} className={styles.boundary}>
        <p>The Draggable dialog will be kept inside this element</p>
      </div>

      <DraggableDialog
        open={open}
        modalType="non-modal"
        boundary={boundaryRef}
        margin={16}
      >
        <DraggableDialogSurface className={styles.dialog}>
          <DialogContent>
            <DraggableDialogHandle className={styles.handle}>
              <div></div>
            </DraggableDialogHandle>

            <Avatar initials="JD" color="brown" name="John Doe" size={48} />
          </DialogContent>
        </DraggableDialogSurface>
      </DraggableDialog>
    </>
  );
};
