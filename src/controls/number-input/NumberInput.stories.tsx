import type { Meta, StoryObj } from '@storybook/react';

import NumberInput from './NumberInput';

const meta = {
  title: 'Controls/NumberInput',
  component: NumberInput,
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
} satisfies Meta<typeof NumberInput>

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
    label: 'This is a number input',
    value: '1'
  }
}

export const AnotherValue: Story = {
  args: {
    placeholder: 'Another Placeholder',
    label: 'Another Label',
    value: '1e5'
  }
}

export const WithoutPlaceholder: Story = {
  args: {
    label: 'Without Placeholder',
  }
}

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true
  }
}