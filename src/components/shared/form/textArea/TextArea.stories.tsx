import { Meta, StoryObj } from '@storybook/react'

import { TextArea } from './TextArea'

export default {
  title: 'Form/TextArea',
  component: TextArea,
  argTypes: {
    error: { control: 'boolean' },
  },
  args: {
    error: false,
  },
} as Meta

export const Default: StoryObj = {
  render: (props: any) => {
    return <TextArea {...props} />
  },
}
