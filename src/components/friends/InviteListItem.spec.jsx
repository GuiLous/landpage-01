import { render, screen } from '@testing-library/react'

import { InviteListGroupItem } from '@components'

describe('InviteListGroupItem Component', () => {
  it('should render correctly', () => {
    render(<InviteListGroupItem />)
    expect(screen.getByText('')).toBeInTheDocument()
  })
})
