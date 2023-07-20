import {
  Badge,
  Icon,
  Link,
  Text,
  keyframes,
  usePrefersReducedMotion,
} from '@chakra-ui/react'
import { BsEnvelopeFill } from 'react-icons/bs'

import {
  BellFilledIcon,
  Container,
  ExitIcon,
  FriendsIcon,
  PodiumIcon,
  ShopIcon,
  SupportIcon,
} from '@components'

import style from './SidebarMenuItem.module.css'

const icons = {
  amigos: FriendsIcon,
  notificações: BellFilledIcon,
  ranking: PodiumIcon,
  loja: ShopIcon,
  suporte: SupportIcon,
  sair: ExitIcon,
}

const soonItems = ['ranking', 'loja']

const shake = keyframes`
  0%{
    transform: rotate(0deg);
  }
  10%{
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(10deg);
  }
  75% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(0deg);
  }
`

export default function SidebarMenuItem({
  item,
  receivedInvites,
  unreadNotifications,
  onClickFunction,
}) {
  const isSoon = soonItems.includes(item)

  const prefersReducedMotion = usePrefersReducedMotion()

  const animation = prefersReducedMotion
    ? undefined
    : `${shake} 1s ease-in-out infinite`

  return (
    <Container className={[style.menuItem, isSoon && style.soon].join(' ')}>
      <Link as="button" onClick={() => onClickFunction(item)}>
        <Container className={style.menuLinkWrapper} gap={14} align="center">
          <Icon as={icons[`${item}`]} fill="gray.300" />
          <Text textTransform="capitalize">{item}</Text>
        </Container>

        <Container justify="end" className={style.unreadBadge}>
          {item === 'amigos' && (
            <Badge
              p="2px 10px"
              opacity={receivedInvites > 0 ? 1 : 0}
              display="flex"
              alignItems="center"
              gap="8px"
            >
              <Icon
                as={BsEnvelopeFill}
                fill="white"
                fontSize={14}
                animation={animation}
              />
              <Text
                as="span"
                fontSize={{ base: 12, md: 10, '2xl': 12 }}
                mt={{ base: 0, md: '1px', '2xl': 0 }}
              >
                {receivedInvites}
              </Text>
            </Badge>
          )}

          {item === 'notificações' && (
            <Badge
              variant="counter"
              fontSize={{ base: 12, md: 10, '2xl': 12 }}
              w={{ base: '22px', md: '18px', '2xl': '22px' }}
              h={{ base: '22px', md: '18px', '2xl': '22px' }}
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
