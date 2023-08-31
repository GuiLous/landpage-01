import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import InviteReducer from '@slices/InviteSlice'
import LobbyReducer from '@slices/LobbySlice'
import MatchReducer from '@slices/MatchSlice'
import { MatchView } from '@views'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

export default {
  title: 'Views/MatchView',
  component: MatchView,
  parameters: {
    mockData: [
      {
        url: 'http://localhost:8000/api/matches/1/',
        method: 'GET',
        status: 200,
        response: {
          id: 0,
          status: 'running',
          map: {
            name: 'Auditorio',
          },
          game_type: 'competitive',
          game_mode: 1,
          start_date: new Date().toISOString(),
          end_date: new Date().toISOString(),
          teams: [
            {
              id: 1,
              name: 'Team 1',
              score: 0,
              players: [
                {
                  id: 1,
                  match_id: 0,
                  team_id: 0,
                  user_id: 1,
                  username: 'player1',
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
                  level: 0,
                },
              ],
              match_id: 0,
            },
            {
              id: 2,
              name: 'Team 2',
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
                  level: 0,
                },
              ],
              match_id: 0,
            },
          ],
          rounds: 0,
          winner_id: 0,
        },
      },
    ],
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/partidas/player1/1']}>
        <Routes>
          <Route
            element={
              <Provider store={store}>
                <MatchView />
              </Provider>
            }
            path="/partidas/:username/:matchId"
          />
        </Routes>
      </MemoryRouter>
    ),
  ],
}

const match = null

const invites = [{ to_player: { user_id: null } }]

const lobby = {
  queue: null,
  invited_players_ids: [],
  players_ids: [],
}

const store = configureStore({
  reducer: {
    match: MatchReducer,
    invites: InviteReducer,
    lobby: LobbyReducer,
  },
  preloadedState: { match, invites, lobby },
})

export const Default = () => <MatchView />
