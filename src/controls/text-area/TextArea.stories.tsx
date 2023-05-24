import type { Meta, StoryObj } from '@storybook/react';

import TextArea from './TextArea';

const meta = {
  title: 'Controls/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' }
  },
  decorators: [
    Story => <div style={{
      padding: 120,
      background: 'linear-gradient(0deg, #181818 0%, #444 100%)'
    }}
    ><Story /></div>
  ]
} satisfies Meta<typeof TextArea>

export default meta;
type Story = StoryObj<typeof meta>;

export const NoValues: Story = {
  args: {
    placeholder: 'A Placeholder',
    label: 'No Value Input',
  }
}

export const OneValue: Story = {
  args: {
    placeholder: 'One Placeholder',
    label: 'This is a TextArea',
    value: 'Some text for the input'
  }
}

export const AnotherValue: Story = {
  args: {
    placeholder: 'Another Placeholder',
    label: 'Another Label',
    value: 'Some more text for testing!'
  }
}

export const WithoutPlaceholder: Story = {
  args: {
    label: 'Without Placeholder',
  }
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Text',
    disabled: true
  }
}

export const DisabledWithText: Story = {
  args: {
    label: 'Disabled Text',
    value: 'Some Disabled Text',
    disabled: true
  }
}