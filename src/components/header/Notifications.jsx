import { Badge, Box, Icon, Menu, MenuButton } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

import { BellIcon, NotificationsMenuList } from '@components'

import style from './Notifications.module.css'

export default function Notifications() {
  const userNotifications = useSelector((state) => state.notifications)

  const totalUnreadNotifications = userNotifications.filter(
    (notification) => notification.read_date === null
  ).length

  return (
    <Box className={style.notificationBox}>
      <Menu placement="bottom-end">
        <MenuButton aria-label="menu notifications button">
          {totalUnreadNotifications > 0 && (
            <Badge className={style.badge} borderRadius="full">
              {totalUnreadNotifications}
            </Badge>
          )}
          <Icon as={BellIcon} fill="#999999" w={6} h={6} />
        </MenuButton>

        <NotificationsMenuList />
      </Menu>
    </Box>
  )
}
