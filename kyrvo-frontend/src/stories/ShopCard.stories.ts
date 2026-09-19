import type { Meta, StoryObj } from '@storybook/react';
import ShopCard from 'src/components/ShopCard';

const meta = {
  title: 'Page Components/Shop Card',
  component: ShopCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'node' },
    uri: { control: 'text' },
    title: { control: 'text' },
    desc: { control: 'text' },
  },
  args: {
    icon: 'Any',
    uri: '/shop',
    title: 'Shop Title',
    desc: 'Shop Description',
  },
} as Meta<typeof ShopCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    icon: 'Any',
    uri: '/shop',
    title: 'Shop Title',
    desc: 'Shop Description',
  },
};
