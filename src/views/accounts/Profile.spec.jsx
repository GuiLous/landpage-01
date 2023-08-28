import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { MatchesAPI, ProfilesAPI } from '@api'
import { ProfileDetailsProvider } from '@contexts'
import UserReducer from '@slices/UserSlice'
import { ProfileView } from '@views'

jest.mock('@api', () => ({
  ProfilesAPI: {
    detail: jest.fn(),
  },
  MatchesAPI: {
    list: jest.fn(),
  },
}))

const mockedDetailResponse = {
  username: 'Username',
  level: 20,
  highest_level: 23,
  matches_played: 340,
  match_won: 102,
  highest_win_streak: 8,
  latest_matches_results: ['V', 'D', 'D', 'V', 'V'],
  most_kills_in_a_match: 14,
  most_damage_in_a_match: 890,
  stats: {
    kills: 240,
    deaths: 640,
    assists: 350,
    damage: 65020,
    hs_kills: 45,
    shots_fired: 4500,
    head_shots: 45,
    chest_shots: 4065,
    other_shots: 390,
    kdr: 0,
    hsk: 10,
  },
  avatar: {
    medium:
      'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
  },
  user_id: 1,
  status: 'online',
  social_handles: {
    steam: '112415987456519643',
    twitch: 'coreano',
    discord: null,
    youtube: null,
  },
}

const mockedListResponse = {
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
  total_pages: 1,
  prev_page: null,
  current_page: 1,
  next_page: null,
}

const renderComponent = () => {
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
      <ProfileDetailsProvider>
        <Provider store={store}>
          <ProfileView />
        </Provider>
      </ProfileDetailsProvider>
    </BrowserRouter>
  )
}

describe('Profile View', () => {
  it('should render correctly', async () => {
    ProfilesAPI.detail.mockResolvedValue(mockedDetailResponse)
    MatchesAPI.list.mockResolvedValue(mockedListResponse)

    renderComponent()

    await screen.findByText('Username')
    await screen.findByText('Online')
    await screen.findByText('Max Level')
    await screen.findByText('Max Kills')
    await screen.findByText('Max Wins')
    await screen.findByText('Heatmap de Acertos')
    await screen.findByText('Últimas Partidas')
  })
})
