import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import CustomTimePicker from 'src/components/CustomTimePicker';

const meta = {
  title: 'Input/Time Picker',
  component: CustomTimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
  },
  args: {
    label: 'Time',
    onChange: fn(),
  },
} satisfies Meta<typeof CustomTimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    defaultValue: '11-15',
    label: 'Button',
  },
};
