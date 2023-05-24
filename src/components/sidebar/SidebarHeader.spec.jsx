import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { SidebarHeader } from '@components'

describe('SidebarHeader Component', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <SidebarHeader username="myUsername" />
      </BrowserRouter>
    )
    expect(screen.getByText('myUsername')).toBeInTheDocument()
  })
})
