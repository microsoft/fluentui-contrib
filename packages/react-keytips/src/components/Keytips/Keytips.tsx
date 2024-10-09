import * as React from 'react';
import { useKeytips_unstable } from './useKeytips';
import { renderKeytips_unstable } from './renderKeytips';
import type { KeytipsProps } from './Keytips.types';

/**
 * Keytips component - handles the logic for
 * entering and exiting keytips mode, showing all Keytips.
 */
export const Keytips: React.FC<KeytipsProps> = (props) => {
  const state = useKeytips_unstable(props);
  return renderKeytips_unstable(state);
};

Keytips.displayName = 'Keytips';
