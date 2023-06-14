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
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FriendsAPI, LobbiesAPI } from '@api'
import {
  Container,
  FriendListGroup,
  InviteListGroup,
  Scrollbars,
  SearchIcon,
} from '@components'
import { StorageService } from '@services'
import { initFriends } from '@slices/FriendSlice'
import { initInvites } from '@slices/InviteSlice'

import style from './FriendList.module.css'

export default function FriendList({ isOpen, onClose }) {
  const user = useSelector((state) => state.user)
  const lobby = useSelector((state) => state.lobby)
  const friends = useSelector((state) => state.friends)
  const invites = useSelector((state) => state.invites)
  const dispatch = useDispatch()

  const [filter, setFilter] = useState('')
  const [fetching, setFetching] = useState(true)

  const teamingFriends = lobby.players.filter(
    (player) => player.user_id !== user.id
  )

  const onlineFriends = friends.online.filter(
    (friend) => friend.lobby.id !== user.lobby_id
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

  const filteredInvites = invites.list.filter(
    (invite) =>
      filter === '' ||
      invite.from_player.username.toLowerCase().includes(filter.toLowerCase())
  )

  const updateFilter = (event) => setFilter(event.target.value)

  useEffect(() => {
    const fetchFriends = async () => {
      const userToken = StorageService.get('token')

      const response = await FriendsAPI.list(userToken)
      if (response) dispatch(initFriends(response))
    }

    const fetchInvites = async () => {
      const userToken = StorageService.get('token')

      const response = await LobbiesAPI.listReceivedInvites(userToken)
      if (!response.errorMsg) dispatch(initInvites(response))
    }

    setFetching(true)
    fetchFriends()
    fetchInvites()
    setFetching(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

          <Container
            className={[style.groups, fetching && style.loading].join(' ')}
            column
          >
            {fetching ? (
              <Text fontSize={12} color="white">
                Carregando...
              </Text>
            ) : (
              <Scrollbars autoHide>
                {invites.list.length > 0 && (
                  <Container className={style.group}>
                    <InviteListGroup
                      title="Convites"
                      items={filteredInvites}
                      open
                      unread={invites.unreadCount > 0}
                    />
                  </Container>
                )}

                {teamingFriends.length > 0 && (
                  <Container className={style.group}>
                    <FriendListGroup
                      title="Em grupo"
                      items={filteredTeamingFriends}
                      open
                    />
                  </Container>
                )}

                <Container className={style.group}>
                  <FriendListGroup
                    title="Online"
                    items={filteredOnlineFriends}
                    open
                  />
                </Container>

                <Container className={style.group}>
                  <FriendListGroup
                    title="Offline"
                    items={filteredOfflineFriends}
                  />
                </Container>
              </Scrollbars>
            )}
          </Container>
        </Container>
      </DrawerContent>
    </Drawer>
  )
}
