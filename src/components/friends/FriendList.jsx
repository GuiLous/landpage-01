import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import {
  Container,
  FriendListGroup,
  InviteListGroup,
  Scrollbars,
  SearchIcon,
} from '@components'

import style from './FriendList.module.css'

export default function FriendList({ isOpen, onClose }) {
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

      <DrawerContent>
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
                <Text
                  fontSize={16}
                  fontWeight="semibold"
                  textTransform="uppercase"
                >
                  Amigos
                </Text>
              </Container>

              <Container
                className={style.closeBtn}
                align="center"
                fitContent
                testID="close-btn"
              >
                <DrawerCloseButton
                  fontSize={12}
                  width="fit-content"
                  height="fit-content"
                  pos="initial"
                />
              </Container>
            </Container>

            <Container className={style.filter} align="center">
              <InputGroup>
                <InputLeftElement height="100%">
                  <Icon as={SearchIcon} fontSize={14} color="gray.700" />
                </InputLeftElement>
                <Input
                  variant="lighter"
                  color="gray.300"
                  fontWeight="light"
                  placeholder="Pesquisar..."
                  fontSize={14}
                  onChange={updateFilter}
                  data-testid="filter-input"
                />
              </InputGroup>
            </Container>
          </Container>

          <Container className={style.groups} column>
            <Scrollbars autoHide>
              {receivedInvites.length > 0 && (
                <Container className={style.group}>
                  <InviteListGroup
                    title="Convites"
                    items={filteredInvites}
                    open={filter === ''}
                    unread={receivedInvites.length > 0}
                  />
                </Container>
              )}

              {teamingFriends.length > 0 && (
                <Container className={style.group}>
                  <FriendListGroup
                    title="Em grupo"
                    items={filteredTeamingFriends}
                    open
                    showHeader={filter === ''}
                  />
                </Container>
              )}

              <Container className={style.group}>
                <FriendListGroup
                  title="Online"
                  items={filteredOnlineFriends}
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
