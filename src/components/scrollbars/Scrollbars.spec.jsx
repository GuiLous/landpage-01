import { render, screen } from '@testing-library/react'

import { Scrollbars } from '@components'

describe('Scrollbars Component', () => {
  it('should render correctly', () => {
    render(
      <Scrollbars>
        <div>Test Content</div>
      </Scrollbars>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })
})
