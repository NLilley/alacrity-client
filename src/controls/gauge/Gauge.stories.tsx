import type { Meta, StoryObj } from '@storybook/react';

import Gauge from './Gauge';

const meta = {
  title: 'Controls/Gauge',
  component: Gauge,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    Story => <div style={{
      padding: 120
    }}
    ><Story /></div>
  ]
} satisfies Meta<typeof Gauge>

export default meta;
type Story = StoryObj<typeof meta>;

const [width, height] = [200, 200];
const stops = [
  [0xFF, 0X0E, 0X0E],
  [0xEB, 0XFF, 0X03],
  [0x05, 0xFF, 0x00],
];

export const EmptyGauge: Story = {
  args: {
    stops,
    width,
    height,
    value: 0,
  }
}

export const FullGauge: Story = {
  args: {
    stops,
    width,
    height,
    value: 1,
  }
}

export const HalfGauge: Story = {
  args: {
    stops,
    width,
    height,
    value: 0.5,
  }
}

export const BuyGauge: Story = {
  args: {
    stops,
    width,
    height,
    value: 65,
    min: 0,
    max: 100
  }
}

export const SellGauge: Story = {
  args: {
    stops: [[0x00, 0x00, 0x00], [0xff, 0xff, 0xff]],
    width,
    height,
    value: 0.22,
  }
}

export const StrangeMinMaxGauge: Story = {
  args: {
    stops: [[0xff, 0xaa, 0xaa]],
    width,
    height,
    value: 1750,
    min: 1000,
    max: 2000,
  }
}
