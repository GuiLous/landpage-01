import MatchHistoryStatsAccordion from './MatchHistoryStatsAccordion'

export default {
  title: 'Profile/MatchHistoryStatsAccordion',
  component: MatchHistoryStatsAccordion,
  argTypes: {
    win: { control: 'boolean' },
  },
}

export const Default = {
  render: (props) => <MatchHistoryStatsAccordion {...props} />,
}
