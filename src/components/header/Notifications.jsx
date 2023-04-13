import { Badge, Box } from '@chakra-ui/react'
import React from 'react'

import bell from '@assets/images/bell.svg'

import style from './Notifications.module.css'

export default function Notifications({ totalNotifications }) {
  return (
    <Box className={style.notificationBox}>
      <Badge
        borderRadius="full"
        color="gray.200"
        bgColor="primary.400"
        position="absolute"
        top="-8px"
        right="-12px"
        px={2}
      >
        {totalNotifications}
      </Badge>
      <img src={bell} alt="Reload logo" />
    </Box>
  )
}
