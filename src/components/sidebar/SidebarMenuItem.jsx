import { Badge, Icon, Link, Text } from '@chakra-ui/react'

import {
  BellFilledIcon,
  Container,
  ExitIcon,
  FriendsIcon,
  PodiumIcon,
  ShopIcon,
  SupportIcon,
} from '@components'

import style from './Sidebar.module.css'

const icons = {
  amigos: FriendsIcon,
  notificações: BellFilledIcon,
  ranking: PodiumIcon,
  loja: ShopIcon,
  suporte: SupportIcon,
  sair: ExitIcon,
}

const soonItems = ['ranking', 'loja']

export default function SidebarMenuItem({
  item,
  receivedInvites,
  unreadNotifications,
  onClickFunction,
}) {
  const isSoon = soonItems.includes(item)

  return (
    <Container className={[style.menuItem, isSoon && style.soon].join(' ')}>
      <Link as="button" onClick={() => onClickFunction(item)}>
        <Container className={style.menuLinkWrapper} gap={14} align="center">
          <Icon as={icons[`${item}`]} fill="gray.700" />
          <Text textTransform="capitalize">{item}</Text>
        </Container>

        <Container justify="end" className={style.unreadBadge}>
          {item === 'amigos' && (
            <Badge
              variant="counter"
              style={{ opacity: receivedInvites > 0 ? 1 : 0 }}
            >
              {receivedInvites}
            </Badge>
          )}

          {item === 'notificações' && (
            <Badge
              variant="counter"
              style={{ opacity: unreadNotifications > 0 ? 1 : 0 }}
            >
              {unreadNotifications}
            </Badge>
          )}

          {isSoon && (
            <Badge
              fontSize={{ base: 10, md: 8, '2xl': 10 }}
              paddingBottom={{ base: '4px', md: '3px', '2xl': '4px' }}
            >
              Em breve
            </Badge>
          )}
        </Container>
      </Link>
    </Container>
  )
}
