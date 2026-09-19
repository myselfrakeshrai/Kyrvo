import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import CustomDatePicker from 'src/components/CustomDatePicker';

const meta = {
  title: 'Input/Date Picker',
  component: CustomDatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
  },
  args: {
    label: 'Date',
    onChange: fn(),
  },
} satisfies Meta<typeof CustomDatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    defaultValue: '2021-09-01',
    label: 'Button',
  },
};
