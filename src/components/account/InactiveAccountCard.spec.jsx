import { fireEvent, render, screen } from '@testing-library/react'
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

  it('should open the modal when button is clicked', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <InactivateAccountCard />
        </BrowserRouter>
      </Provider>
    )

    expect(
      screen.queryByText(
        'Aviso! Depois que sua conta for suspensa, você terá que aguardar 30 dias para reativá-la novamente ou entrar em contato com o suporte para revogá-la.'
      )
    ).not.toBeInTheDocument()

    fireEvent.click(screen.getByText('Prosseguir com a inativação'))

    expect(
      screen.getByText(
        'Aviso! Depois que sua conta for suspensa, você terá que aguardar 30 dias para reativá-la novamente ou entrar em contato com o suporte para revogá-la.'
      )
    ).toBeInTheDocument()
  })

  it('should close the modal when the close button is clicked', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <InactivateAccountCard />
        </BrowserRouter>
      </Provider>
    )

    fireEvent.click(screen.getByText('Prosseguir com a inativação'))

    expect(
      screen.getByText(
        'Aviso! Depois que sua conta for suspensa, você terá que aguardar 30 dias para reativá-la novamente ou entrar em contato com o suporte para revogá-la.'
      )
    ).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Close'))

    expect(
      screen.queryByText(
        'Aviso! Depois que sua conta for suspensa, você terá que aguardar 30 dias para reativá-la novamente ou entrar em contato com o suporte para revogá-la.'
      )
    ).not.toBeInTheDocument()
  })
})
