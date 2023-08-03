import { render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/lib/node'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { MatchHistoryList } from '@components'
import { BrowserRouter } from 'react-router-dom'

const server = setupServer(
  rest.get('http://localhost:8000/api/matches', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        results: [
          {
            stats: {
              kda: '0/0/0',
              kdr: 2,
              head_accuracy: 20,
              adr: 33.33,
              firstkills: 4,
            },
            id: 0,
            score: '10:2',
            end_date: '2023-05-05T10:30:00',
            won: true,
            map_name: 'Auditório',
          },
          {
            stats: {
              kda: '0/0/0',
              kdr: 2,
              head_accuracy: 20,
              adr: 33.33,
              firstkills: 4,
            },
            id: 1,
            score: '2:10',
            end_date: '2023-05-06T10:30:00',
            won: false,
            map_name: 'Auditório',
          },
        ],
        count: 1,
        page_size: 10,
        total_pages: 0,
        prev_page: null,
        current_page: 1,
        next_page: null,
      })
    )
  })
)

describe('MatchHistoryList Component', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  const user_id = 9

  const mockStore = configureStore()({}) // Cria um mock store

  it('should render correctly', async () => {
    render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <MatchHistoryList user_id={user_id} />
        </Provider>
      </BrowserRouter>
    )

    await waitFor(() => {
      screen.getByText('06 de Maio')
      screen.getByText('05 de Maio')
    })

    expect(screen.getByText('Últimas Partidas')).toBeInTheDocument()
  })

  it('should render message when there is not matches', () => {
    render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <MatchHistoryList user_id={user_id} />
        </Provider>
      </BrowserRouter>
    )

    expect(
      screen.getByText('Ops, você ainda não tem partidas.')
    ).toBeInTheDocument()
  })
})
