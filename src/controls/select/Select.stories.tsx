import type { Meta, StoryObj } from '@storybook/react';

import Select from './Select';

const meta = {
  title: 'Controls/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    onSelect: { action: 'clicked' }
  },
  decorators: [
    Story => <Story />
  ]
} satisfies Meta<typeof Select>

export default meta;
type Story = StoryObj<typeof meta>;

export const NoValues: Story = {
  args: {
    label: '',
    values: [],
    placeholder: 'Select Something!',
  }
}

export const OneValue: Story = {
  args: {
    label: 'This is a select box',
    values: [
      { label: 'A', value: 'A' },
    ],
  }
}

export const OneValueAlreadySelected: Story = {
  args: {
    label: "Another Label",
    values: [
      { label: 'A', value: 'A' },
    ],
    value: 'A',
  }
}

export const SomeValues: Story = {
  args: {
    label: '',
    values: [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
      { label: 'D', value: 'D' },
      { label: 'E', value: 'E' },
      { label: 'F', value: 'F' },
    ]
  }
}

export const BasicPlaceholder: Story = {
  args: {
    label: "Select a Letter",
    placeholder: "Please select a letter",
    values: [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
      { label: 'D', value: 'D' },
      { label: 'E', value: 'E' },
      { label: 'F', value: 'F' },
    ]
  }
}

export const LongLabels: Story = {
  args: {
    label: "Select a Letter",
    placeholder: "Please select a letter",
    value: 'C',
    values: [
      { label: 'This is a long label', value: 'A' },
      { label: 'This is another long, long label!', value: 'B' },
      { label: 'Only the longest of labels will do here!', value: 'C' },
      { label: 'D', value: 'D' },
      { label: 'E', value: 'E' },
      { label: 'F', value: 'F' },
    ]
  }
}