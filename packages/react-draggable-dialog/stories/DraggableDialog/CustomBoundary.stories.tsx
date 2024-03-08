import * as React from 'react';
import {
  makeStyles,
  shorthands,
  Button,
  DialogContent,
  Avatar,
  Field,
  Input,
  tokens,
} from '@fluentui/react-components';

import {
  DraggableDialog,
  DraggableDialogSurface,
  DraggableDialogHandle,
} from '@fluentui-contrib/react-draggable-dialog';

const useStyles = makeStyles({
  boundary: {
    ...shorthands.padding('16px'),
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    width: '640px',
    height: '560px',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '16px',
    alignItems: 'start',
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
  const [margin, setMargin] = React.useState(16);
  const boundaryRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <Button onClick={() => setOpen((isOpen) => !isOpen)}>
        Toggle dialog
      </Button>

      <div ref={boundaryRef} className={styles.boundary}>
        <p>
          The Draggable dialog will open inside this container. While dragging,
          this will be considered the boundary
        </p>

        <Field label="Margin">
          <Input
            type="number"
            onChange={({ target }) => setMargin(Number(target.value))}
            value={margin.toString()}
          />
        </Field>
      </div>

      <DraggableDialog
        open={open}
        modalType="non-modal"
        boundary={boundaryRef}
        margin={margin}
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
