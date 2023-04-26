import { Flex } from '@chakra-ui/react'
import MatchHistoryStatsAccordion from './MatchHistoryStatsAccordion'

export default {
  title: 'Profile/MatchHistoryStatsAccordion',
  component: MatchHistoryStatsAccordion,
  tags: ['autodocs'],
  argTypes: {
    win: { control: 'boolean' },
  },
}

export const Default = {
  render: (props) => (
    <Flex w={800}>
      <MatchHistoryStatsAccordion {...props} />
    </Flex>
  ),
}
