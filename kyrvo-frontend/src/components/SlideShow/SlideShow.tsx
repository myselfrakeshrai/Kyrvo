import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box } from '@mui/material';
import './slideShowStyle.css';

interface SlideShowProps {
  slideShow: number;
  arrows?: boolean;
  speed?: number;
  infinite?: boolean;
  fade?: boolean;
  dots?: boolean;
  autoplay?: boolean;
  autoplaySpeed?: number;
  slidesToScroll?: number;
  swipe?: boolean;
  children?: React.ReactNode;
  adaptiveHeight?: boolean;
  contentWidth?: string;
  beforeChange?: (_oldIndex: number, newIndex: number) => void;
  afterChange?: (currentIndex: number) => void;
}

const SlideShow: React.FC<SlideShowProps> = ({
  slideShow,
  arrows,
  infinite,
  fade,
  speed,
  dots,
  autoplay,
  autoplaySpeed,
  slidesToScroll,
  swipe,
  children,
  adaptiveHeight,
  beforeChange,
  afterChange,
}) => {
  const mockData = [
    { id: 1, imageUrl: 'https://placehold.co/900x400' },
    { id: 2, imageUrl: 'https://placehold.co/900x400' },
    { id: 3, imageUrl: 'https://placehold.co/900x400' },
    { id: 4, imageUrl: 'https://placehold.co/900x400' },
    { id: 5, imageUrl: 'https://placehold.co/900x400' },
    { id: 6, imageUrl: 'https://placehold.co/900x400' },
  ];

  const slickSettings = {
    dots: dots,
    arrows: arrows,
    speed: speed,
    infinite: infinite,
    fade: fade,
    slidesToShow: slideShow,
    slidesToScroll: slidesToScroll,
    autoplay: autoplay,
    autoplaySpeed: autoplaySpeed,
    swipe: swipe,
    adaptiveHeight: adaptiveHeight,
    beforeChange: beforeChange,
    afterChange: afterChange,
  };

  return (
    <Slider {...slickSettings}>
      {children
        ? children
        : mockData.map((slide) => (
            <Box
              key={slide.id}
              sx={{
                backgroundImage: `url(${slide.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ))}
    </Slider>
  );
};

export default SlideShow;
