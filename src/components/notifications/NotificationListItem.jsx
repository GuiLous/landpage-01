import { Avatar, Badge, Text } from '@chakra-ui/react'
import { DateTime } from 'luxon'

import { Container } from '@components'

import style from './NotificationListItem.module.css'

export default function NotificationListItem({
  content,
  avatar,
  read_date,
  create_date,
}) {
  return (
    <Container
      testID="notification"
      className={[style.container, !read_date && style.unread].join(' ')}
      gap={15}
      align="center"
    >
      <Container gap={16} align="center">
        {!read_date && <Badge variant="unread" w={2} h={2} />}

        <Container column className={style.content} gap={12}>
          <Container>
            <Text fontSize={12}>{content}</Text>
          </Container>

          <Container>
            <Text fontSize={12} color="gray.650" lineHeight={1}>
              {DateTime.fromISO(create_date).toRelative()}
            </Text>
          </Container>
        </Container>
      </Container>

      <Container className={style.avatar} justify="end" fitContent>
        <Avatar src={avatar} w="38px" h="38px"></Avatar>
      </Container>
    </Container>
  )
}
