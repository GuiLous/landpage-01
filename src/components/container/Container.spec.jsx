import { Text } from '@chakra-ui/react'
import { render, screen } from '@testing-library/react'

import { Container } from '@components'

describe('Container Component', () => {
  it('should render with title', async () => {
    const title = 'Algum título'

    render(
      <Container>
        <Text>{title}</Text>
      </Container>
    )

    expect(screen.getByText(title)).toBeInTheDocument()
  })
})
