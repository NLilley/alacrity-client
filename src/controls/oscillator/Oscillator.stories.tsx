import type { Meta, StoryObj } from '@storybook/react';

import Oscillator from './Oscillator';

const meta = {
  title: 'Controls/Oscillator',
  component: Oscillator,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    Story => <div style={{
      padding: 120
    }}
    ><Story /></div>
  ]
} satisfies Meta<typeof Oscillator>

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyOscillator: Story = {
  args: {
    value: 0,
    text: 'Empty'
  }
}

export const FullOscillator: Story = {
  args: {
    value: 1,
    text: 'Full'
  }
}

export const HalfOscillator: Story = {
  args: {
    value: 0.5,
    text: 'Half'
  }
}

export const BuyOscillator: Story = {
  args: {
    value: 65,
    text: 'BUY',
    heading: "RSI",
    min: 0,
    max: 100
  }
}

export const SellOscillator: Story = {
  args: {
    value: 0.22,
    text: 'SELL',
    heading: "LOWLOW LOWLOWLOWLOWLOWLOW"
  }
}

export const StrangeMinMaxOscillator: Story = {
  args: {
    value: 1750,
    min: 1000,
    max: 2000,
    text: 'STRANGE',
    heading: "I've a long range"
  }
}
