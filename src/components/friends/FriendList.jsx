import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import { Container, FriendListGroup, Scrollbars, SearchIcon } from '@components'

import style from './FriendList.module.css'

export default function FriendList({ isOpen, onClose }) {
  const [isLessThan2xl] = useMediaQuery('(max-width: 1600px)')

  const user = useSelector((state) => state.user)
  const lobby = useSelector((state) => state.lobby)
  const friends = useSelector((state) => state.friends)
  const invites = useSelector((state) => state.invites)

  const [filter, setFilter] = useState('')

  const teamingFriends = lobby.players.filter(
    (player) => player.user_id !== user.id
  )

  const onlineFriends = friends.online.filter(
    (friend) => friend.lobby_id !== user.lobby_id
  )

  const filteredTeamingFriends = teamingFriends.filter(
    (friend) =>
      filter === '' ||
      friend.username.toLowerCase().includes(filter.toLowerCase())
  )

  const filteredOnlineFriends = onlineFriends.filter(
    (friend) =>
      filter === '' ||
      friend.username.toLowerCase().includes(filter.toLowerCase())
  )

  const filteredOfflineFriends = friends.offline.filter(
    (friend) =>
      filter === '' ||
      friend.username.toLowerCase().includes(filter.toLowerCase())
  )

  const receivedInvites = invites.filter(
    (invite) => invite.to_player.user_id === user.id
  )

  const filteredInvites = receivedInvites.filter(
    (invite) =>
      filter === '' ||
      invite.from_player.username.toLowerCase().includes(filter.toLowerCase())
  )

  const updateFilter = (event) => setFilter(event.target.value)

  return (
    <Drawer
      placement="left"
      isOpen={isOpen}
      isFullHeight
      onClose={onClose}
      variant="friendList"
    >
      <DrawerOverlay style={{ background: 'transparent' }} />

      <DrawerContent
        w={isLessThan2xl ? '300px' : '320px'}
        maxW={isLessThan2xl ? '300px' : '320px'}
      >
        <DrawerCloseButton
          fontSize={12}
          width="fit-content"
          height="fit-content"
          top={4}
          right={4}
          _hover={{
            color: 'gray.300',
          }}
        />

        <Container
          className={style.container}
          column
          testID="friendlist-container"
        >
          <Container
            className={style.header}
            align="center"
            fitContent
            column
            gap={24}
          >
            <Container className={style.title} align="center">
              <Container>
                <Text fontSize={16} fontWeight="medium">
                  Amigos
                </Text>
              </Container>
            </Container>

            <Container className={style.filter} align="center">
              <InputGroup
                color="gray.300"
                _focusWithin={{
                  color: 'white',
                }}
              >
                <Input
                  variant="lighter"
                  color="white"
                  placeholder="Procurar amigos..."
                  fontSize={12}
                  onChange={updateFilter}
                  data-testid="filter-input"
                />
                <InputRightElement height="100%">
                  <Icon as={SearchIcon} fontSize={14} color="currentColor" />
                </InputRightElement>
              </InputGroup>
            </Container>
          </Container>

          <Container className={style.groups} column>
            <Scrollbars autoHide>
              <Container className={style.group}>
                <FriendListGroup
                  title="No seu grupo"
                  items={filteredTeamingFriends}
                  open
                  showHeader={filter === ''}
                />
              </Container>

              <Container className={style.group}>
                <FriendListGroup
                  title="Online"
                  items={filteredOnlineFriends}
                  invites={filteredInvites}
                  showHeader={filter === ''}
                  open
                />
              </Container>

              <Container className={style.group}>
                <FriendListGroup
                  title="Offline"
                  items={filteredOfflineFriends}
                  showHeader={filter === ''}
                />
              </Container>
            </Scrollbars>
          </Container>
        </Container>
      </DrawerContent>
    </Drawer>
  )
}
