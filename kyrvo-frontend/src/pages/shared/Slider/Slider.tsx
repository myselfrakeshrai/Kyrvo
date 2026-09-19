import React from 'react';
import { useAppStore } from 'src/stores';
import { Card, Grid } from '@mui/material';
import './slider.css';
import Jumbotron from 'src/components/Jumbotron/Jumbotron';
import SlideShow from 'src/components/SlideShow/SlideShow';
import { getImageUrl } from 'src/utils/helpers';
import KyContentSection from 'src/components/KyContentSection';

interface SliderProps {
  title: string;
  subtitle: string;
  description: string;
  contentImage: string;
  buttonLabel: string;
  buttonDisplay: string;
  subtitleColor: string;
  titleColor: string;
  image: string;
  align: string;
  buttonUrl: string;
  contentWidth: string;
  animation: string;
  descriptionColor: string;
  imagePosition: string;
}

const Slider: React.FC = () => {
  const { getCollectionValue } = useAppStore();

  const sliderData= getCollectionValue('LandingPage', 'slider');
  const [currentSlide, setCurrentSlide] = React.useState<number>(0);
  const [oldSlide, setOldSlide] = React.useState<number>(-1);

  return (
    <>
      {sliderData && (
        <SlideShow
          arrows={sliderData.arrows || true}
          autoplaySpeed={sliderData.duration || 1000}
          fade={sliderData.fade || false}
          slideShow={sliderData.pagesPerSlide || 1}
          infinite={sliderData.infinite || true}
          slidesToScroll={sliderData.slidesToScroll || 1}
          speed={sliderData.speed || 500}
          swipe={sliderData.swipe || true}
          autoplay={sliderData.autoplay || true}
          adaptiveHeight={sliderData.adaptiveHeight || false}
          afterChange={(currentIndex: number) => setCurrentSlide(currentIndex)}
          beforeChange={(oldIndex: number, newIndex: number) => {
            setOldSlide(oldIndex);
            setCurrentSlide(newIndex);
          }}
        >
          {sliderData?.slides?.map((slider: SliderProps, index: number) => (
            <React.Fragment key={`${slider.title}-${index}`}>
              <Card elevation={0} className="card">
                <Grid
                  className={`ky-slider ${
                    currentSlide === index ? slider.animation + '-in' : ''
                  } ${oldSlide === index ? slider.animation + '-out' : ''}`}
                  sx={{
                    justifyContent: slider.align,
                    backgroundImage: `url(${getImageUrl(slider.image)})`,
                    height: `${sliderData?.height}`,
                  }}
                >
                  <KyContentSection maxWidth='xl' my={10}>
                    <Jumbotron
                      title={slider.title}
                      contentAlignment={slider.align}
                      signImage={slider.contentImage?getImageUrl(slider.contentImage):undefined}
                      subtitle={slider.subtitle}
                      desc={slider.description}
                      titleColor={slider.titleColor}
                      subtitleColor={slider.subtitleColor}
                      buttonDisplay={slider.buttonDisplay}
                      labelButton={slider.buttonLabel}
                      buttonLink={slider.buttonUrl}
                      contentWidth={slider.contentWidth}
                      descriptionColor={slider.descriptionColor}
                      imagePosition={slider.imagePosition}
                    />
                  </KyContentSection>
                </Grid>
              </Card>
            </React.Fragment>
          ))}
        </SlideShow>
      )}
    </>
  );
};

export default Slider;
