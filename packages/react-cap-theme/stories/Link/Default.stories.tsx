import * as React from 'react';
import { Link, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
});

export const Default = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <p>
        This is an <Link href="#">inline link</Link> in a sentence.
      </p>
      <p>
        This is an{' '}
        <Link href="#" appearance="subtle">
          subtle link
        </Link>{' '}
        in a sentence.
      </p>
      <Link href="#" disabled>
        Disabled link
      </Link>
      <Link href="#" inline>
        Standalone link
      </Link>
    </div>
  );
};
