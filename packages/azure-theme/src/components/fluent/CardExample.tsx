import * as React from 'react';
import {
  makeStyles,
  tokens,
  shorthands,
  Caption1,
  Subtitle1,
  mergeClasses,
  Text,
} from '@fluentui/react-components';
import { Card, CardHeader, CardProps } from '@fluentui/react-components';

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/';

  return `${ASSET_URL}${asset}`;
};

const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    columnGap: '16px',
    rowGap: '36px',
  },

  title: {
    ...shorthands.margin(0, 0, '12px'),
  },

  card: {
    width: '300px',
    maxWidth: '100%',
    height: 'fit-content',
  },

  flex: {
    ...shorthands.gap('4px'),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  appIcon: {
    ...shorthands.borderRadius('4px'),
    height: '32px',
  },

  caption: {
    color: tokens.colorNeutralForeground3,
  },

  cardFooter: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const Title = ({ children }: { children: string }) => {
  const styles = useStyles();

  return (
    <Subtitle1 as="h4" block className={styles.title}>
      Title
    </Subtitle1>
  );
};

const CardExample1 = (props: CardProps) => {
  const styles = useStyles();

  return (
    <Card className={styles.card} {...props}>
      <header className={styles.flex}>
        <img
          className={styles.appIcon}
          src={resolveAsset('logo.svg')}
          alt="Application one logo"
        />
        <img
          className={styles.appIcon}
          src={resolveAsset('logo2.svg')}
          alt="Application two logo"
        />
      </header>

      <CardHeader
        header={
          <Text weight="semibold">
            Alert in Teams when a new document is uploaded in channel
          </Text>
        }
        description={
          <Caption1 className={styles.caption}>By Microsoft</Caption1>
        }
      />

      <footer className={mergeClasses(styles.flex, styles.cardFooter)}>
        <span>Automated</span>
        <span>3290</span>
      </footer>
    </Card>
  );
};

export const CardExample = () => {
  const styles = useStyles();

  return (
    <div className={styles.main}>
      <section>
        <Title>'small'</Title>
        <CardExample1 size="small" />
      </section>

      <section>
        <Title>'medium' (Default)</Title>
        <CardExample1 size="medium" />
      </section>

      <section>
        <Title>'large'</Title>
        <CardExample1 size="large" />
      </section>
    </div>
  );
};