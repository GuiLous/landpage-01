import { Badge, Box, Icon, Menu, MenuButton } from '@chakra-ui/react'
import React from 'react'

import { BellIcon, NotificationsMenuList } from '@components'

import style from './Notifications.module.css'

export default function Notifications({ totalNotifications }) {
  return (
    <Box className={style.notificationBox}>
      <Menu placement="bottom-end">
        <MenuButton aria-label="menu notifications button">
          {totalNotifications > 0 && (
            <Badge className={style.badge} borderRadius="full">
              {totalNotifications}
            </Badge>
          )}
          <Icon as={BellIcon} fill="#999999" w={6} h={6} />
        </MenuButton>

        <NotificationsMenuList />
      </Menu>
    </Box>
  )
}
