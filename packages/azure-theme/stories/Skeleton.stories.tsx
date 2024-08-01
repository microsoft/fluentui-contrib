import * as React from 'react';
import { AzureLightTheme, AzureDarkTheme } from '@fluentui-contrib/azure-theme';
import {
  Field,
  Skeleton,
  SkeletonItem,
  makeStyles,
  tokens,
  FluentProvider,
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
    <div style={{ display: 'flex', gap: '1rem', height: '90vh' }}>
      <FluentProvider
        theme={AzureLightTheme}
        style={{ flex: 1, height: '100%', paddingTop: 20 }}
      >
        <div className={styles.invertedWrapper}>
          <Field validationMessage="Opaque Appearance" validationState="none">
            <Skeleton {...props} aria-label="Loading Content">
              <SkeletonItem />
            </Skeleton>
          </Field>
          <Field
            validationMessage="Translucent Appearance"
            validationState="none"
          >
            <Skeleton
              {...props}
              appearance="translucent"
              aria-label="Loading Content"
            >
              <SkeletonItem />
            </Skeleton>
          </Field>
        </div>
      </FluentProvider>
      <FluentProvider
        theme={AzureDarkTheme}
        style={{ flex: 1, height: '100%', paddingTop: 20, paddingLeft: 20 }}
      >
        <div className={styles.invertedWrapper}>
          <Field validationMessage="Opaque Appearance" validationState="none">
            <Skeleton {...props} aria-label="Loading Content">
              <SkeletonItem />
            </Skeleton>
          </Field>
          <Field
            validationMessage="Translucent Appearance"
            validationState="none"
          >
            <Skeleton
              {...props}
              appearance="translucent"
              aria-label="Loading Content"
            >
              <SkeletonItem />
            </Skeleton>
          </Field>
        </div>
      </FluentProvider>
    </div>
  );
};
