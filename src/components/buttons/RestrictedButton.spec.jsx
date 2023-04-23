import { render, screen } from '@testing-library/react'

import { RestrictedButton } from '@components'

describe('RestrictedButton Component', () => {
  it('should renders correctly', () => {
    render(<RestrictedButton restriction_countdown={120} />)

    expect(screen.getByText('2:00')).toBeInTheDocument()
  })
})
