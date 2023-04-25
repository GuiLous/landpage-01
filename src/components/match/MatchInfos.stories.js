import MatchInfos from './MatchInfos'

export default {
  title: 'Common/MatchInfos',
  component: MatchInfos,
  tags: ['autodocs'],
  argTypes: {
    match: { control: 'object' },
  },
  args: {
    match: {
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString(),
      game_type: 'competitive',
      game_mode: 0,
    },
  },
}

export const Default = {
  render: (props) => <MatchInfos {...props} />,
}
