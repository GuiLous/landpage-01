import { Avatar, Text } from '@chakra-ui/react'
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
        <Container column className={style.content} gap={12}>
          <Container>
            <Text fontSize={{ base: 14, md: 12, '2xl': 14 }}>{content}</Text>
          </Container>

          <Container>
            <Text fontSize={12} color="gray.200" lineHeight={1}>
              {DateTime.fromISO(create_date).toRelative()}
            </Text>
          </Container>
        </Container>
      </Container>

      <Container className={style.avatar} justify="end" fitContent>
        <Avatar src={avatar} size="sm" variant="purple" data-testid="avatar" />
      </Container>
    </Container>
  )
}
