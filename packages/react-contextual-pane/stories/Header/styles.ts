import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  pane: {
    width: '320px',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    height: '200px',
  },
  paneFluid: {
    width: '100%',
    resize: 'horizontal',
    overflow: 'auto',
  },
});
