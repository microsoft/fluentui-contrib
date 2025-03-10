export const Trigger = {
  Left: 'left',
  Right: 'right',
} as const;

export type Trigger = (typeof Trigger)[keyof typeof Trigger];
