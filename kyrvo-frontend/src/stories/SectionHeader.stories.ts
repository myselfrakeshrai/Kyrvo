import type { StoryObj } from '@storybook/react';
import SectionHeader from 'src/components/SectionHeader/SectionHeader';

const meta = {
  title: 'Page Components/Section Header',
  component: SectionHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    fontWeight: { control: 'boolean' },
    alignment: { control: 'text' },
  },
  args: {
    title: ' Title',
    subtitle: '  Subtitle',
    fontWeight: true,
    alignment: 'Left',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'Message from the Chief',
    subtitle: 'This is a test message from chief',
    fontWeight: true,
  },
};

export const Center: Story = {
  args: {
    title: 'Message from the Chairman',
    subtitle: 'This is a test message from Chairman',
    fontWeight: false,
    alignment: 'center',
  },
};

export const TextRight: Story = {
  args: {
    title: 'Message from the Chairman',
    subtitle: 'This is a test message from Chairman',
    fontWeight: false,
    alignment: 'right',
  },
};
