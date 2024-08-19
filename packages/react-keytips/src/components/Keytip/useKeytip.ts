import * as React from 'react';
import type { KeytipProps, KeytipState } from './Keytip.types';
import type { TooltipProps } from '@fluentui/react-tooltip';
import { sequencesToID } from '../../utilities';
import { useFluent } from '@fluentui/react-components';
import { slot } from '@fluentui/react-utilities';

/**
 * Create the state required to render Keytip.
 *
 * The returned state can be modified with hooks such as useKeytipStyles_unstable,
 * before being passed to renderKeytip_unstable.
 *
 * @param props - props from this instance of Keytip
 */

export const useKeytip_unstable = (props: KeytipProps): KeytipState => {
  const {
    positioning,
    visible = false,
    keySequences,
    appearance = 'inverted',
  } = props;

  const defaultPositioning: TooltipProps['positioning'] = React.useMemo(
    () => ({
      align: 'center',
      position: 'below',
      ...positioning,
    }),
    [positioning]
  );

  const { targetDocument } = useFluent();
  const id = sequencesToID(keySequences);
  const target = targetDocument?.querySelector(`[data-ktp-target="${id}"]`);

  const state: KeytipState = {
    components: {
      content: 'div',
    },
    visible,
    content: slot.always(props.content, {
      elementType: 'div',
    }),
    appearance,
    positioning: {
      target,
      ...defaultPositioning,
    },
  };

  return state;
};
