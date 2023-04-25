import { Flex, Icon, Menu, MenuButton } from '@chakra-ui/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { BellIcon, NotificationsMenuList } from '@components'
import UserReducer from '@slices/UserSlice'

export default {
  title: 'Header/NotificationsMenuList',
  component: NotificationsMenuList,
  tags: ['autodocs'],
}

const user = {
  id: 1,
  account: {
    notifications: [
      {
        id: 1,
        to_user_id: 2,
        content: 'Nova atualização do FiveM disponível.',
        avatar: 'https://github.com/GuiLous.png',
        create_date: '2023-04-08T18:23:12',
        from_user_id: null,
        read_date: null,
      },
      {
        id: 2,
        to_user_id: 2,
        content: 'Pré-cadastro liberado.',
        avatar: 'https://github.com/GuiLous.png',
        create_date: '2023-04-08T18:23:12',
        from_user_id: null,
        read_date: '2023-04-08T18:23:12',
      },
      {
        id: 3,
        to_user_id: 2,
        content: 'Lançamento dia DD/MM/YYYY.',
        avatar: 'https://github.com/GuiLous.png',
        create_date: '2023-04-08T18:23:12',
        from_user_id: null,
        read_date: null,
      },
    ],
  },
}

const store = configureStore({
  reducer: {
    user: UserReducer,
  },
  preloadedState: { user },
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
