import * as React from 'react';
import { useKeytips_unstable } from './useKeytips';
import { renderKeytips_unstable } from './renderKeytips';
import type { KeytipsProps } from './Keytips.types';

/**
 * Keytips component - TODO: add more docs
 */
export const Keytips: React.FC<KeytipsProps> = (props) => {
  const state = useKeytips_unstable(props);
  return renderKeytips_unstable(state);
};

Keytips.displayName = 'Keytips';
