import * as React from 'react';
import { VariableSizeList } from 'react-window';

const headerListRefContext: React.Context<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.RefObject<VariableSizeList<any> | null>
> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.createContext<React.RefObject<VariableSizeList<any> | null>>({
    current: null,
  });

export const headerListRefContextDefaultValue: React.RefObject<// eslint-disable-next-line @typescript-eslint/no-explicit-any
VariableSizeList<any> | null> = { current: null };

export const useHeaderListRefContext =
  (): React.RefObject<// eslint-disable-next-line @typescript-eslint/no-explicit-any
  VariableSizeList<any> | null> =>
    React.useContext(headerListRefContext) ?? headerListRefContextDefaultValue;

export const HeaderListRefContextProvider = headerListRefContext.Provider;
