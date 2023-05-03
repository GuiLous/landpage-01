import { render, screen } from '@testing-library/react'

import { Menu } from '@chakra-ui/react'
import { NotificationListItem } from '@components'

describe('Notifications Component', () => {
  const notification = {
    id: 1,
    to_user_id: 2,
    content: 'Nova atualização do FiveM disponível.',
    avatar: 'https://github.com/GuiLous.png',
    create_date: '2023-04-08T18:23:12',
    from_user_id: null,
    read_date: null,
  }

  it('should renders correctly', () => {
    render(
      <Menu>
        <NotificationListItem
          index={0}
          notification={notification}
          isFetching={false}
          setIsFetching={() => console.log('test')}
          notifications={[
            {
              id: 1,
              to_user_id: 2,
              content: 'Nova atualização do FiveM disponível.',
              avatar: 'https://github.com/GuiLous.png',
              create_date: '2023-04-08T18:23:12',
              from_user_id: null,
              read_date: null,
            },
          ]}
          setNotifications={() => console.log('test')}
        />
      </Menu>
    )

    expect(
      screen.getByText('Nova atualização do FiveM disponível.')
    ).toBeInTheDocument()
  })
})
