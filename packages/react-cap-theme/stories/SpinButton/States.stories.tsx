import * as React from 'react';
import {
  makeStyles,
  mergeClasses,
  tokens,
  SpinButton,
  type SpinButtonProps,
} from '@fluentui/react-components';
import {
  bundleIcon,
  Calendar16Filled,
  CalendarLtr16Regular,
  Calendar20Filled,
  CalendarLtr20Regular,
  Calendar24Filled,
  CalendarLtr24Regular,
  iconFilledClassName,
  iconRegularClassName,
} from '@fluentui/react-icons';
import { capTokens } from '../../src/components/tokens';

type Size = 'small' | 'medium' | 'large';

const CalendarSmall = bundleIcon(Calendar16Filled, CalendarLtr16Regular);
const CalendarMedium = bundleIcon(Calendar20Filled, CalendarLtr20Regular);
const CalendarLarge = bundleIcon(Calendar24Filled, CalendarLtr24Regular);

const useStyles = makeStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'auto 280px',
    alignItems: 'center',
    rowGap: tokens.spacingVerticalM,
    columnGap: tokens.spacingHorizontalXL,
    maxWidth: '460px',
  },
  rowLabel: {
    color: tokens.colorNeutralForeground3,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
  },
  wrap: {
    position: 'relative',
    display: 'inline-block',
    width: '100%',

    [`& .${iconRegularClassName}`]: { color: capTokens.colorNeutralForeground5 },

    [`& .fui-SpinButton:hover ~ .cap-sb-icon .${iconRegularClassName}`]: {
      display: 'none',
    },
    [`& .fui-SpinButton:hover ~ .cap-sb-icon .${iconFilledClassName}`]: {
      display: 'inline',
      color: capTokens.colorNeutralForeground5Hover,
    },

    [`& .fui-SpinButton:active ~ .cap-sb-icon .${iconRegularClassName}, & .fui-SpinButton:focus-within ~ .cap-sb-icon .${iconRegularClassName}`]:
      {
        display: 'none',
      },
    [`& .fui-SpinButton:active ~ .cap-sb-icon .${iconFilledClassName}, & .fui-SpinButton:focus-within ~ .cap-sb-icon .${iconFilledClassName}`]:
      {
        display: 'inline',
        color: tokens.colorBrandForeground2,
      },

    [`& .cap-sb-icon-disabled .${iconRegularClassName}, & .cap-sb-icon-disabled .${iconFilledClassName}`]:
      {
        color: tokens.colorNeutralForegroundDisabled,
      },
  },
  wrapSmall: {
    '& .fui-SpinButton__input': {
      paddingLeft: '20px',
    },
  },
  wrapMedium: {
    '& .fui-SpinButton__input': {
      paddingLeft: '26px',
    },
  },
  wrapLarge: {
    '& .fui-SpinButton__input': {
      paddingLeft: '32px',
    },
  },
  icon: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'inline-flex',
    pointerEvents: 'none',
    zIndex: 1,
  },
  iconSmall: {
    left: '8px',
  },
  iconMedium: {
    left: '10px',
  },
  iconLarge: {
    left: '10px',
  },
  spin: {
    width: '100%',
  },
  all: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXXXL,
  },
  sectionTitle: {
    margin: 0,
    marginBottom: tokens.spacingVerticalM,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  contrastPanel: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: tokens.spacingHorizontalL,
    borderRadius: tokens.borderRadiusMedium,
  },
});

const bySize = <T,>(size: Size | undefined, s: T, m: T, l: T): T =>
  size === 'large' ? l : size === 'medium' ? m : s;

const SpinButtonWithIcon = (
  props: Omit<SpinButtonProps, 'size'> & { size?: Size }
) => {
  const styles = useStyles();
  const { size } = props;
  const Icon = bySize(size, CalendarSmall, CalendarMedium, CalendarLarge);
  return (
    <div
      className={mergeClasses(
        styles.wrap,
        bySize(size, styles.wrapSmall, styles.wrapMedium, styles.wrapLarge)
      )}
    >
      <SpinButton
        {...(props as SpinButtonProps)}
        className={mergeClasses(styles.spin, props.className)}
      />
      <span
        className={mergeClasses(
          'cap-sb-icon',
          props.disabled && 'cap-sb-icon-disabled',
          styles.icon,
          bySize(size, styles.iconSmall, styles.iconMedium, styles.iconLarge)
        )}
      >
        <Icon />
      </span>
    </div>
  );
};

type Row = {
  key: string;
  label: string;
  props: SpinButtonProps;
};

const ROWS: Row[] = [
  { key: 'rest', label: 'Rest', props: {} },
  { key: 'hover', label: 'Hover', props: { className: 'cap-hover' } },
  { key: 'pressed', label: 'Pressed / Active', props: { className: 'cap-pressed' } },
  { key: 'error', label: 'Error', props: { 'aria-invalid': true } },
  { key: 'disabled', label: 'Disabled', props: { disabled: true } },
  { key: 'readonly', label: 'Read-only', props: { readOnly: true } },
  { key: 'focus', label: 'Focused', props: { className: 'cap-focus' } },
];

type Appearance = NonNullable<SpinButtonProps['appearance']>;

const StatesMatrix = ({
  withValue,
  size,
  appearance,
}: {
  withValue: boolean;
  size: Size;
  appearance: Appearance;
}) => {
  const styles = useStyles();
  const valueProps: Omit<SpinButtonProps, 'size'> = withValue
    ? { appearance, defaultValue: 10, min: 0, max: 20 }
    : {
        appearance,
        value: null,
        displayValue: '',
        placeholder: 'Placeholder text',
      };

  return (
    <div className={styles.grid}>
      {ROWS.map((row) => (
        <React.Fragment key={row.key}>
          <span className={styles.rowLabel}>{row.label}</span>
          <SpinButtonWithIcon size={size} {...valueProps} {...row.props} />
        </React.Fragment>
      ))}
    </div>
  );
};

const pseudo = {
  hover: '.cap-hover',
  active: '.cap-pressed',
  focusWithin: '.cap-focus',
};

const APPEARANCES: { key: Appearance; label: string }[] = [
  { key: 'outline', label: 'Outline' },
  { key: 'underline', label: 'Underline' },
  { key: 'filled-lighter', label: 'Filled Lighter' },
  { key: 'filled-darker', label: 'Filled Darker' },
];
const SIZES: Size[] = ['small', 'medium', 'large'];

const SECTIONS = APPEARANCES.flatMap((appearance) =>
  SIZES.flatMap((size) =>
    [false, true].map((withValue) => ({
      appearance: appearance.key,
      title: `${appearance.label} · ${size} · ${
        withValue ? 'with value' : 'placeholder'
      }`,
      size,
      withValue,
    }))
  )
);

export const All = () => {
  const styles = useStyles();
  return (
    <div className={styles.all}>
      {SECTIONS.map((section) => (
        <section key={section.title}>
          <h3 className={styles.sectionTitle}>{section.title}</h3>
          <div
            className={
              section.appearance === 'filled-lighter'
                ? styles.contrastPanel
                : undefined
            }
          >
            <StatesMatrix
              appearance={section.appearance}
              withValue={section.withValue}
              size={section.size}
            />
          </div>
        </section>
      ))}
    </div>
  );
};
All.parameters = {
  pseudo,
  docs: {
    description: {
      story:
        'Every SpinButton permutation in one view: all four appearances ' +
        '(outline, underline, filled-lighter, filled-darker) across both sizes, ' +
        'with and without a value, over all seven states. Hover, pressed and focus ' +
        'rows are forced via storybook-addon-pseudo-states.',
    },
  },
};
