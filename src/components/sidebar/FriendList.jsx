import {
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
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

import logoSymbol from '@assets/images/logo_symbol_white.svg'
import style from './FriendList.module.css'

export default function FriendList() {
  useEffect(() => {
    const fetch = async () => {
      const userToken = StorageService.get('token')

      const response = await FriendsAPI.list(userToken)
      if (response) dispatch(initFriends(response))
    }

    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const friends = useSelector((state) => state.friends)
  const [filter, setFilter] = useState('')
  const [filtering, setFiltering] = useState(false)
  const dispatch = useDispatch()
  const inputFilterRef = useRef()

  const filteredOnlineFriends = friends.online.filter(
    (friend) =>
      filter === '' ||
      friend.username.toLowerCase().includes(filter.toLowerCase())
  )

  const filteredOfflineFriends = friends.offline.filter(
    (friend) =>
      filter === '' ||
      friend.username.toLowerCase().includes(filter.toLowerCase())
  )

  const updateFilter = () => setFilter(inputFilterRef.current.value)
  const toggleFiltering = () => {
    setFilter('')
    setFiltering(!filtering)
  }

  return (
    <Container className={style.container} column>
      <Container className={style.header} align="center" fitContent>
        {filtering ? (
          <Container className={style.filter} align="center">
            <InputGroup>
              <Container>
                <Input
                  variant="clean"
                  maxHeight="36px"
                  ref={inputFilterRef}
                  autoFocus={filtering}
                  color="gray.300"
                  fontWeight="light"
                  fontSize={14}
                  paddingStart={0}
                  onChange={updateFilter}
                  data-testid="input-filter"
                />
              </Container>
              <Container
                onClick={toggleFiltering}
                className={style.filterBtn}
                testID="close-filter"
              >
                <InputRightElement height="100%">
                  <Icon as={CloseIcon} fill="white" fontSize={12} />
                </InputRightElement>
              </Container>
            </InputGroup>
          </Container>
        ) : (
          <Container className={style.title} align="center">
            <Container>
              <Text
                fontSize={14}
                fontWeight="semibold"
                textTransform="uppercase"
              >
                Amigos
              </Text>
            </Container>

            <Container
              justify="center"
              className={style.filterBtn}
              align="center"
              fitContent
              onClick={toggleFiltering}
              testID="open-filter"
            >
              <Icon as={SearchIcon} fill="white" fontSize={16} />
            </Container>
          </Container>
        )}
      </Container>

      <Container className={style.groups} column>
        <Scrollbars autoHide>
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

      <Container className={style.footer} justify="center" fitContent>
        <Image src={logoSymbol} maxW={'24px'} />
      </Container>
    </Container>
  )
}
