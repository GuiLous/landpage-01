import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { SidebarLogo } from '@components'

describe('SidebarLogo Component', () => {
  it('should renders correctly', async () => {
    render(
      <BrowserRouter>
        <SidebarLogo />
      </BrowserRouter>
    )
    const logoImg = screen.getByTestId('logo-full')

    expect(logoImg).toBeInTheDocument()
  })
})
