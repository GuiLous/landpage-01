import { configureStore } from '@reduxjs/toolkit'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { MatchesAPI } from '@api'
import { MatchHistoryList } from '@components'
import UserReducer from '@slices/UserSlice'

jest.mock('@api', () => ({
  MatchesAPI: {
    list: jest.fn(),
  },
}))

const fakeResponse = {
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
      start_date: '2023-05-05T10:20:00',
      end_date: '2023-05-05T10:30:00',
      won: true,
      map_name: 'Auditório',
      status: 'running',
      map_image:
        'https://static.wikia.nocookie.net/gtawiki/images/e/e8/SisyphusTheater-GTAV-Thumbnail.png',
      game_type: 'competitive',
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
      start_date: '2023-05-05T10:20:00',
      end_date: '2023-05-05T10:30:00',
      won: false,
      map_name: 'Auditório',
      status: 'finished',
      map_image:
        'https://static.wikia.nocookie.net/gtawiki/images/e/e8/SisyphusTheater-GTAV-Thumbnail.png',
      game_type: 'competitive',
    },
  ],
  count: 1,
  page_size: 10,
  total_pages: 1,
  prev_page: null,
  current_page: 1,
  next_page: null,
}

const renderComponent = (username = '', user_id = 1) => {
  const user = {
    id: 1,
  }

  const store = configureStore({
    reducer: {
      user: UserReducer,
    },
    preloadedState: { user },
  })

  render(
    <BrowserRouter>
      <Provider store={store}>
        <MatchHistoryList user_id={user_id} username={username} />
      </Provider>
    </BrowserRouter>
  )
}

describe('MatchHistoryList Component', () => {
  beforeEach(() => MatchesAPI.list.mockResolvedValue(fakeResponse))

  it('should render correctly', async () => {
    renderComponent()

    await waitFor(() => {
      screen.getByText('05 de Maio')
    })

    expect(screen.getByText('Últimas Partidas')).toBeInTheDocument()
  })

  it('should render message without username when there is no matches and user.id is equal to user_id', async () => {
    MatchesAPI.list.mockResolvedValue({
      results: [],
      count: 1,
      page_size: 10,
      total_pages: 0,
      prev_page: null,
      current_page: 1,
      next_page: null,
    })

    renderComponent()

    await screen.findByText('Ops, você ainda não tem partidas.')
  })

  it('should render message with username when there is no matches and user.id is not equal to user_id', async () => {
    MatchesAPI.list.mockResolvedValue({
      results: [],
      count: 1,
      page_size: 10,
      total_pages: 0,
      prev_page: null,
      current_page: 1,
      next_page: null,
    })
    renderComponent('User1', 2)

    await screen.findByText('Ops, User1 ainda não tem partidas.')
  })

  it('should render 0 Partidas if matches.length is 0', async () => {
    renderComponent()

    await screen.findAllByText('0 Partidas')
  })

  it('should render 2 Partidas if matches.length is 2', async () => {
    renderComponent()

    await screen.findByText('2 Partidas')
  })

  it('should render 1 Partida if matches.length is 1', async () => {
    MatchesAPI.list.mockResolvedValue({
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
          start_date: '2023-05-05T10:20:00',
          end_date: '2023-05-05T10:30:00',
          won: true,
          map_name: 'Auditório',
          status: 'finished',
          map_image:
            'https://static.wikia.nocookie.net/gtawiki/images/e/e8/SisyphusTheater-GTAV-Thumbnail.png',
          game_type: 'competitive',
        },
      ],
      count: 1,
      page_size: 10,
      total_pages: 0,
      prev_page: null,
      current_page: 1,
      next_page: null,
    })

    renderComponent()

    await screen.findByText('1 Partida')
  })

  it('should not render pagination if totalPages <= 1', async () => {
    renderComponent()

    await waitFor(() =>
      expect(screen.queryByTestId('pagination')).not.toBeInTheDocument()
    )
  })

  it('should render pagination if totalPages > 1', async () => {
    MatchesAPI.list.mockResolvedValue({
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
          start_date: '2023-05-05T10:20:00',
          end_date: '2023-05-05T10:30:00',
          won: true,
          map_name: 'Auditório',
          status: 'finished',
          map_image:
            'https://static.wikia.nocookie.net/gtawiki/images/e/e8/SisyphusTheater-GTAV-Thumbnail.png',
          game_type: 'competitive',
        },
      ],
      count: 1,
      page_size: 10,
      total_pages: 2,
      prev_page: null,
      current_page: 1,
      next_page: null,
    })

    renderComponent()

    await waitFor(() =>
      expect(screen.queryByTestId('pagination')).not.toBeInTheDocument()
    )
  })
})
