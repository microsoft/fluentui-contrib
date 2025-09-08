/** @jsxRuntime classic */
/** @jsx createElement */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from '@fluentui/react-jsx-runtime';
import type { KeytipsState, KeytipsSlots } from './Keytips.types';
import { Portal, makeStyles, assertSlots } from '@fluentui/react-components';
import { KTP_ROOT_ID, VISUALLY_HIDDEN_STYLES } from '../../constants';
/**
 * Render the final JSX of Keytips
 */
const useStyles = makeStyles({
  portal: {
    // Ensure the keytips are above everything else
    zIndex: 1000001,
  },
});

export const renderKeytips_unstable = (state: KeytipsState): JSX.Element => {
  assertSlots<KeytipsSlots>(state);
  const classes = useStyles();

  return (
    <div id="keytips-container" aria-hidden="true">
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
        {state.keytips.length > 0 && <state.root>{state.keytips}</state.root>}
      </Portal>
    </div>
  );
};
