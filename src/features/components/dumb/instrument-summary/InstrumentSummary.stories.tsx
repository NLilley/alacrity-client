import type { Meta, StoryObj } from '@storybook/react';

import InstrumentSummary from './InstrumentSummary';

const meta = {
  title: 'Trade/InstrumentSummary',
  component: InstrumentSummary,
  tags: ['trading', 'autodocs'],
  argTypes: {},
  decorators: [
    Story => <div style={{ padding: 120 }}><Story /></div>
  ]
} satisfies Meta<typeof InstrumentSummary>

export default meta;
type Story = StoryObj<typeof meta>;

export const OrdinaryInstrumentSummary: Story = {
  args: {
    name: 'Microsoft',
    ticker: 'MSFT',
    industry: 'Tech',
    price: 777.77,
    prevClose: 888.88,
    companyIcon: '/icons/companies/grey/microsoft-windows.svg',
    description: `Microsoft Corporation is an American multinational technology corporation headquartered in Redmond, Washington. Microsoft's best-known software products are the Windows line of operating systems, the Microsoft Office suite, and the Internet Explorer and Edge web browsers. Its flagship hardware products are the Xbox video game consoles and the Microsoft Surface lineup of touchscreen personal computers. Microsoft ranked No. 14 in the 2022 Fortune 500 rankings of the largest United States corporations by total revenue;[2] it was the world's largest software maker by revenue as of 2022. It is considered as one of the Big Five American information technology companies, alongside Alphabet (parent company of Google), Amazon, Apple, and Meta (formerly Facebook).`,
    instrumentId: 123,
    displayChart: false,

  }
}
