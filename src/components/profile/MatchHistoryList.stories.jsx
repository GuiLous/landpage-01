/* eslint-disable no-sequences */
import { MatchHistoryList } from '@components'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

export default {
  title: 'Profile/MatchHistoryList',
  component: MatchHistoryList,
  argTypes: {},
  args: {},
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
          total_pages: 2,
          prev_page: null,
          current_page: 1,
          next_page: null,
        },
      },
    ],
  },
}

const mockStore = configureStore()({})

export const Default = {
  render: (props) => {
    return (
      <BrowserRouter>
        <Provider store={mockStore}>
          <MatchHistoryList {...props} />
        </Provider>
      </BrowserRouter>
    )
  },
}
