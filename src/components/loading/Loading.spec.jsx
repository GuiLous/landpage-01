import { render, screen } from '@testing-library/react'

import { Loading } from '@components'

describe('Loading Component', () => {
  it('should render correctly', async () => {
    render(<Loading />)

    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })
})
