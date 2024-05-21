import * as React from 'react';
import {
  Field,
  Skeleton,
  SkeletonItem,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import type { SkeletonProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  invertedWrapper: {
    backgroundColor: tokens.colorNeutralBackground1,
    paddingTop: '50px',
    paddingBottom: '50px',
  },
});

export const SkeletonExample = (props: Partial<SkeletonProps>) => {
  const styles = useStyles();
  return (
    <div className={styles.invertedWrapper}>
      <Field validationMessage="Wave animation" validationState="none">
        <Skeleton {...props}>
          <SkeletonItem />
        </Skeleton>
      </Field>
      <Field validationMessage="Pulse animation" validationState="none">
        <Skeleton {...props} animation="pulse">
          <SkeletonItem />
        </Skeleton>
      </Field>
    </div>
  );
};
