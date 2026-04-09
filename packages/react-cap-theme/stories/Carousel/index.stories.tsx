import * as React from 'react';
import type { Meta } from '@storybook/react';
import {
  Carousel,
  CarouselCard,
  CarouselSlider,
  CarouselViewport,
} from '@fluentui/react-carousel';

const meta = {
  title: 'Packages/react-cap-theme/Carousel',
  component: Carousel,
} satisfies Meta<typeof Carousel>;

export default meta;

export { Default } from './Default.stories';
