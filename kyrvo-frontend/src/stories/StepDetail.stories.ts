import type { Meta, StoryObj } from '@storybook/react';
import StepDetail from 'src/components/StepDetail';

const meta = {
  title: 'Input/Step Detail',
  component: StepDetail,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
   title: { control: 'text' },
    desc: { control: 'text' },
    icon: {control: 'any' },
    iconPlacement: { control: 'text' },
  },
  args: {
   
  },
} satisfies Meta<typeof StepDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {
  args: {
    title:"Best Price Guaranteed",
   desc: 'Sample Description',
    iconPlacement: 'TOP',
    icon: 'LocalOffer',
  },
  
};
export const Side: Story = {
  args: {
    title:"Best Price Guaranteed",
   desc: 'Sample Description',
    iconPlacement: 'SIDE',
    icon: 'SupportAgent',
  },
  
};