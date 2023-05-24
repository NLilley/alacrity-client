import type { Meta, StoryObj } from '@storybook/react';

import Ticker from './Ticker';

const meta = {
  title: 'Trade/Ticker',
  component: Ticker,
  tags: ['trading', 'autodocs'],
  argTypes: {
    onClick: { action: 'clicked' }
  },
  decorators: [
    Story => <div style={{ padding: 120 }}><Story /></div>
  ]
} satisfies Meta<typeof Ticker>

export default meta;
type Story = StoryObj<typeof meta>;

export const WinnerTicker: Story = {
  args: {
    ticker: 'META',
    price: 123.45,
    prevClose: 120.88,
    icon: '/icons/companies/grey/meta.svg',
  }
} as any;

export const LoserTicker: Story = {
  args: {
    ticker: 'APPL',
    price: 1011,
    prevClose: 1200,
    icon: '/icons/companies/grey/apple.svg'
  }
} as any;

export const MissingLastPrice: Story = {
  args: {
    ticker: 'V',
    price: 333.67,
    prevClose: 0,
    icon: '/icons/companies/grey/visa.svg'
  }
} as any;