import { Meta, StoryObj } from '@storybook/react'

import { FileCard } from './FileCard'

export default {
  title: 'Form/FileCard',
  component: FileCard,
  argTypes: {
    fileExtension: {
      control: 'select',
      options: ['jpg', 'png', 'gif', 'pdf'],
    },
    size: { control: 'number' },
  },
  args: {
    fileExtension: 'jpg',
    size: 1024,
  },
} as Meta

export const Default: StoryObj = {
  render: (props: any) => {
    const file = {
      name: 'example.' + props.fileExtension,
      type: 'image/' + props.fileExtension,
      size: props.size,
    }

    return <FileCard file={file} {...props} />
  },
}
