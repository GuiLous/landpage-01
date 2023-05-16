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
      className={[style.container, !read_date && style.unread].join(' ')}
    >
      <Container className={style.unreadWrapper} fitContent>
        <Badge
          variant={read_date ? 'disabled' : 'unread'}
          className={style.unreadBadge}
        />
      </Container>

      <Container column className={style.content}>
        <Container>
          <Text fontSize={14}>{content}</Text>
        </Container>

        <Container>
          <Text fontSize={12} color="gray.700">
            {DateTime.fromISO(create_date).toRelative()}
          </Text>
        </Container>
      </Container>

      <Container className={style.avatar} justify="end" fitContent>
        <Avatar src={avatar}></Avatar>
      </Container>
    </Container>
  )
}
