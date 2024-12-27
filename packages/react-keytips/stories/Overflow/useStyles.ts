import { tokens, makeStyles } from '@fluentui/react-components';

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    whiteSpace: 'nowrap',
    flexWrap: 'nowrap',
    overflow: 'hidden',
    minWidth: 0,
  },
  resizable: {
    minWidth: '200px',
    maxWidth: '800px',
    border: `2px solid ${tokens.colorBrandBackground}`,
    padding: '20px 10px 10px 10px',
    position: 'relative',
    resize: 'horizontal',
    '::after': {
      content: `'Resizable Area'`,
      position: 'absolute',
      padding: '1px 4px 1px',
      top: '-2px',
      left: '-2px',
      fontFamily: 'monospace',
      fontSize: '15px',
      fontWeight: 900,
      lineHeight: 1,
      letterSpacing: '1px',
      color: tokens.colorNeutralForegroundOnBrand,
      backgroundColor: tokens.colorBrandBackground,
    },
  },
});
