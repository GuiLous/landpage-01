import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { Container, Sidebar } from '@components'
import InviteReducer from '@slices/InviteSlice'
import UserReducer from '@slices/UserSlice'

export default {
  title: 'Common/Sidebar',
  component: Sidebar,
  argTypes: {},
  args: {},
}

const user = {
  id: 1,
  account: {
    friends: [
      {
        steamid: '123456789',
        level: 0,
        level_points: 0,
        id: 2,
        username: 'friendUsername',
        avatar: {
          small:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
          medium:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
          large:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
        },
        is_online: true,
        status: 'online',
        lobby: {
          players_ids: [2],
        },
        steam_url: 'http://steamcommunity.com/profiles/76561198075990604',
        matches_played: 0,
        latest_matches_results: ['N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
        match: null,
      },
      {
        steamid: '133456789',
        level: 0,
        level_points: 0,
        id: 3,
        username: 'friendUsername',
        avatar: {
          small:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
          medium:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
          large:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
        },
        is_online: true,
        status: 'online',
        lobby: {
          players_ids: [3],
        },
        steam_url: 'http://steamcommunity.com/profiles/76561198075990604',
        matches_played: 0,
        latest_matches_results: ['N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
        match: null,
      },
      {
        steamid: '134456789',
        level: 0,
        level_points: 0,
        id: 4,
        username: 'friendUsername',
        avatar: {
          small:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
          medium:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
          large:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
        },
        is_online: true,
        status: 'online',
        lobby: {
          players_ids: [4],
        },
        steam_url: 'http://steamcommunity.com/profiles/76561198075990604',
        matches_played: 0,
        latest_matches_results: ['N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
        match: null,
      },
      {
        steamid: '135456789',
        level: 0,
        level_points: 0,
        id: 5,
        username: 'friendUsername',
        avatar: {
          small:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
          medium:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
          large:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
        },
        is_online: true,
        status: 'online',
        lobby: {
          players_ids: [5],
        },
        steam_url: 'http://steamcommunity.com/profiles/76561198075990604',
        matches_played: 0,
        latest_matches_results: ['N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
        match: null,
      },
      {
        steamid: '136456789',
        level: 0,
        level_points: 0,
        id: 6,
        username: 'friendUsername',
        avatar: {
          small:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
          medium:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
          large:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
        },
        is_online: true,
        status: 'online',
        lobby: {
          players_ids: [6],
        },
        steam_url: 'http://steamcommunity.com/profiles/76561198075990604',
        matches_played: 0,
        latest_matches_results: ['N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
        match: null,
      },
      {
        steamid: '137456789',
        level: 0,
        level_points: 0,
        id: 7,
        username: 'friendUsername',
        avatar: {
          small:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
          medium:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
          large:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
        },
        is_online: true,
        status: 'online',
        lobby: {
          players_ids: [7],
        },
        steam_url: 'http://steamcommunity.com/profiles/76561198075990604',
        matches_played: 0,
        latest_matches_results: ['N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
        match: null,
      },
      {
        steamid: '183456789',
        level: 0,
        level_points: 0,
        id: 8,
        username: 'friendUsername',
        avatar: {
          small:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
          medium:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
          large:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
        },
        is_online: true,
        status: 'online',
        lobby: {
          players_ids: [8],
        },
        steam_url: 'http://steamcommunity.com/profiles/76561198075990604',
        matches_played: 0,
        latest_matches_results: ['N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
        match: null,
      },
    ],
    lobby: {
      players_ids: [1],
      max_players: 5,
      player_count: 1,
    },
    lobby_invites: [],
    lobby_invites_sent: [],
  },
}

const invites = {
  received: [],
  sent: [],
  unread: 0,
}

const store = configureStore({
  reducer: {
    user: UserReducer,
    invites: InviteReducer,
  },
  preloadedState: { user, invites },
})

export const Default = {
  render: (props) => (
    <Provider store={store}>
      <Container style={{ height: '90vh' }}>
        <Sidebar {...props} />
      </Container>
    </Provider>
  ),
}
