import type { DataGridState as DataGridStateBase } from '@fluentui/react-components';

/**
 * State used in rendering DataGrid
 */
export type DataGridState = DataGridStateBase & {
  headerRef: React.RefObject<HTMLDivElement | null>;
  bodyRef: React.RefObject<HTMLDivElement | null>;
};
