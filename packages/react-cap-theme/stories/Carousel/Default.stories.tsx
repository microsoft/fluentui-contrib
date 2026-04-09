import * as React from 'react';
import {
  Carousel,
  CarouselAutoplayButton,
  CarouselButton,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselSlider,
  CarouselViewport,
} from '@fluentui/react-carousel';
import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  carousel: {
    maxWidth: '500px',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '200px',
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightBold,
    color: tokens.colorNeutralForeground1,
  },
});

const SLIDES = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4'];

export const Default = () => {
  const styles = useStyles();
  return (
    <Carousel className={styles.carousel} groupSize={1} circular>
      <CarouselViewport>
        <CarouselSlider>
          {SLIDES.map((slide) => (
            <CarouselCard key={slide}>
              <div className={styles.card}>{slide}</div>
            </CarouselCard>
          ))}
        </CarouselSlider>
      </CarouselViewport>
      <CarouselNavContainer
        layout="inline"
        next={<CarouselButton navType="next" />}
        prev={<CarouselButton navType="prev" />}
      >
        <CarouselAutoplayButton />
        <CarouselNav>
          {(index) => <CarouselNavButton aria-label={`Go to slide ${index + 1}`} />}
        </CarouselNav>
      </CarouselNavContainer>
    </Carousel>
  );
};
