import * as React from 'react';
import {
  useDataGridHeader_unstable as useBaseState,
  DataGridHeaderProps,
  DataGridHeaderState,
  useMergedRefs,
} from '@fluentui/react-components';
import { useBodyRefContext } from '../../contexts/bodyRefContext';
import { useHeaderRefContext } from '../../contexts/headerRefContext';

/**
 * Create the state required to render DataGridHeader.
 *
 * The returned state can be modified with hooks such as useDataGridHeaderStyles_unstable,
 * before being passed to renderDataGridHeader_unstable.
 *
 * @param props - props from this instance of DataGridHeader
 * @param ref - reference to root HTMLElement of DataGridHeader
 */
export const useDataGridHeader_unstable = (
  props: DataGridHeaderProps,
  ref: React.Ref<HTMLElement>
): DataGridHeaderState => {
  const bodyRef = useBodyRefContext();
  const headerRef = useHeaderRefContext();

  const onScroll = React.useCallback(() => {
    if (bodyRef.current && headerRef.current) {
      bodyRef.current.scroll({
        left: headerRef.current.scrollLeft,
        behavior: 'instant',
      });
    }
  }, []);

  const setupScrollRef = React.useCallback((element: HTMLElement | null) => {
    headerRef.current?.removeEventListener('scroll', onScroll);

    headerRef.current = element;
    if (element) {
      element.addEventListener('scroll', onScroll);
    }
  }, []);

  const baseState = useBaseState(props, ref);

  baseState.root.ref = useMergedRefs(baseState.root.ref, setupScrollRef);

  return baseState;
};
