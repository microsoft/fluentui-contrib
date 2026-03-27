import type { DialogTitleState } from '@fluentui/react-dialog';
import {
  DialogTrigger,
  useDialogContext_unstable,
  useDialogTitle_unstable,
} from '@fluentui/react-dialog';
import { Dismiss16Regular } from '@fluentui/react-icons';
import { Button } from '../../../react-button';
import * as React from 'react';
import type { DialogTitleProps } from './DialogTitle.types';

export const useDialogTitle = (
  props: DialogTitleProps,
  ref: React.Ref<HTMLDivElement>
): DialogTitleState => {
  const { closeButton: closeButtonProps, ...restProps } = props;
  const modalType = useDialogContext_unstable((context) => context.modalType);

  const action =
    restProps.action ??
    (modalType === 'non-modal' ? (
      <DialogTrigger disableButtonEnhancement action="close">
        <Button
          appearance="transparent"
          aria-label="close"
          icon={<Dismiss16Regular />}
          size="small"
          {...closeButtonProps}
        />
      </DialogTrigger>
    ) : undefined);

  return useDialogTitle_unstable({ action, ...restProps }, ref);
};
