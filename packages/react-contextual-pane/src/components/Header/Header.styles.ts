import {
  makeStyles,
  tokens,
  typographyStyles,
  // createCustomFocusIndicatorStyle,
} from '@fluentui/react-components';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '40px',
    alignItems: 'center',
    paddingLeft: tokens.spacingVerticalXL,
    paddingRight: tokens.spacingVerticalM,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    justifyContent: 'space-between',
    gap: tokens.spacingHorizontalXL,
  },
  rootWithLeftContent: {
    paddingLeft: tokens.spacingVerticalM,
  },
  titleContentWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXS,
    overflow: 'hidden',
  },
  title: {
    ...typographyStyles.body1Strong,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    padding: tokens.spacingHorizontalXS,
    // ...createCustomFocusIndicatorStyle({
    //   outlineColor: tokens.colorStrokeFocus2,
    //   outlineOffset: '-2px',
    // }),
  },
  brandToolbar: {
    padding: 0,
  },
  brandIcon: {
    width: '32px',
    height: '32px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
