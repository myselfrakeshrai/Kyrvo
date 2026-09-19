import type { Meta, StoryObj } from '@storybook/react';
import SlideShow from 'src/components/SlideShow/SlideShow';

const meta: Meta = {
    title: 'Page Components/SlideShow',
    component: SlideShow,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Slideshow: Story = {
    args: {
        slideShow: 1,
        arrows: true,
        speed: 5000,
        dots: true,
        fade: false,
        slidesToScroll: 1,
        centerMode: false,
        autoplay: true,
        autoplaySpeed: 500,
        swipe: true,
    },
};
export const MultiSlideshow: Story = {
    args: {
        slideShow: 2,
        arrows: false,
        speed: 5000,
        dots: true,        
        fade: false,
        slidesToScroll: 1,
        autoplay: true,
        swipe: true,
    },
};
export const FadeSlideShow: Story = {
    args: {
        slideShow: 1,
        arrows: true,
        dots: true,
        fade: true,
        infinite: true,
        speed: 5000,
        autoplay: true,
    },
};

