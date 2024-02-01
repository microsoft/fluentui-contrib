import * as React from 'react';
import { FixedSizeList } from 'react-window';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const headerListRefContext: React.Context<React.RefObject<FixedSizeList<any>>> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.createContext<React.RefObject<FixedSizeList<any>>>({ current: null });

export const headerListRefContextDefaultValue: React.RefObject<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FixedSizeList<any>
> = { current: null };

export const useHeaderListRefContext = () =>
  React.useContext(headerListRefContext) ?? headerListRefContextDefaultValue;

export const HeaderListRefContextProvider = headerListRefContext.Provider;
