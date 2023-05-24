import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { NotFoundView } from '@views'

describe('NotFound Component', () => {
  it('should renders correctly', () => {
    render(
      <BrowserRouter>
        <NotFoundView />
      </BrowserRouter>
    )

    expect(screen.getByText('Voltar para o início')).toBeInTheDocument()
  })
})
