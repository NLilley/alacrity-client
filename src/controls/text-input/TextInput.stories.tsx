import type { Meta, StoryObj } from '@storybook/react';

import TextInput from './TextInput';

const meta = {
  title: 'Controls/TextInput',
  component: TextInput,
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
} satisfies Meta<typeof TextInput>

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
    label: 'This is a TextInput',
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

export const Password: Story = {
  args: {
    label: 'Password 🤫',
    value: 'Boy, this is a long password!',
    isPassword: true,
  }
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Text',
    disabled: true
  }
}