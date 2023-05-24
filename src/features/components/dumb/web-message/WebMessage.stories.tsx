import type { Meta, StoryObj } from '@storybook/react';

import WebMessage from './WebMessage';
import { WebMessageKind } from '../../../../app/enums/webMessageKind';

const meta = {
  title: 'Support/WebMessage',
  component: WebMessage,
  tags: ['messages', 'autodocs'],
  argTypes: {},
  decorators: [
    Story => <div style={{ padding: 60 }}><Story /></div>
  ]
} satisfies Meta<typeof WebMessage>

export default meta;
type Story = StoryObj<typeof meta>;

export const MessageBasicCollapsed: Story = {
  args: {
    date: new Date(),
    from: 'Mini Lossess',
    title: 'Hi There!',
    message: "Just saying hi, Max! How's it going? -Mini",
    startCollapsed: true
  }
}

export const MessageBasicExpanded: Story = {
  args: {
    date: new Date(),
    from: 'Mini Lossess',
    title: 'Hi There!',
    message: "Just saying hi, Max! How's it going? -Mini",
    startCollapsed: false
  }
}

export const MediumMessageExpanded: Story = {
  args: {
    date: new Date(),
    from: 'Mini Lossess',
    title: 'You wouldn\' believe it...',
    message: `Hey Mini,

You would believe the week I've been having!
    
Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really`,
    startCollapsed: true
  }
}

export const BigMessageCollapsed: Story = {
  args: {
    date: new Date(),
    from: 'Max Profits',
    title: 'You wouldn\' believe it...',
    message: `Hey Mini,

You would believe the week I've been having!

Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market.

Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market.

Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market.`,
    startCollapsed: true
  }
}