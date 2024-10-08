import * as React from 'react';
import type { KeytipProps, KeytipWithId } from '../Keytip';
import { isTargetVisible } from '../../utilities';
import { ACTIONS } from '../../constants';
import { omit } from '../../utilities';

type Keytips = Record<string, KeytipProps & { visibleInternal?: boolean }>;

type KeytipsState = {
  inKeytipMode: boolean;
  keytips: Keytips;
  currentSequence: string;
};

type KeytipsAction =
  | { type: 'ENTER_KEYTIP_MODE' }
  | { type: 'EXIT_KEYTIP_MODE' }
  | { type: 'ADD_KEYTIP'; keytip: KeytipWithId }
  | { type: 'UPDATE_KEYTIP'; keytip: KeytipWithId }
  | { type: 'REMOVE_KEYTIP'; id: string }
  | { type: 'SET_VISIBLE_KEYTIPS'; ids: string[]; targetDocument?: Document }
  | { type: 'SET_SEQUENCE'; value: string };

const stateReducer: React.Reducer<KeytipsState, KeytipsAction> = (
  state,
  action
) => {
  switch (action.type) {
    case ACTIONS.ENTER_KEYTIP_MODE: {
      return { ...state, inKeytipMode: true };
    }
    case ACTIONS.EXIT_KEYTIP_MODE: {
      return { ...state, inKeytipMode: false, currentSequence: '' };
    }
    case ACTIONS.ADD_KEYTIP: {
      return {
        ...state,
        keytips: {
          ...state.keytips,
          [action.keytip.uniqueId]: action.keytip,
        },
      };
    }
    case ACTIONS.REMOVE_KEYTIP: {
      return {
        ...state,
        keytips: omit(state.keytips, [action.id]),
      };
    }
    case ACTIONS.UPDATE_KEYTIP: {
      return {
        ...state,
        keytips: {
          ...state.keytips,
          [action.keytip.uniqueId]: {
            ...state.keytips[action.keytip.uniqueId],
            ...action.keytip,
          },
        },
      };
    }
    case ACTIONS.SET_VISIBLE_KEYTIPS: {
      return {
        ...state,
        keytips: Object.keys(state.keytips).reduce((acc, key) => {
          const keytip = state.keytips[key];
          const isVisibleInDocument = isTargetVisible(
            keytip.positioning?.target,
            action.targetDocument?.defaultView
          );

          acc[key] = {
            ...state.keytips[key],
            visibleInternal: action.ids.includes(key) && isVisibleInDocument,
          };
          return acc;
        }, {} as Keytips),
      };
    }
    case ACTIONS.SET_SEQUENCE: {
      return { ...state, currentSequence: action.value };
    }
    default:
      return state;
  }
};

export function useKeytipsState(): [
  KeytipsState,
  React.Dispatch<KeytipsAction>
] {
  const [state, dispatch] = React.useReducer(stateReducer, {
    inKeytipMode: false,
    keytips: {},
    currentSequence: '',
  });

  return [state, dispatch];
}
