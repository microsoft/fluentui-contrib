import * as React from 'react';
import { FixedSizeList } from 'react-window';

const headerListRefContext: React.Context<React.RefObject<FixedSizeList<any>>> =
  React.createContext<React.RefObject<FixedSizeList<any>>>({ current: null});


export const headerListRefContextDefaultValue: React.RefObject<FixedSizeList<any>> = { current: null };

export const useHeaderListRefContext = () =>
  React.useContext(headerListRefContext) ?? headerListRefContextDefaultValue;

export const HeaderListRefContextProvider = headerListRefContext.Provider;
