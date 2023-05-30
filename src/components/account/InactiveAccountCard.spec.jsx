import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

import { InactivateAccountCard } from '@components'

describe('InactivateAccountCard Component', () => {
  const mockStore = configureStore()({})

  it('should render correctly', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <InactivateAccountCard />
        </BrowserRouter>
      </Provider>
    )

    expect(screen.getByText('INATIVAR CONTA')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Desative temporariamente a sua conta. Você não perderá nenhuma de suas informações.'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('Prosseguir com a inativação')).toBeInTheDocument()
  })
})
