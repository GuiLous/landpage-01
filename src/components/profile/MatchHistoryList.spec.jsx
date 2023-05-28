import { render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/lib/node'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { MatchHistoryList } from '@components'
import { BrowserRouter } from 'react-router-dom'

const server = setupServer(
  rest.get(
    'http://localhost:8000/api/matches/?user_id=9&page=1',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          results: [
            {
              id: 1,
              create_date: '2023-04-19T15:36:20.725000+00:00',
              start_date: '2023-04-19T15:16:05+00:00',
              end_date: '2023-04-19T15:36:06+00:00',
              status: 'finished',
              game_type: 'competitive',
              game_mode: 5,
              server_ip: '123.123.123.123',
              teams: [
                {
                  id: 1,
                  name: 'Team A',
                  score: 10,
                  players: [
                    {
                      id: 1,
                      match_id: 1,
                      team_id: 1,
                      user_id: 2,
                      username: 'player1',
                      avatar: {
                        small:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg',
                        medium:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
                        large:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
                      },
                      stats: {
                        kills: 0,
                        deaths: 0,
                        assists: 0,
                        damage: 0,
                        hs_kills: 0,
                        afk: 0,
                        plants: 0,
                        defuses: 0,
                        double_kills: 0,
                        triple_kills: 0,
                        quadra_kills: 0,
                        aces: 0,
                        clutch_v1: 0,
                        clutch_v2: 0,
                        clutch_v3: 0,
                        clutch_v4: 0,
                        clutch_v5: 0,
                        firstkills: 0,
                        shots_fired: 0,
                        head_shots: 0,
                        chest_shots: 0,
                        other_shots: 0,
                        rounds_played: 18,
                        clutches: 0,
                        shots_hit: 0,
                        adr: 0,
                        kdr: 0,
                        kda: 0,
                        ahk: 0,
                        ahr: 0,
                        accuracy: 0,
                        head_accuracy: 0,
                        chest_accuracy: 0,
                        others_accuracy: 0,
                      },
                      progress: {
                        level_before: 1,
                        level_after: 1,
                        level_points_before: 0,
                        level_points_after: 10,
                        points_earned: 10,
                      },
                    },
                    {
                      id: 2,
                      match_id: 1,
                      team_id: 1,
                      user_id: 3,
                      username: 'player2',
                      avatar: {
                        small:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg',
                        medium:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
                        large:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
                      },
                      stats: {
                        kills: 0,
                        deaths: 0,
                        assists: 0,
                        damage: 0,
                        hs_kills: 0,
                        afk: 0,
                        plants: 0,
                        defuses: 0,
                        double_kills: 0,
                        triple_kills: 0,
                        quadra_kills: 0,
                        aces: 0,
                        clutch_v1: 0,
                        clutch_v2: 0,
                        clutch_v3: 0,
                        clutch_v4: 0,
                        clutch_v5: 0,
                        firstkills: 0,
                        shots_fired: 0,
                        head_shots: 0,
                        chest_shots: 0,
                        other_shots: 0,
                        rounds_played: 18,
                        clutches: 0,
                        shots_hit: 0,
                        adr: 0,
                        kdr: 0,
                        kda: 0,
                        ahk: 0,
                        ahr: 0,
                        accuracy: 0,
                        head_accuracy: 0,
                        chest_accuracy: 0,
                        others_accuracy: 0,
                      },
                      progress: {
                        level_before: 1,
                        level_after: 1,
                        level_points_before: 0,
                        level_points_after: 10,
                        points_earned: 10,
                      },
                    },
                    {
                      id: 3,
                      match_id: 1,
                      team_id: 1,
                      user_id: 4,
                      username: 'player3',
                      avatar: {
                        small:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg',
                        medium:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
                        large:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
                      },
                      stats: {
                        kills: 0,
                        deaths: 0,
                        assists: 0,
                        damage: 0,
                        hs_kills: 0,
                        afk: 0,
                        plants: 0,
                        defuses: 0,
                        double_kills: 0,
                        triple_kills: 0,
                        quadra_kills: 0,
                        aces: 0,
                        clutch_v1: 0,
                        clutch_v2: 0,
                        clutch_v3: 0,
                        clutch_v4: 0,
                        clutch_v5: 0,
                        firstkills: 0,
                        shots_fired: 0,
                        head_shots: 0,
                        chest_shots: 0,
                        other_shots: 0,
                        rounds_played: 18,
                        clutches: 0,
                        shots_hit: 0,
                        adr: 0,
                        kdr: 0,
                        kda: 0,
                        ahk: 0,
                        ahr: 0,
                        accuracy: 0,
                        head_accuracy: 0,
                        chest_accuracy: 0,
                        others_accuracy: 0,
                      },
                      progress: {
                        level_before: 1,
                        level_after: 1,
                        level_points_before: 0,
                        level_points_after: 10,
                        points_earned: 10,
                      },
                    },
                    {
                      id: 4,
                      match_id: 1,
                      team_id: 1,
                      user_id: 5,
                      username: 'player4',
                      avatar: {
                        small:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg',
                        medium:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
                        large:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
                      },
                      stats: {
                        kills: 0,
                        deaths: 0,
                        assists: 0,
                        damage: 0,
                        hs_kills: 0,
                        afk: 0,
                        plants: 0,
                        defuses: 0,
                        double_kills: 0,
                        triple_kills: 0,
                        quadra_kills: 0,
                        aces: 0,
                        clutch_v1: 0,
                        clutch_v2: 0,
                        clutch_v3: 0,
                        clutch_v4: 0,
                        clutch_v5: 0,
                        firstkills: 0,
                        shots_fired: 0,
                        head_shots: 0,
                        chest_shots: 0,
                        other_shots: 0,
                        rounds_played: 18,
                        clutches: 0,
                        shots_hit: 0,
                        adr: 0,
                        kdr: 0,
                        kda: 0,
                        ahk: 0,
                        ahr: 0,
                        accuracy: 0,
                        head_accuracy: 0,
                        chest_accuracy: 0,
                        others_accuracy: 0,
                      },
                      progress: {
                        level_before: 1,
                        level_after: 1,
                        level_points_before: 0,
                        level_points_after: 10,
                        points_earned: 10,
                      },
                    },
                    {
                      id: 5,
                      match_id: 1,
                      team_id: 1,
                      user_id: 6,
                      username: 'player5',
                      avatar: {
                        small:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg',
                        medium:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
                        large:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
                      },
                      stats: {
                        kills: 0,
                        deaths: 0,
                        assists: 0,
                        damage: 0,
                        hs_kills: 0,
                        afk: 0,
                        plants: 0,
                        defuses: 0,
                        double_kills: 0,
                        triple_kills: 0,
                        quadra_kills: 0,
                        aces: 0,
                        clutch_v1: 0,
                        clutch_v2: 0,
                        clutch_v3: 0,
                        clutch_v4: 0,
                        clutch_v5: 0,
                        firstkills: 0,
                        shots_fired: 0,
                        head_shots: 0,
                        chest_shots: 0,
                        other_shots: 0,
                        rounds_played: 18,
                        clutches: 0,
                        shots_hit: 0,
                        adr: 0,
                        kdr: 0,
                        kda: 0,
                        ahk: 0,
                        ahr: 0,
                        accuracy: 0,
                        head_accuracy: 0,
                        chest_accuracy: 0,
                        others_accuracy: 0,
                      },
                      progress: {
                        level_before: 1,
                        level_after: 1,
                        level_points_before: 0,
                        level_points_after: 10,
                        points_earned: 10,
                      },
                    },
                  ],
                  match_id: 1,
                },
                {
                  id: 2,
                  name: 'Team B',
                  score: 8,
                  players: [
                    {
                      id: 6,
                      match_id: 1,
                      team_id: 2,
                      user_id: 7,
                      username: 'player6',
                      avatar: {
                        small:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg',
                        medium:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
                        large:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
                      },
                      stats: {
                        kills: 0,
                        deaths: 0,
                        assists: 0,
                        damage: 0,
                        hs_kills: 0,
                        afk: 0,
                        plants: 0,
                        defuses: 0,
                        double_kills: 0,
                        triple_kills: 0,
                        quadra_kills: 0,
                        aces: 0,
                        clutch_v1: 0,
                        clutch_v2: 0,
                        clutch_v3: 0,
                        clutch_v4: 0,
                        clutch_v5: 0,
                        firstkills: 0,
                        shots_fired: 0,
                        head_shots: 0,
                        chest_shots: 0,
                        other_shots: 0,
                        rounds_played: 18,
                        clutches: 0,
                        shots_hit: 0,
                        adr: 0,
                        kdr: 0,
                        kda: 0,
                        ahk: 0,
                        ahr: 0,
                        accuracy: 0,
                        head_accuracy: 0,
                        chest_accuracy: 0,
                        others_accuracy: 0,
                      },
                      progress: {
                        level_before: 1,
                        level_after: 0,
                        level_points_before: 0,
                        level_points_after: 80,
                        points_earned: -20,
                      },
                    },
                    {
                      id: 7,
                      match_id: 1,
                      team_id: 2,
                      user_id: 8,
                      username: 'player7',
                      avatar: {
                        small:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg',
                        medium:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
                        large:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
                      },
                      stats: {
                        kills: 0,
                        deaths: 0,
                        assists: 0,
                        damage: 0,
                        hs_kills: 0,
                        afk: 0,
                        plants: 0,
                        defuses: 0,
                        double_kills: 0,
                        triple_kills: 0,
                        quadra_kills: 0,
                        aces: 0,
                        clutch_v1: 0,
                        clutch_v2: 0,
                        clutch_v3: 0,
                        clutch_v4: 0,
                        clutch_v5: 0,
                        firstkills: 0,
                        shots_fired: 0,
                        head_shots: 0,
                        chest_shots: 0,
                        other_shots: 0,
                        rounds_played: 18,
                        clutches: 0,
                        shots_hit: 0,
                        adr: 0,
                        kdr: 0,
                        kda: 0,
                        ahk: 0,
                        ahr: 0,
                        accuracy: 0,
                        head_accuracy: 0,
                        chest_accuracy: 0,
                        others_accuracy: 0,
                      },
                      progress: {
                        level_before: 1,
                        level_after: 0,
                        level_points_before: 0,
                        level_points_after: 80,
                        points_earned: -20,
                      },
                    },
                    {
                      id: 8,
                      match_id: 1,
                      team_id: 2,
                      user_id: 9,
                      username: 'player8',
                      avatar: {
                        small:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg',
                        medium:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
                        large:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
                      },
                      stats: {
                        kills: 0,
                        deaths: 0,
                        assists: 0,
                        damage: 0,
                        hs_kills: 0,
                        afk: 0,
                        plants: 0,
                        defuses: 0,
                        double_kills: 0,
                        triple_kills: 0,
                        quadra_kills: 0,
                        aces: 0,
                        clutch_v1: 0,
                        clutch_v2: 0,
                        clutch_v3: 0,
                        clutch_v4: 0,
                        clutch_v5: 0,
                        firstkills: 0,
                        shots_fired: 0,
                        head_shots: 0,
                        chest_shots: 0,
                        other_shots: 0,
                        rounds_played: 18,
                        clutches: 0,
                        shots_hit: 0,
                        adr: 0,
                        kdr: 0,
                        kda: 0,
                        ahk: 0,
                        ahr: 0,
                        accuracy: 0,
                        head_accuracy: 0,
                        chest_accuracy: 0,
                        others_accuracy: 0,
                      },
                      progress: {
                        level_before: 1,
                        level_after: 0,
                        level_points_before: 0,
                        level_points_after: 80,
                        points_earned: -20,
                      },
                    },
                    {
                      id: 9,
                      match_id: 1,
                      team_id: 2,
                      user_id: 11,
                      username: 'player10',
                      avatar: {
                        small:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg',
                        medium:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
                        large:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
                      },
                      stats: {
                        kills: 0,
                        deaths: 0,
                        assists: 0,
                        damage: 0,
                        hs_kills: 0,
                        afk: 0,
                        plants: 0,
                        defuses: 0,
                        double_kills: 0,
                        triple_kills: 0,
                        quadra_kills: 0,
                        aces: 0,
                        clutch_v1: 0,
                        clutch_v2: 0,
                        clutch_v3: 0,
                        clutch_v4: 0,
                        clutch_v5: 0,
                        firstkills: 0,
                        shots_fired: 0,
                        head_shots: 0,
                        chest_shots: 0,
                        other_shots: 0,
                        rounds_played: 18,
                        clutches: 0,
                        shots_hit: 0,
                        adr: 0,
                        kdr: 0,
                        kda: 0,
                        ahk: 0,
                        ahr: 0,
                        accuracy: 0,
                        head_accuracy: 0,
                        chest_accuracy: 0,
                        others_accuracy: 0,
                      },
                      progress: {
                        level_before: 1,
                        level_after: 0,
                        level_points_before: 0,
                        level_points_after: 80,
                        points_earned: -20,
                      },
                    },
                    {
                      id: 10,
                      match_id: 1,
                      team_id: 2,
                      user_id: 10,
                      username: 'player9',
                      avatar: {
                        small:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg',
                        medium:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
                        large:
                          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
                      },
                      stats: {
                        kills: 0,
                        deaths: 0,
                        assists: 0,
                        damage: 0,
                        hs_kills: 0,
                        afk: 0,
                        plants: 0,
                        defuses: 0,
                        double_kills: 0,
                        triple_kills: 0,
                        quadra_kills: 0,
                        aces: 0,
                        clutch_v1: 0,
                        clutch_v2: 0,
                        clutch_v3: 0,
                        clutch_v4: 0,
                        clutch_v5: 0,
                        firstkills: 0,
                        shots_fired: 0,
                        head_shots: 0,
                        chest_shots: 0,
                        other_shots: 0,
                        rounds_played: 18,
                        clutches: 0,
                        shots_hit: 0,
                        adr: 0,
                        kdr: 0,
                        kda: 0,
                        ahk: 0,
                        ahr: 0,
                        accuracy: 0,
                        head_accuracy: 0,
                        chest_accuracy: 0,
                        others_accuracy: 0,
                      },
                      progress: {
                        level_before: 1,
                        level_after: 0,
                        level_points_before: 0,
                        level_points_after: 80,
                        points_earned: -20,
                      },
                    },
                  ],
                  match_id: 1,
                },
              ],
              rounds: 18,
              winner_id: 1,
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
    }
  )
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
      screen.getByText('19 de April')
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
