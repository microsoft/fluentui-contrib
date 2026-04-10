import * as React from 'react';
import { Image, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
});

export const Default = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/200x200.png"
        alt="Default image"
        width={200}
        height={200}
      />
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/200x200.png"
        alt="Rounded image"
        shape="rounded"
        width={200}
        height={200}
      />
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/200x200.png"
        alt="Circular image"
        shape="circular"
        width={200}
        height={200}
      />
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/200x200.png"
        alt="Bordered image"
        bordered
        width={200}
        height={200}
      />
    </div>
  );
};
