import { FileCard } from '@components'

export default {
  title: 'Support/FileCard',
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
}

export const Default = {
  render: (props) => {
    const file = {
      name: 'example.' + props.fileExtension,
      type: 'image/' + props.fileExtension,
      size: props.size,
    }

    return <FileCard file={file} {...props} />
  },
}
