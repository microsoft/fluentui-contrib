import * as React from 'react';
import { useEventService } from './useEventService';
import { EVENTS } from '../constants';
import type { KeytipWithId } from '../components/Keytip';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

type ShortcutProps = Pick<KeytipWithId, 'onExecute' | 'dependentKeys'> & {
  shortcut: string;
};

export const useMenuShortcut = ({
  dependentKeys = [],
  onExecute,
  shortcut,
}: ShortcutProps) => {
  const uniqueId = React.useId();
  const { dispatch } = useEventService();

  const node = React.useMemo(
    () => ({
      uniqueId,
      isShortcut: true,
      keySequences: [shortcut],
      content: '',
      dependentKeys,
      onExecute,
    }),
    [dependentKeys, shortcut]
  );

  useIsomorphicLayoutEffect(() => {
    dispatch(EVENTS.SHORTCUT_ADDED, node);

    return () => {
      dispatch(EVENTS.SHORTCUT_REMOVED, node);
    };
  }, []);
};
