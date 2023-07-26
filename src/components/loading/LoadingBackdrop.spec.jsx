import { Text } from '@chakra-ui/react'
import { render, screen } from '@testing-library/react'

import { LoadingBackdrop } from '@components'

describe('LoadingBackdrop Component', () => {
  it('should render correctly', async () => {
    render(
      <LoadingBackdrop>
        <Text>loading</Text>
      </LoadingBackdrop>
    )

    expect(screen.getByText('loading')).toBeInTheDocument()
  })
})
