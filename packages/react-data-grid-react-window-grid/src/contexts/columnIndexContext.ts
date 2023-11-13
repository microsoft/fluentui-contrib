import * as React from 'react';

const columnIndexContext = React.createContext<number | undefined>(undefined);

export const columnIndexContextDefaultValue: number | undefined = undefined;

export const ariaColumnIndexStart = 1;
export const useColumnIndexContext = () =>
  React.useContext(columnIndexContext) ?? columnIndexContextDefaultValue;

export const ColumnIndexContextProvider = columnIndexContext.Provider;
