import { LineupPlayerCardLatestMatches } from './LineupPlayerCardLatestMatches'

export default {
  title: 'Friends/LineupPlayerCardLatestMatches',
  component: LineupPlayerCardLatestMatches,
  argTypes: {
    latest_matches_results: { control: 'array' },
    matches_played: { control: 'number' },
  },
  args: {
    latest_matches_results: ['V', 'D'],
    matches_played: 2,
  },
}

export const Default = (props: any) => {
  return <LineupPlayerCardLatestMatches {...props} />
}
