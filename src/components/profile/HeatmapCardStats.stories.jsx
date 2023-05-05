import HeatmapCardStats from './HeatmapCardStats'

export default {
  title: 'Profile/HeatmapCardStats',
  component: HeatmapCardStats,
  argTypes: {
    head_shots: { control: 'number' },
    chest_shots: { control: 'number' },
    other_shots: { control: 'number' },
  },
  args: {
    head_shots: 10,
    chest_shots: 30,
    other_shots: 60,
  },
}

export const Default = {
  render: (props) => <HeatmapCardStats {...props} />,
}
