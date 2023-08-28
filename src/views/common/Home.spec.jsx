import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import UserReducer from '@slices/UserSlice'
import { HomeView } from '@views'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

let user = {
  account: {
    is_verified: false,
  },
}

const renderComponent = () => {
  const store = configureStore({
    reducer: {
      user: UserReducer,
    },
    preloadedState: { user },
  })

  render(
    <BrowserRouter>
      <Provider store={store}>
        <HomeView />
      </Provider>
    </BrowserRouter>
  )
}

describe('Home View', () => {
  it('should render correctly', async () => {
    renderComponent()

    expect(
      screen.getByText(
        'Jogue partidas 5x5 ranqueadas no GTA. Plante, desarme, suba de nível e prove seu valor. Reload.'
      )
    ).toBeInTheDocument()
    expect(screen.getByAltText('Fundo animado')).toBeInTheDocument()
    expect(screen.getByAltText('Personagem do GTA 5')).toBeInTheDocument()
    expect(screen.getAllByAltText('Reload')).toHaveLength(3)
  })

  it('should redirect to /jogar when user is verified', async () => {
    user.account.is_verified = true

    renderComponent()

    expect(mockNavigate).toHaveBeenCalledWith('/jogar')
  })
})
