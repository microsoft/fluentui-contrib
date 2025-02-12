import * as React from 'react';
import { AzureLightTheme, AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import { FluentProvider } from '@fluentui/react-components';
import {
  useId,
  Link,
  Button,
  Toaster,
  useToastController,
  Toast,
  ToastTitle,
  ToastBody,
  ToastFooter,
} from '@fluentui/react-components';

export const ToastExample = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle action={<Link>Undo</Link>}>Email sent</ToastTitle>
        <ToastBody subtitle="Subtitle">This is a toast body</ToastBody>
        <ToastFooter>
          <Link>Action</Link>
          <Link>Action</Link>
        </ToastFooter>
      </Toast>,
      { intent: 'success' }
    );

  return (
    <div style={{ display: 'flex', gap: '1rem', height: '90vh' }}>
      <FluentProvider
        theme={AzureLightTheme}
        style={{ flex: 1, height: '100%', paddingTop: 20 }}
      >
        <Toaster toasterId={toasterId} />
        <Button onClick={notify}>Make toast</Button>
      </FluentProvider>
      <FluentProvider
        theme={AzureDarkTheme}
        style={{ flex: 1, height: '100%', paddingTop: 20, paddingLeft: 20 }}
      >
        <Toaster toasterId={toasterId} />
        <Button onClick={notify}>Make toast</Button>
      </FluentProvider>
    </div>
  );
};
