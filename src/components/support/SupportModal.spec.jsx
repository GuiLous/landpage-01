import { render, screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/lib/node'
import configureStore from 'redux-mock-store'

import { SupportModal } from '@components'
import { Provider } from 'react-redux'

const server = setupServer(
  rest.get(
    'http://localhost:8000/api/support/tickets/subjects/',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(['option 1', 'option 2', 'option 3', 'option 4'])
      )
    }
  )
)

describe('SupportModal Component', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  const mockStore = configureStore()({})

  it('should render correctly', async () => {
    render(
      <Provider store={mockStore}>
        <SupportModal isOpen={true} setIsOpen={() => {}} />
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
