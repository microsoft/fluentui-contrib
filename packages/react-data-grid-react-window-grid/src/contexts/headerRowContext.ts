import * as React from 'react';
import { DataGridHeaderRowState } from '../components/DataGridHeaderRow';

const headerRowContext: React.Context<HeaderRowContextValue> = React.createContext<HeaderRowContextValue | undefined>(undefined) as React.Context<HeaderRowContextValue>;

export type HeaderRowContextValue = Pick<DataGridHeaderRowState, 'listRef'>;

export const headerRowContextDefaultValue: HeaderRowContextValue = {
  listRef: { current: null },
};

export const useHeaderRowContext = () =>
  React.useContext(headerRowContext) ?? headerRowContextDefaultValue;

export const RowHeaderContextProvider = headerRowContext.Provider;
