import { render, screen } from '@testing-library/react'

import { ToastListItem } from '@components'

describe('ToastListItem Component', () => {
  it('should renders correctly', () => {
    render(<ToastListItem />)
    expect(screen.getByText('')).toBeInTheDocument()
  })
})
