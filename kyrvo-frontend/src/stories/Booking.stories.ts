import type { Meta, StoryObj } from '@storybook/react';
import Booking from '../components/Booking/Booking';

const meta = {
  title: 'Features/Booking',
  component: Booking,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    PickupLocation: { control: 'text' },
    PickupDate: { control: 'text' },
    PickupTime: { control: 'text' },
  },
} satisfies Meta<typeof Booking>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
