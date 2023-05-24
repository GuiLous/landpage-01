import Progress from './Progress'

export default {
  title: 'Common/Progress',
  component: Progress,
  argTypes: {
    initial: { control: 'number' },
    value: { control: 'number' },
    overflow: { control: 'boolean' },
    showLabel: { control: 'boolean' },
    labelSuffix: { control: 'text' },
    horizontalPadding: { control: 'number' },
    radius: { control: 'boolean' },
    labelSize: { control: 'number' },
    labelGap: { control: 'number' },
  },
  args: {
    initial: 30,
    value: 30,
    overflow: true,
    showLabel: true,
    labelSuffix: ' pts',
    horizontalPadding: 0,
    radius: false,
    labelSize: 14,
    labelGap: 5,
  },
}

export const Default = {
  render: (props) => <Progress {...props} />,
}
