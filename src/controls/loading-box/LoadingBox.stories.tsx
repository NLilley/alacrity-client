import type { Meta, StoryObj } from '@storybook/react';
import LoadingBox from './LoadingBox';

const meta = {
  title: 'Controls/LoadingBox',
  component: LoadingBox,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
  ]
} satisfies Meta<typeof LoadingBox>

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultLoadingBox: Story = {
  args: {}
};

export const SizedLoadingBox: Story = {
  args: {
    width: 300,
    height: "50vh"
  }
};


export const BoringContent: Story = {
  args: {
    content: 'This is a loading box'
  }
};

export const InterestingContent: Story = {
  args: {
    content: <img src="https://media.giphy.com/media/jIhNUBuRD2SKA4TrrU/giphy-downsized-large.gif" style={{width: 500, height: 281}}/>
  }
}