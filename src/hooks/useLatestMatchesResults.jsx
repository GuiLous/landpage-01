import { Text } from '@chakra-ui/react'
import { Container } from '@components'

const useLatestMatchesResults = (latestMatchesResults, colorize = true) =>
  latestMatchesResults.map((matchResultItem, index) => (
    <Container fitContent key={index}>
      <Text
        color={colorize && (matchResultItem === 'V' ? 'cyan.400' : 'gray.300')}
      >
        {matchResultItem}
      </Text>
      <Text color={colorize && 'gray.300'} margin="0 3px">
        {latestMatchesResults.length !== index + 1 && ' - '}
      </Text>
    </Container>
  ))

export default useLatestMatchesResults
