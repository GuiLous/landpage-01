import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

import { MaintenanceView } from '@views'

describe('Maintenance Component', () => {
  const mockStore = configureStore()({})

  it('should renders correctly', () => {
    render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <MaintenanceView />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByText('Voltar para o início')).toBeInTheDocument()
  })
})
