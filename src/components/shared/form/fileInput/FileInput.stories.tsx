import { Meta, StoryObj } from '@storybook/react'

import { FileInput } from './FileInput'

export default {
  title: 'Form/FileInput',
  component: FileInput,
} as Meta

export const Default: StoryObj = {
  render: (props: any) => {
    return <FileInput {...props} />
  },
}
