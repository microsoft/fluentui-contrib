import {
  DistributiveOmit,
  ExtractSlotProps,
  SlotShorthandValue,
  UnknownSlotProps,
} from '@fluentui/react-utilities';

export type ComponentProps<
  S extends UnknownSlotProps | SlotShorthandValue | null | undefined
> = PropsWithoutRef<ExtractSlotProps<S>>;

type PropsWithoutRef<P> = 'ref' extends keyof P
  ? DistributiveOmit<P, 'ref'>
  : P;
