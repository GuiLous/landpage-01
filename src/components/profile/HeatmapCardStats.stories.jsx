import HeatmapCardStats from './HeatmapCardStats'

export default {
  title: 'Profile/HeatmapCardStats',
  component: HeatmapCardStats,
  argTypes: {
    profile: { control: 'object' },
  },
  args: {
    profile: {
      stats: {
        head_shots: 10,
        chest_shots: 30,
        other_shots: 60,
      },
    },
  },
}

export const Default = {
  render: (props) => <HeatmapCardStats {...props} />,
}
