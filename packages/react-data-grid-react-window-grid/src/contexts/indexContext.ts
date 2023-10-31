import * as React from 'react';

const indexContext = React.createContext<IndexContextValue | undefined>(
  undefined
);

export type IndexContextValue = {
  /**
   * The index of each row
   */
  rowIndex: number | undefined;
  /**
   * The index of each column
   */
  columnIndex: number | undefined;
};

export const tableIndexContextDefaultValue: IndexContextValue = {
  rowIndex: undefined,
  columnIndex: undefined,
};

export const ariaColumnIndexStart = 1;
export const useTableIndexContext = () =>
  React.useContext(indexContext) ?? tableIndexContextDefaultValue;

export const TableIndexContextProvider = indexContext.Provider;
