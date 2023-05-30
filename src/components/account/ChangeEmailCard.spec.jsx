import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/lib/node'
import { Provider } from 'react-redux'

import { ChangeEmailCard } from '@components'
import UserReducer from '@slices/UserSlice'

const fakeResponse = {
  id: 0,
  email: 'userUpdate@example.com',
  is_active: true,
  account: {
    steamid: 'string',
    username: 'string',
    level: 0,
    level_points: 0,
    is_verified: false,
    avatar: {},
    friends: [
      {
        steamid: 'string',
        username: 'string',
        level: 0,
        level_points: 0,
        id: 0,
        avatar: {},
        is_online: true,
        status: 'string',
        lobby: {
          id: 0,
          owner_id: 0,
          lobby_type: 'string',
          mode: 0,
          max_players: 0,
          players_ids: ['string'],
          players: [
            {
              id: 0,
              steamid: 'string',
              username: 'string',
              avatar: {},
              is_online: true,
              level: 0,
              status: 'string',
              steam_url: 'string',
            },
          ],
          players_count: 0,
          non_owners_ids: ['string'],
          is_public: true,
          invites: [
            {
              from_id: 0,
              to_id: 0,
              lobby_id: 0,
            },
          ],
          invited_players_ids: ['string'],
          overall: 0,
          seats: 0,
          queue: 'string',
          queue_time: 0,
          restriction_countdown: 0,
        },
        steam_url: 'string',
        match: {
          id: 0,
          create_date: 'string',
          start_date: 'string',
          end_date: 'string',
          status: 'string',
          game_type: 'string',
          game_mode: 0,
          server_ip: 'string',
          teams: [
            {
              id: 0,
              name: 'string',
              score: 0,
              players: [
                {
                  id: 0,
                  match_id: 0,
                  team_id: 0,
                  user_id: 0,
                  username: 'string',
                  avatar: {},
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
                    rounds_played: 0,
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
                    level_before: 0,
                    level_after: 0,
                    level_points_before: 0,
                    level_points_after: 0,
                    points_earned: 0,
                  },
                },
              ],
              match_id: 0,
            },
          ],
          rounds: 0,
          winner_id: 0,
        },
        matches_played: 0,
        latest_matches_results: ['string'],
      },
    ],
    lobby: {
      id: 0,
      owner_id: 0,
      lobby_type: 'string',
      mode: 0,
      max_players: 0,
      players_ids: ['string'],
      players: [
        {
          id: 0,
          steamid: 'string',
          username: 'string',
          avatar: {},
          is_online: true,
          level: 0,
          status: 'string',
          steam_url: 'string',
        },
      ],
      players_count: 0,
      non_owners_ids: ['string'],
      is_public: true,
      invites: [
        {
          from_id: 0,
          to_id: 0,
          lobby_id: 0,
        },
      ],
      invited_players_ids: ['string'],
      overall: 0,
      seats: 0,
      queue: 'string',
      queue_time: 0,
      restriction_countdown: 0,
    },
    lobby_invites: [
      {
        id: 'string',
        lobby_id: 0,
        lobby: {
          id: 0,
          owner_id: 0,
          lobby_type: 'string',
          mode: 0,
          max_players: 0,
          players_ids: ['string'],
          players: [
            {
              id: 0,
              steamid: 'string',
              username: 'string',
              avatar: {},
              is_online: true,
              level: 0,
              status: 'string',
              steam_url: 'string',
            },
          ],
          players_count: 0,
          non_owners_ids: ['string'],
          is_public: true,
          invites: [
            {
              from_id: 0,
              to_id: 0,
              lobby_id: 0,
            },
          ],
          invited_players_ids: ['string'],
          overall: 0,
          seats: 0,
          queue: 'string',
          queue_time: 0,
          restriction_countdown: 0,
        },
        from_player: {
          id: 0,
          steamid: 'string',
          username: 'string',
          avatar: {},
          is_online: true,
          level: 0,
          status: 'string',
          steam_url: 'string',
        },
        to_player: {
          id: 0,
          steamid: 'string',
          username: 'string',
          avatar: {},
          is_online: true,
          level: 0,
          status: 'string',
          steam_url: 'string',
        },
        create_date: 'string',
      },
    ],
    lobby_invites_sent: [
      {
        id: 'string',
        lobby_id: 0,
        lobby: {
          id: 0,
          owner_id: 0,
          lobby_type: 'string',
          mode: 0,
          max_players: 0,
          players_ids: ['string'],
          players: [
            {
              id: 0,
              steamid: 'string',
              username: 'string',
              avatar: {},
              is_online: true,
              level: 0,
              status: 'string',
              steam_url: 'string',
            },
          ],
          players_count: 0,
          non_owners_ids: ['string'],
          is_public: true,
          invites: [
            {
              from_id: 0,
              to_id: 0,
              lobby_id: 0,
            },
          ],
          invited_players_ids: ['string'],
          overall: 0,
          seats: 0,
          queue: 'string',
          queue_time: 0,
          restriction_countdown: 0,
        },
        from_player: {
          id: 0,
          steamid: 'string',
          username: 'string',
          avatar: {},
          is_online: true,
          level: 0,
          status: 'string',
          steam_url: 'string',
        },
        to_player: {
          id: 0,
          steamid: 'string',
          username: 'string',
          avatar: {},
          is_online: true,
          level: 0,
          status: 'string',
          steam_url: 'string',
        },
        create_date: 'string',
      },
    ],
    pre_match: {
      id: 'string',
      state: 'string',
      countdown: 0,
      players_ready_count: 0,
      players_total: 0,
      user_ready: false,
    },
    steam_url: 'string',
    match: {
      id: 0,
      create_date: 'string',
      start_date: 'string',
      end_date: 'string',
      status: 'string',
      game_type: 'string',
      game_mode: 0,
      server_ip: 'string',
      teams: [
        {
          id: 0,
          name: 'string',
          score: 0,
          players: [
            {
              id: 0,
              match_id: 0,
              team_id: 0,
              user_id: 0,
              username: 'string',
              avatar: {},
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
                rounds_played: 0,
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
                level_before: 0,
                level_after: 0,
                level_points_before: 0,
                level_points_after: 0,
                points_earned: 0,
              },
            },
          ],
          match_id: 0,
        },
      ],
      rounds: 0,
      winner_id: 0,
    },
    notifications: [
      {
        id: 0,
        to_user_id: 0,
        content: 'string',
        avatar: 'string',
        create_date: 'string',
        from_user_id: 0,
        read_date: 'string',
      },
    ],
    matches_played: 0,
    latest_matches_results: ['string'],
  },
  is_online: true,
  status: 'string',
}

let requestReceived = false

const server = setupServer(
  rest.patch(
    'http://localhost:8000/api/accounts/update-email/',
    (req, res, ctx) => {
      requestReceived = true
      return res(ctx.status(200), ctx.json(fakeResponse))
    }
  )
)

describe('ChangeEmailCard Component', () => {
  beforeAll(() => server.listen())
  afterEach(() => {
    server.resetHandlers()
    requestReceived = false
  })
  afterAll(() => server.close())

  const user = {
    id: 1,
    email: 'email@example.com',
    account: {
      is_verified: false,
    },
  }

  const store = configureStore({
    reducer: {
      user: UserReducer,
    },
    preloadedState: { user },
  })

  it('should render component without crash', () => {
    render(
      <Provider store={store}>
        <ChangeEmailCard />
      </Provider>
    )
    expect(screen.getByText('ALTERAR E-MAIL')).toBeInTheDocument()
  })

  it('should change value of input on change', async () => {
    render(
      <Provider store={store}>
        <ChangeEmailCard />
      </Provider>
    )

    const inputElement = screen.getByRole('textbox')
    fireEvent.click(screen.getByText('editar'))
    fireEvent.change(inputElement, { target: { value: 'test@test.com' } })

    expect(inputElement.value).toBe('test@test.com')
  })

  it('should calls api on submit', async () => {
    render(
      <Provider store={store}>
        <ChangeEmailCard />
      </Provider>
    )

    fireEvent.click(screen.getByText('editar'))
    fireEvent.click(screen.getByText('confirmar'))

    await waitFor(() => {
      expect(requestReceived).toBe(true)
    })
  })
})
