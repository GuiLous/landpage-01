/* eslint-disable no-sequences */
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { MatchHistoryList } from '@components'
import UserReducer from '@slices/UserSlice'

export default {
  title: 'Profile/MatchHistoryList',
  component: MatchHistoryList,
  argTypes: {
    user_id: { control: 'number' },
    username: { control: 'text' },
  },
  args: {
    user_id: 1,
    username: 'User1',
  },
  parameters: {
    mockData: [
      {
        url: 'http://localhost:8000/api/matches/?user_id=9&page=1',
        method: 'GET',
        status: 200,
        response: {
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
              score: '10 - 2',
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
              score: '13 - 10',
              start_date: '2023-05-05T10:20:00',
              end_date: '2023-05-05T10:30:00',
              won: true,
              map_name: 'Auditório',
              status: 'finished',
              map_image:
                'https://static.wikia.nocookie.net/gtawiki/images/e/e8/SisyphusTheater-GTAV-Thumbnail.png',
              game_type: 'custom',
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
              score: '2 - 10',
              start_date: '2023-05-05T10:20:00',
              end_date: '2023-05-05T10:30:00',
              won: false,
              map_name: 'Auditório',
              status: 'finished',
              map_image:
                'https://static.wikia.nocookie.net/gtawiki/images/e/e8/SisyphusTheater-GTAV-Thumbnail.png',
              game_type: 'custom',
            },
          ],
          count: 1,
          page_size: 10,
          total_pages: 2,
          prev_page: null,
          current_page: 1,
          next_page: null,
        },
      },
    ],
  },
}

const user = {
  id: 1,
}

const store = configureStore({
  reducer: {
    user: UserReducer,
  },
  preloadedState: { user },
})

export const Default = {
  render: (props) => {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <MatchHistoryList {...props} />
        </Provider>
      </BrowserRouter>
    )
  },
}
