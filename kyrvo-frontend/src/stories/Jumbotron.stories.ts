import type { Meta, StoryObj } from '@storybook/react';
import Jumbotron from 'src/components/Jumbotron/Jumbotron';

const meta: Meta = {
  title: 'Page Components/Jumbotron',
  component: Jumbotron,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const JumbotronWithButton: Story = {
  args: {
    title: 'Lorem ipsum ',
    titleColor: '#0a7bff',
    subtitle: 'Lorem ipsum dolor sit amet',
    subtitleColor: '#4f8efa',
    desc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    labelButton: 'Button',
    buttonCustomBackground: '#0a7bff',
    buttonCustomColor: '#fff',
  },
};

export const JumbotronCenterWithButton: Story = {
  args: {
    title: 'Lorem ipsum ',
    titleColor: '#0a7bff',
    contentAlignment: 'center',
    subtitle: 'Lorem ipsum dolor sit amet',
    subtitleColor: '#4f8efa',
    desc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    labelButton: 'Button',
    buttonCustomBackground: '#0a7bff',
    buttonCustomColor: '#fff',
  },
};

export const JumbotronWithoutButton: Story = {
  args: {
    title: 'Lorem ipsum',
    titleColor: '#4f8efa',
    subtitle: 'Lorem ipsum dolor sit amet',
    subtitleColor: '#fff',
    subtitleBackground: '#0a7bff',
    desc: 'This is the descriptions',
    buttonDisplay: 'None',
  },
};
export const JumbotronCenterWithoutButton: Story = {
  args: {
    title: 'Lorem ipsum',
    titleColor: '#4f8efa',
    contentAlignment: 'center',
    subtitle: 'Lorem ipsum dolor sit amet',
    subtitleColor: '#fff',
    subtitleBackground: '#0a7bff',
    desc: 'This is the descriptions',
    buttonDisplay: 'None',
  },
};
