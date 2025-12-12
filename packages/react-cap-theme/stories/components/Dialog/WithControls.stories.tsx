import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  DialogProps,
} from '@fluentui/react-components';
import { CAPThemeExamples } from '../../StorybookUtils';

export const CAPDialogWithCtrlsStory = ({
  modalType,
}: {
  modalType: DialogProps['modalType'];
}) => {
  return (
    <CAPThemeExamples
      examples={[
        {
          render: () => (
            <Dialog modalType={modalType}>
              <DialogTrigger disableButtonEnhancement>
                <Button>Open {modalType} dialog</Button>
              </DialogTrigger>
              <DialogSurface>
                <DialogBody>
                  <DialogTitle>Dialog title</DialogTitle>
                  <DialogContent>Dialog Content goes here.</DialogContent>
                  <DialogActions>
                    <DialogTrigger disableButtonEnhancement>
                      <Button appearance="secondary">Cancel</Button>
                    </DialogTrigger>
                    <Button appearance="primary">Confirm</Button>
                  </DialogActions>
                </DialogBody>
              </DialogSurface>
            </Dialog>
          ),
        },
      ]}
    />
  );
};

CAPDialogWithCtrlsStory.argTypes = {
  modalType: {
    options: ['modal', 'non-modal', 'alert'],
    control: { type: 'radio' },
  },
};

CAPDialogWithCtrlsStory.args = {
  modalType: 'modal',
};
