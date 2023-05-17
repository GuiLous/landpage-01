import { render, screen } from '@testing-library/react'

import { ToastList } from '@components'

describe('ToastList Component', () => {
  it('should renders correctly', () => {
    render(<ToastList />)
    expect(screen.getByText('')).toBeInTheDocument()
  })
})
