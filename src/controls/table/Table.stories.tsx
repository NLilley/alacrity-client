import type { Meta, StoryObj } from '@storybook/react';

import Table from './Table';
import { LWCCandle, ChartUtil } from '../../utils/chartUtil';

const meta = {
  title: 'Controls/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
  ]
} satisfies Meta<typeof Table>

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyTable: Story = {
  args: {
    header: ['Ticker', 'Price', 'Change', ''],
    rows: []
  }
};

export const SmallTable: Story = {
  args: {
    header: ['Ticker', 'Price', 'Change', ''],
    rows: [
      ['TSLA', '123.45', '+30 3%', '⨉']
    ]
  }
};


export const BigTable: Story = {
  args: {
    header: ['Ticker', 'Price', 'Change', ''],
    rows: [
      ['TSLA', '123.45', '+30 3%', '⨉'],
      ['AAPL', '2222.22', '+3 31%', '⨉'],
      ['MSFT', '-32.455', '-1111 3%', '⨉'],
      ['XOM', '999999', '999999 9%', '⨉'],
      ['JPM', '565656', '+56 6%', '⨉']
    ]
  }
};