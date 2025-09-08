import * as React from 'react';
import { VariableSizeGrid } from 'react-window';

const bodyRefContext: React.Context<
  React.MutableRefObject<VariableSizeGrid | null>
> = React.createContext<React.MutableRefObject<VariableSizeGrid | null>>({
  current: null,
});

export const bodyRefContextDefaultValue: React.MutableRefObject<VariableSizeGrid | null> =
  { current: null };

export const useBodyRefContext =
  (): React.MutableRefObject<VariableSizeGrid | null> =>
    React.useContext(bodyRefContext) ?? bodyRefContextDefaultValue;

export const BodyRefContextProvider = bodyRefContext.Provider;
