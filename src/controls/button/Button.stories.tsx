import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta = {
  title: 'Controls/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' }
  },
  decorators: [
    Story => <div style={{
      padding: 120,
    }}
    ><Story /></div>
  ]
} satisfies Meta<typeof Button>

export default meta;
type Story = StoryObj<typeof meta>;

export const BoringButton: Story = {
  args: {
    text: 'Default Button',
  }
}

export const SubordinateButton: Story = {
  args: {
    text: 'Subordinate',
    size: 'medium',
    kind: 'sub'
  }
}

export const DisabledButton: Story = {
  args: {
    text: 'Disabled',
    size: 'small',
    kind: 'main',
    disabled: true
  }
};