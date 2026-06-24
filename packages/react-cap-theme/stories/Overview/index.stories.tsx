import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    maxWidth: '820px',
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    fontFamily: tokens.fontFamilyBase,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  title: {
    fontSize: tokens.fontSizeHero800,
    fontWeight: tokens.fontWeightSemibold,
    margin: 0,
  },
  lede: {
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorNeutralForeground2,
    margin: 0,
  },
  h2: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    margin: `${tokens.spacingVerticalM} 0 0 0`,
    paddingBottom: tokens.spacingVerticalXS,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  p: {
    margin: 0,
    fontSize: tokens.fontSizeBase300,
  },
  code: {
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
    backgroundColor: tokens.colorNeutralBackground3,
    padding: `0 ${tokens.spacingHorizontalXXS}`,
    borderRadius: tokens.borderRadiusSmall,
  },
  pre: {
    margin: 0,
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase300,
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground1,
    padding: tokens.spacingHorizontalM,
    borderRadius: tokens.borderRadiusMedium,
    overflowX: 'auto',
    whiteSpace: 'pre',
  },
  list: {
    margin: 0,
    paddingLeft: tokens.spacingHorizontalXL,
    fontSize: tokens.fontSizeBase300,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXS,
  },
});

const CodeBlock: React.FC<{ children: string }> = ({ children }) => {
  const styles = useStyles();
  return (
    <pre className={styles.pre}>
      <code>{children}</code>
    </pre>
  );
};

const installSnippet = `npm install @fluentui-contrib/react-cap-theme`;

const usageSnippet = `import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { CAP_STYLE_HOOKS } from '@fluentui-contrib/react-cap-theme';

// The CAP look-and-feel needs a few extra design tokens on the theme.
const capTheme = {
  ...webLightTheme,
  borderRadius2XLarge: '12px',
  borderRadius3XLarge: '16px',
  borderRadius4XLarge: '24px',
  colorNeutralStroke4: '#ebebeb',
  colorNeutralStroke4Hover: '#e0e0e0',
  colorNeutralStroke4Pressed: '#d6d6d6',
  colorNeutralStroke4Selected: '#ebebeb',
  colorNeutralForeground5: '#616161',
  colorNeutralForeground5Hover: '#242424',
  colorNeutralForeground5Pressed: '#242424',
};

export const App = () => (
  <FluentProvider theme={capTheme} customStyleHooks_unstable={CAP_STYLE_HOOKS}>
    {/* the rest of your app */}
  </FluentProvider>
);`;

const bordersOnlySnippet = `import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { CAP_STYLE_HOOKS_BORDERS_ONLY } from '@fluentui-contrib/react-cap-theme';

// Borders-only needs just the CAP radius tokens — colors/spacing stay stock.
const roundedTheme = {
  ...webLightTheme,
  borderRadius2XLarge: '12px',
  borderRadius3XLarge: '16px',
  borderRadius4XLarge: '24px',
};

export const App = () => (
  <FluentProvider
    theme={roundedTheme}
    customStyleHooks_unstable={CAP_STYLE_HOOKS_BORDERS_ONLY}
  >
    {/* the rest of your app */}
  </FluentProvider>
);`;

const radiiSnippet = `import { CAP_BORDER_RADII } from '@fluentui-contrib/react-cap-theme';

// Every border radius the theme uses, in one place:
CAP_BORDER_RADII.xxLarge;   // capTokens.borderRadius2XLarge
CAP_BORDER_RADII.xxxxLarge; // capTokens.borderRadius4XLarge`;

/**
 * `@fluentui-contrib/react-cap-theme` provides Fluent UI v9 custom style hooks
 * that restyle components to the CAP design language. Install it, then pass the
 * exported hooks to a `FluentProvider`.
 */
export const Default = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>react-cap-theme</h1>
      <p className={styles.lede}>
        Fluent UI v9 custom style hooks that restyle components to the CAP design
        language. Drop them into a <code className={styles.code}>FluentProvider</code>{' '}
        — no forked components required.
      </p>

      <h2 className={styles.h2}>Installation</h2>
      <CodeBlock>{installSnippet}</CodeBlock>
      <p className={styles.p}>Peer dependencies:</p>
      <ul className={styles.list}>
        <li>
          <code className={styles.code}>@fluentui/react-components</code> {'>='}9.70.0
        </li>
        <li>
          <code className={styles.code}>react</code> / {' '}
          <code className={styles.code}>react-dom</code> {'>='}16.8.0
        </li>
      </ul>

      <h2 className={styles.h2}>Usage</h2>
      <p className={styles.p}>
        Wrap your app (or any subtree) in a{' '}
        <code className={styles.code}>FluentProvider</code> and pass{' '}
        <code className={styles.code}>CAP_STYLE_HOOKS</code> to{' '}
        <code className={styles.code}>customStyleHooks_unstable</code>. Every Fluent
        component rendered inside picks up the CAP styling automatically.
      </p>
      <CodeBlock>{usageSnippet}</CodeBlock>

      <h2 className={styles.h2}>Borders only</h2>
      <p className={styles.p}>
        Want CAP&apos;s rounded corners but otherwise stock Fluent styling? Use{' '}
        <code className={styles.code}>CAP_STYLE_HOOKS_BORDERS_ONLY</code> instead.
        It only adjusts the border radius of each component — colors, spacing, and
        typography stay at the Fluent defaults — so the only theme tokens you need
        are the three CAP radius tokens.
      </p>
      <CodeBlock>{bordersOnlySnippet}</CodeBlock>
      <p className={styles.p}>
        Every radius value the theme uses is exported as{' '}
        <code className={styles.code}>CAP_BORDER_RADII</code> so the full set is
        visible in one place:
      </p>
      <CodeBlock>{radiiSnippet}</CodeBlock>
      <p className={styles.p}>
        See the <strong>BordersOnly</strong> story for a per-component, side-by-side
        comparison against default Fluent v9.
      </p>
    </div>
  );
};

const meta = {
  title: 'Packages/react-cap-theme/Overview',
  parameters: {
    // Custom docs page: just the rendered guide, no empty Controls/args table.
    docs: {
      page: () => (
        <>
          <Title />
          <Primary />
        </>
      ),
    },
  },
} satisfies Meta;

export default meta;
