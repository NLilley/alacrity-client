import type { Meta, StoryObj } from '@storybook/react';

import WebMessageThread from './WebMessageThread';
import { WebMessageKind } from '../../../../app/enums/webMessageKind';

const meta = {
  title: 'Support/WebMessageThread',
  component: WebMessageThread,
  tags: ['messages', 'autodocs'],
  argTypes: {
  },
  decorators: [
    Story => <div style={{ padding: 120 }}><Story /></div>
  ]
} satisfies Meta<typeof WebMessageThread>

export default meta;
type Story = StoryObj<typeof meta>;

export const MessageThreadNoMessages: Story = {
  args: {
    thread: [
    ]
  }
}

export const MessageThreadBasic: Story = {
  args: {
    thread: [
      {
        createdDate: new Date().toISOString(),
        finalized: false,
        read: false,
        messageKind: WebMessageKind.General,
        incomming: false,
        rootMessageId: 1,
        webMessageId: 1,
        from: 'Mini Lossess',
        to: 'Max Profits',
        title: 'Hi There!',
        message: "Just saying hi, Max! How's it going? -Mini",
      }
    ]
  }
}


export const MessageThreadBasicWithActions: Story = {
  args: {
    onArchive: n => { },
    onReply: n => { },
    thread: [
      {
        createdDate: new Date().toISOString(),
        finalized: false,
        read: false,
        messageKind: WebMessageKind.General,
        incomming: false,
        rootMessageId: 1,
        webMessageId: 1,
        from: 'Mini Lossess',
        to: 'Max Profits',
        title: 'Hi There!',
        message: "Just saying hi, Max! How's it going? -Mini",
      }
    ]
  }
}

export const MessageThreadBasicWithLongThread: Story = {
  args: {
    onArchive: n => { },
    onReply: n => { },
    thread: [
      {
        createdDate: new Date().toISOString(),
        finalized: false,
        read: false,
        messageKind: WebMessageKind.General,
        incomming: false,
        rootMessageId: 1,
        webMessageId: 1,
        from: 'Mini Lossess',
        to: 'Max Profits',
        title: 'Hi There!',
        message: "Just saying hi, Max! How's it going? -Mini",
      },
      {
        createdDate: new Date().toISOString(),
        finalized: false,
        read: false,
        messageKind: WebMessageKind.General,
        incomming: false,
        rootMessageId: 1,
        webMessageId: 1,
        from: 'Mini Lossess',
        to: 'Max Profits',
        title: 'Hi There!',
        message: `Hey Mini,

You would believe the week I've been having!

Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market.

Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market.

Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market.`,
      },
      {
        createdDate: new Date().toISOString(),
        finalized: false,
        read: false,
        messageKind: WebMessageKind.General,
        incomming: false,
        rootMessageId: 1,
        webMessageId: 1,
        from: 'Mini Lossess',
        to: 'Max Profits',
        title: 'Hi There!',
        message: "Just saying hi, Max! How's it going? -Mini",
      },
      {
        createdDate: new Date().toISOString(),
        finalized: false,
        read: false,
        messageKind: WebMessageKind.General,
        incomming: false,
        rootMessageId: 1,
        webMessageId: 1,
        from: 'Mini Lossess',
        to: 'Max Profits',
        title: 'Hi There!',
        message: `Hey Mini,

You would believe the week I've been having!

Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market.

Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market.

Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market. Some really, really long winded complaint about the state of the market.`,
      }
    ]
  }
}

