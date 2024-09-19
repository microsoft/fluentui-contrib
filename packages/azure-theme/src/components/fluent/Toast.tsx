import * as React from 'react';
import {
  useId,
  Button,
  Field,
  RadioGroup,
  Radio,
  Spinner,
  Avatar,
  Toaster,
  useToastController,
  ToastTitle,
  Toast,
  ToastIntent,
} from '@fluentui/react-components';

export const ToastExample = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const [intent, setIntent] = React.useState<
    ToastIntent | 'progress' | 'avatar'
  >('success');
  const notify = () => {
    switch (intent) {
      case 'progress':
        dispatchToast(
          <Toast>
            <ToastTitle media={<Spinner size="tiny" />}>
              Progress toast
            </ToastTitle>
          </Toast>
        );
        break;
      case 'avatar':
        dispatchToast(
          <Toast>
            <ToastTitle media={<Avatar name="Erika Mustermann" size={16} />}>
              Avatar toast
            </ToastTitle>
          </Toast>
        );
        break;
      case 'error':
      case 'info':
      case 'success':
      case 'warning':
        dispatchToast(
          <Toast>
            <ToastTitle>Toast intent: {intent}</ToastTitle>
          </Toast>,
          { intent }
        );
        break;
    }
  };

  return (
    <>
      <Field label="Select a intent">
        <RadioGroup
          value={intent}
          onChange={(e, data) => setIntent(data.value as ToastIntent)}
        >
          <Radio label="success" value="success" />
          <Radio label="info" value="info" />
          <Radio label="warning" value="warning" />
          <Radio label="error" value="error" />
          <Radio label="progress (custom media slot)" value="progress" />
          <Radio label="avatar (custom media slot)" value="avatar" />
        </RadioGroup>
      </Field>
      <Toaster toasterId={toasterId} />
      <Button onClick={() => notify()}>Make toast</Button>
    </>
  );
};
