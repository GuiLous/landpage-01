import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FriendsAPI } from '@api'
import {
  CloseIcon,
  Container,
  FriendListGroup,
  Scrollbars,
  SearchIcon,
} from '@components'
import { StorageService } from '@services'
import { initFriends } from '@slices/FriendSlice'

import style from './FriendList.module.css'

export default function FriendList({ isOpen }) {
  useEffect(() => {
    const fetch = async () => {
      const userToken = StorageService.get('token')

      const response = await FriendsAPI.list(userToken)
      if (response) dispatch(initFriends(response))
    }

    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setVisible(isOpen)
  }, [isOpen])

  const user = useSelector((state) => state.user)
  const friends = useSelector((state) => state.friends)
  const [filter, setFilter] = useState('')
  const [visible, setVisible] = useState(isOpen)
  const dispatch = useDispatch()

  const teamingFriends = friends.online.filter(
    (friend) => friend.account.lobby.id === user.account.lobby.id
  )
  const onlineFriends = friends.online.filter(
    (friend) => friend.account.lobby.id !== user.account.lobby.id
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

  const updateFilter = (event) => setFilter(event.target.value)
  const handleClose = () => setVisible(false)

  return (
    visible && (
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
              onClick={handleClose}
            >
              <Icon as={CloseIcon} fill="white" fontSize={12} />
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
            {teamingFriends && (
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
              <FriendListGroup title="Offline" items={filteredOfflineFriends} />
            </Container>
          </Scrollbars>
        </Container>
      </Container>
    )
  )
}
