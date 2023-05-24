import type { Meta, StoryObj } from '@storybook/react';

import SearchResult from './SearchResult';

const meta = {
  title: 'Trade/SearchResult',
  component: SearchResult,
  tags: ['search', 'autodocs'],
  argTypes: {},
  decorators: [
    Story => <div style={{ padding: 120 }}><Story /></div>
  ]
} satisfies Meta<typeof SearchResult>

export default meta;
type Story = StoryObj<typeof meta>;

export const MetaSearchResult: Story = {
  args: {
    name: 'Facebook is Meta',
    ticker: 'META2',
    industry: 'Big Tech j',
    price: 123.45,
    prevClose: 120.88,
    icon: '/icons/companies/grey/meta.svg'
  }
}

export const McDonaldsSearchResult: Story = {
  args: {
    name: 'McDonalds',
    ticker: 'MAC',
    price: 1011,
    prevClose: 1200,
    icon: '/icons/companies/grey/mcdonalds.svg',
    industry: 'Consumer Discretionary',
    isActive: true
  }
}

export const MissingIconAndPrice: Story = {
  args: {
    name: 'Visa',
    ticker: 'V',
    price: 333.67,
    industry: 'Financials',
    prevClose: 0,
  }
}