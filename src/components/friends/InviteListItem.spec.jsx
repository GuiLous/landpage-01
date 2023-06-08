import { render, screen } from '@testing-library/react'

import { InviteListItem } from '@components'

describe('InviteListItem Component', () => {
  it('should render correctly', () => {
    render(<InviteListItem />)
    expect(screen.getByText('')).toBeInTheDocument()
  })
})
