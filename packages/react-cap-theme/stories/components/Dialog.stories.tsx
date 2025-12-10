import * as React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from '@fluentui/react-components';
import { CAPThemeExamplesTable } from '../StorybookUtils';

export const CAPDialogStory = () => {
  return (
    <CAPThemeExamplesTable
      examples={[
        {
          title: 'Dialog body only with no overlay',
          render() {
            return (
              <DialogBody>
                <DialogTitle>Dialog title</DialogTitle>
                <DialogContent>
                  This shows the Dialogbody component used standalone, without
                  the Dialog wrapper or overlay. To see the border radius and
                  border color change, use the next row to open a full Dialog.
                </DialogContent>
                <DialogActions>
                  <DialogTrigger disableButtonEnhancement>
                    <Button appearance="secondary">Close</Button>
                  </DialogTrigger>
                  <Button appearance="primary">Do Something</Button>
                </DialogActions>
              </DialogBody>
            );
          },
        },
        {
          title: 'Regular modal Dialog',
          render() {
            return (
              <Dialog modalType="modal">
                <DialogTrigger disableButtonEnhancement>
                  <Button>Open regular modal dialog</Button>
                </DialogTrigger>
                <DialogSurface>
                  <DialogBody>
                    <DialogTitle>Modal dialog title</DialogTitle>
                    <DialogContent>
                      This is a regular modal dialog. When this type of dialog
                      is open, the rest of the page is dimmed out and cannot be
                      interacted with. * The tab sequence is kept within the
                      dialog and moving the focus outside * the dialog will
                      imply closing it. This is the default type of the
                      component.
                    </DialogContent>
                    <DialogActions>
                      <DialogTrigger disableButtonEnhancement>
                        <Button appearance="secondary">Cancel</Button>
                      </DialogTrigger>
                      <Button appearance="primary">Confirm</Button>
                    </DialogActions>
                  </DialogBody>
                </DialogSurface>
              </Dialog>
            );
          },
        },
      ]}
    />
  );
};

export default {
  title: 'CAP Theme/Components/Dialog',
  component: CAPDialogStory,
};
