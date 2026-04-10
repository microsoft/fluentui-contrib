import * as React from 'react';
import {
  Button,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
  },
});

export const Default = () => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={styles.container}>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <OverlayDrawer open={open} onOpenChange={(_, { open }) => setOpen(open)}>
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<DismissRegular />}
                onClick={() => setOpen(false)}
              />
            }
          >
            Drawer title
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <p>Drawer body content with the CAP theme applied.</p>
        </DrawerBody>
        <DrawerFooter>
          <Button appearance="primary" onClick={() => setOpen(false)}>
            Done
          </Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DrawerFooter>
      </OverlayDrawer>
    </div>
  );
};
