import { ConfirmationContent } from '@components'
import { render, screen } from '@testing-library/react'

describe('ConfirmationContent Component', () => {
  it('should render correctly', async () => {
    render(<ConfirmationContent />)

    expect(screen.getByText('Obrigado!')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Sua mensagem foi recebida. Fique de olho no seu e-mail e assim que possível, retornaremos.'
      )
    ).toBeInTheDocument()
  })
})
