/** @jsxRuntime classic */
/** @jsx createElement */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';
import type { KeytipsState, KeytipsSlots } from './Keytips.types';
import { Portal, makeStyles } from '@fluentui/react-components';
/**
 * Render the final JSX of Keytips
 */
const useStyles = makeStyles({
  portal: {
    // Ensure the keytips are above everything else
    zIndex: 1000001,
  },
});

export const renderKeytips_unstable = (state: KeytipsState) => {
  assertSlots<KeytipsSlots>(state);
  const classes = useStyles();

  return (
    <Portal
      mountNode={{
        className: classes.portal,
        ...state.mountNode,
      }}
    >
      <span
        id={KTP_ROOT_ID}
        style={VISUALLY_HIDDEN_STYLES}
        data-start-shortcut={state.content}
      >
        {state.content}
      </span>
      {state.keytips}
      <state.root>{state.visibleKeytips}</state.root>
    </Portal>
  );
};
