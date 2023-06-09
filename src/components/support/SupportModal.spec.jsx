import { SupportModal } from '@components'
import { render, screen } from '@testing-library/react'

describe('SupportModal Component', () => {
  it('should render correctly', async () => {
    render(<SupportModal isOpen={true} onClose={() => {}} />)

    expect(
      screen.getByText(
        'Tem alguma dúvida? Envie para nosso suporte e logo retornaremos.'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('ENVIAR')).toBeInTheDocument()
  })
})
