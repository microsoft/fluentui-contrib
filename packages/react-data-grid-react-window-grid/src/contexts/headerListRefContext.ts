import * as React from 'react';
import { VariableSizeList } from 'react-window';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const headerListRefContext: React.Context<
  React.RefObject<VariableSizeList<any>>
> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.createContext<React.RefObject<VariableSizeList<any>>>({
    current: null,
  });

export const headerListRefContextDefaultValue: React.RefObject<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  VariableSizeList<any>
> = { current: null };

export const useHeaderListRefContext = () =>
  React.useContext(headerListRefContext) ?? headerListRefContextDefaultValue;

export const HeaderListRefContextProvider = headerListRefContext.Provider;
