import * as React from 'react';
import type { KeytipProps, KeytipState } from './Keytip.types';
import {
  resolvePositioningShorthand,
  usePositioning,
} from '@fluentui/react-positioning';
import {
  slot,
  useId,
  useIsSSR,
  useMergedRefs,
  useControllableState,
} from '@fluentui/react-utilities';
import { KEYTIP_BORDER_RADIUS, KTP_ROOT_ID } from '../../constants';
import { useFluent } from '@fluentui/react-components';
import { sequencesToID } from '../../utilities/sequencesToID';

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
    positioning = { align: 'center', position: 'below' },
    content,
    keySequences,
    visible,
  } = props;

  const { targetDocument } = useFluent();

  const [isKeytipVisible, setIsVisible] = useControllableState({
    state: visible,
    initialState: false,
  });

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const isServerSideRender = useIsSSR();

  const state: KeytipState = {
    components: {
      content: 'div',
    },
    positioning,
    shouldRenderTooltip: isKeytipVisible,
    visible: isKeytipVisible,
    content: slot.always(content, {
      defaultProps: {
        role: 'tooltip',
      },
      elementType: 'div',
    }),
  };

  const id = sequencesToID(keySequences);
  state.content.id = useId('keytip-', `keytip-${id}`);

  const positioningOptions = {
    enabled: state.visible,
    arrowPadding: 2 * KEYTIP_BORDER_RADIUS,
    position: 'below' as const,
    align: 'center' as const,
    target: props.positioning?.target,
    offset: 4,
    ...resolvePositioningShorthand(state.positioning),
  };

  const {
    containerRef,
  }: {
    containerRef: React.MutableRefObject<HTMLDivElement>;
  } = usePositioning(positioningOptions);

  state.content.ref = useMergedRefs(state.content.ref, containerRef);

  const target = props.positioning?.target as HTMLElement;

  if (target && targetDocument) {
    target.setAttribute('aria-describedby', `${KTP_ROOT_ID} ${id}`);
    const root = targetDocument.getElementById(KTP_ROOT_ID);
    if (root) {
      const startSequence = root.getAttribute('data-start-shortcut');
      target.setAttribute(
        'aria-keyshortcuts',
        `${[startSequence, ...keySequences].join('+')}`
      );
    }
    state.shouldRenderTooltip = true;
  }

  if (isServerSideRender) {
    state.shouldRenderTooltip = false;
  }

  return state;
};
