import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { AccountsAPI, AppAPI } from '@api'
import { StorageService } from '@services'
import AppReducer from '@slices/AppSlice'
import { MaintenanceView } from '@views'

jest.mock('@api', () => ({
  AccountsAPI: {
    logout: jest.fn(),
  },
  AppAPI: {
    healthCheck: jest.fn(),
  },
}))

jest.mock('@services', () => ({
  StorageService: {
    get: jest.fn(),
    remove: jest.fn(),
    set: jest.fn(),
  },
}))

const renderComponent = (maintenance = false) => {
  const app = {
    maintenance,
  }

  const store = configureStore({
    reducer: {
      app: AppReducer,
    },
    preloadedState: { app },
  })

  render(
    <BrowserRouter>
      <Provider store={store}>
        <MaintenanceView />
      </Provider>
    </BrowserRouter>
  )
}

describe('Maintenance View', () => {
  it('should render correctly', () => {
    renderComponent()

    expect(screen.getByAltText('ReloadClub')).toBeInTheDocument()
    expect(screen.getByAltText('Alert')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Calmô meu cria, a gente deu um pause pra ajustar umas coisas, mas já voltamos. Fica tranquilo que assim que terminar por aqui, a gente te libera no automático.'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('Voltar para o início')).toBeInTheDocument()
  })

  it('should call logout on click button', async () => {
    AccountsAPI.logout.mockResolvedValue({})

    renderComponent()

    const logoutBtn = screen.getByTestId('logout')

    fireEvent.click(logoutBtn)

    await waitFor(() => expect(AccountsAPI.logout).toHaveBeenCalled())
  })

  it('should call healthCheck is has maintenance', async () => {
    AppAPI.healthCheck.mockResolvedValue({ maintenance: true })

    renderComponent(true)

    await waitFor(() => expect(AppAPI.healthCheck).toHaveBeenCalled())
  })

  it('should set maintenance ended on storage if response maintenance is false', async () => {
    AppAPI.healthCheck.mockResolvedValue({ maintenance: false })

    renderComponent(true)

    await waitFor(() =>
      expect(StorageService.set).toHaveBeenCalledWith('maintenance', 'ended')
    )
  })
})
