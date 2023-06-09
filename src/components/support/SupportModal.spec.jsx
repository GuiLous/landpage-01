import { render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store'

import { SupportModal } from '@components'
import { Provider } from 'react-redux'

describe('SupportModal Component', () => {
  const mockStore = configureStore()({})

  it('should render correctly', async () => {
    render(
      <Provider store={mockStore}>
        <SupportModal isOpen={true} onClose={() => {}} />
      </Provider>
    )

    expect(
      screen.getByText(
        'Tem alguma dúvida? Envie para nosso suporte e logo retornaremos.'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('ENVIAR')).toBeInTheDocument()
  })
})
