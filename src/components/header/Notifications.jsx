import { Badge, Box, Icon } from '@chakra-ui/react'
import React from 'react'

import { BellIcon } from '@components'

import style from './Notifications.module.css'

export default function Notifications({ totalNotifications }) {
  return (
    <Box className={style.notificationBox}>
      {totalNotifications > 0 && (
        <Badge
          borderRadius="full"
          color="gray.200"
          bgColor="primary.400"
          position="absolute"
          top="-8px"
          right="-12px"
          fontSize={10}
          px={2}
          py="1px"
        >
          {totalNotifications}
        </Badge>
      )}
      <Icon as={BellIcon} fill="#999999" w={6} h={6} />
    </Box>
  )
}
