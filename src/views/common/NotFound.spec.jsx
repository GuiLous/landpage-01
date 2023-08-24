import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { NotFoundView } from '@views'

const renderComponent = () => {
  render(
    <BrowserRouter>
      <NotFoundView />
    </BrowserRouter>
  )
}

describe('NotFound View', () => {
  it('should render correctly', () => {
    renderComponent()

    expect(screen.getByAltText('Logo')).toBeInTheDocument()
    expect(screen.getByAltText('404')).toBeInTheDocument()
    expect(screen.getByAltText('Error page')).toBeInTheDocument()
    expect(screen.getByText('Voltar para o início')).toBeInTheDocument()
  })
})
