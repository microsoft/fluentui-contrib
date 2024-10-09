import { useKeytip_unstable } from './useKeytip';
import { renderKeytip_unstable } from './renderKeytip';
import type { KeytipProps } from './Keytip.types';
import { useKeytipStyles_unstable } from './useKeytipStyles.styles';

/**
 * Keytip component. Responsible for rendering an individual keytip,
 * is not supposed to be used directly, but is used by the Keytips component.
 *
 */
export const Keytip = (props: KeytipProps) => {
  const state = useKeytip_unstable(props);
  useKeytipStyles_unstable(state);

  return renderKeytip_unstable(state);
};

Keytip.displayName = 'Keytip';
