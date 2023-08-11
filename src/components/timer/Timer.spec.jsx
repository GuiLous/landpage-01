import { render, screen } from '@testing-library/react'

import { Text } from '@chakra-ui/react'
import { Timer } from '@components'

const props = {
  initialTime: null,
  stop: false,
  reverse: false,
  formatted: true,
}

const renderComponent = () => {
  render(
    <Text data-testid="timer">
      <Timer {...props} />
    </Text>
  )
}

describe('Timer Component', () => {
  it('should render correctly', () => {
    props.initialTime = 60
    renderComponent()

    expect(screen.getByTestId('timer')).toHaveTextContent('01:00')
  })

  it('should not render formatted if formatted is false', () => {
    props.initialTime = 60
    props.formatted = false
    renderComponent()

    expect(screen.getByTestId('timer')).not.toHaveTextContent('01:00')
    expect(screen.getByTestId('timer')).toHaveTextContent('60')
  })

  it('should render timer reverse if reverse is true', () => {
    props.initialTime = 60
    props.formatted = true
    props.reverse = true
    renderComponent()

    expect(screen.getByTestId('timer')).toHaveTextContent('01:00')
  })
})
