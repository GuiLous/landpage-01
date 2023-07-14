import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import AppReducer from '@slices/AppSlice'
import { MaintenanceView } from '@views'

describe('Maintenance Component', () => {
  const app = {
    maintenance: false,
  }

  const store = configureStore({
    reducer: {
      app: AppReducer,
    },
    preloadedState: { app },
  })

  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MaintenanceView />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByText('Voltar para o início')).toBeInTheDocument()
  })
})
