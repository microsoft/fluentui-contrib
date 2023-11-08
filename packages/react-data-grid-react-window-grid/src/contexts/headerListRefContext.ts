import * as React from 'react';

const headerListRefContext: React.Context<React.MutableRefObject<HTMLDivElement | null>> =
  React.createContext<React.MutableRefObject<HTMLDivElement | null>>({ current: null});


export const headerListRefContextDefaultValue: React.MutableRefObject<HTMLDivElement | null> = { current: null };

export const useHeaderListRefContext = () =>
  React.useContext(headerListRefContext) ?? headerListRefContextDefaultValue;

export const HeaderListRefContextProvider = headerListRefContext.Provider;
