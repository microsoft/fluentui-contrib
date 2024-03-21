# @fluentui-contrib/react-draggable-dialog

A draggable dialog component powered by Fluent UI.

## Try it out

```sh
yarn add @fluentui-contrib/react-draggable-dialog

npm install @fluentui-contrib/react-draggable-dialog
```

```tsx
import * as React from 'react';
import { Button, DialogContent, DialogTrigger, DialogActions, DialogBody, DialogTitle } from '@fluentui/react-components';

import { DraggableDialog, DraggableDialogSurface, DraggableDialogHandle } from '@fluentui-contrib/react-draggable-dialog';

export const DraggableDialog = () => {
  return (
    <DraggableDialog>
      <DialogTrigger>
        <Button>Toggle dialog</Button>
      </DialogTrigger>

      <DraggableDialogSurface>
        <DialogBody>
          <DraggableDialogHandle>
            <DialogTitle>Drag me</DialogTitle>
          </DraggableDialogHandle>

          <DialogContent>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure cumque eaque?</p>
          </DialogContent>

          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>

            <Button appearance="primary">Do Something</Button>
          </DialogActions>
        </DialogBody>
      </DraggableDialogSurface>
    </DraggableDialog>
  );
};
```
