import { render, screen } from '@testing-library/react'

import { LobbySeat } from '@components'

describe('LobbySeat Component', () => {
  it('should render correctly', () => {
    render(<LobbySeat mini={false} disabled={false} />)

    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('should render class mini if mini is true', () => {
    render(<LobbySeat mini disabled={false} />)

    expect(screen.getByTestId('seatContainer')).toHaveClass('mini')
  })

  it('should render class disabled if disabled is true', () => {
    render(<LobbySeat mini={false} disabled />)

    expect(screen.getByTestId('seatContainer')).toHaveClass('disabled')
  })
})
