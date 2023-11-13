import * as React from 'react';

const rowIndexContext = React.createContext<number | undefined>(undefined);

export const rowIndexContextDefaultValue: number | undefined = undefined;

export const useRowIndexContext = () =>
  React.useContext(rowIndexContext) ?? rowIndexContextDefaultValue;

export const RowIndexContextProvider = rowIndexContext.Provider;
