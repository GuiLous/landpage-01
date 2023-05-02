import { Flex, Icon, Menu, MenuButton } from '@chakra-ui/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { BellIcon, NotificationsMenuList } from '@components'
import NotificationReducer from '@slices/NotificationSlice'

export default {
  title: 'Header/NotificationsMenuList',
  component: NotificationsMenuList,
}

const notifications = [
  {
    id: 1,
    to_user_id: 2,
    content: 'Nova atualização do FiveM disponível.',
    avatar: 'https://github.com/GuiLous.png',
    create_date: '2023-04-08T18:23:12',
    from_user_id: null,
    read_date: '2023-04-07T18:23:12',
  },
  {
    id: 2,
    to_user_id: 2,
    content:
      'Uma nova solicitação de amizade para você. Verifique suas notificações.',
    avatar: 'https://github.com/GuiLous.png',
    create_date: '2023-04-07T18:23:12',
    from_user_id: 4,
    read_date: null,
  },
  {
    id: 3,
    to_user_id: 2,
    content: 'Uma nova solicitação de amizade para você.',
    avatar: 'https://github.com/GuiLous.png',
    create_date: '2023-04-07T18:23:12',
    from_user_id: 5,
    read_date: '2023-04-07T18:23:12',
  },
]

const store = configureStore({
  reducer: {
    notifications: NotificationReducer,
  },
  preloadedState: { notifications },
})

export const Default = {
  render: (props) => (
    <Provider store={store}>
      <Flex h="400px" w="full" alignItems="flex-start">
        <Menu placement="bottom-end">
          <MenuButton aria-label="menu notifications button">
            <Icon as={BellIcon} fill="#999999" w={6} h={6} />
          </MenuButton>

          <NotificationsMenuList {...props} />
        </Menu>
      </Flex>
    </Provider>
  ),
}
