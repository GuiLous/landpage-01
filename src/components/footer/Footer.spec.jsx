import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { Footer } from '@components'

describe('NotFound Component', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )

    expect(
      screen.getAllByText('Copyright ©2023. Todos os direitos reservados.')
    ).toHaveLength(2)
    expect(
      screen.getAllByText('Copyright ©2023. Todos os direitos reservados.')[0]
    ).toBeInTheDocument()
  })
})
