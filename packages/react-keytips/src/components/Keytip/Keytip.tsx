import { useKeytip_unstable } from './useKeytip';
import { renderKeytip_unstable } from './renderKeytip';
import type { KeytipProps } from './Keytip.types';

/**
 * Keytip component - TODO: add more docs
 */
export const Keytip = (props: KeytipProps) => {
  const state = useKeytip_unstable(props);

  /**
   * @see https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/rfcs/react-components/convergence/custom-styling.md
   *
   * TODO: 💡 once package will become stable (PR which will be part of promoting PREVIEW package to STABLE),
   *      - uncomment this line
   *      - update types {@link file://./../../../../../../../packages/react-components/react-shared-contexts/library/src/CustomStyleHooksContext/CustomStyleHooksContext.ts#CustomStyleHooksContextValue}
   *      - verify that custom global style override works for your component
   */
  // useCustomStyleHook_unstable('useKeytipStyles_unstable')(state);

  return renderKeytip_unstable(state);
};

Keytip.displayName = 'Keytip';
