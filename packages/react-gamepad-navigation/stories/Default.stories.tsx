import * as React from 'react';
import {
  Button,
  Checkbox,
  Input,
  Label,
  makeStyles,
  useId,
} from '@fluentui/react-components';
import { useGamepadNavigationGroup } from '@fluentui-contrib/react-gamepad-navigation';
import { CheckmarkCircle20Filled } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    margin: '20px',
    padding: '20px',
    border: '4px dashed #D3D3D3',
    display: 'flex',
    flexDirection: 'column',
    width: '480px',
    ':focus-within': {
      border: '4px dashed red',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '480px',
  },
  input: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    maxWidth: '400px',
  },
});

export const Default = () => {
  const { gamepadNavDOMAttributes } = useGamepadNavigationGroup();

  const [submitted, setSubmited] = React.useState(false);
  const styles = useStyles();
  const emailId = useId('input');
  const passId = useId('input');
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmited(true);
  };

  return (
    <div className={styles.container} {...gamepadNavDOMAttributes}>
      <h1>Form Navigation</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <Label htmlFor={emailId} required>
          Email
        </Label>
        <Input
          id={emailId}
          name="email"
          placeholder="Enter a valid email"
          required
        />
        <Label htmlFor={passId} required>
          Password
        </Label>
        <Input id={passId} name="password" type="password" required />
        <Checkbox label="remember email" />
        <hr />
        <Button appearance="primary" type="submit">
          Login
        </Button>
      </form>
      <hr />
      {submitted && (
        <div>
          Form successfully submitted:
          <CheckmarkCircle20Filled color="#6bb700" />
        </div>
      )}
    </div>
  );
};
