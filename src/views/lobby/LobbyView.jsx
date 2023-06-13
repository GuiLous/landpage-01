import { Badge, Icon, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { LobbiesAPI } from '@api'
import {
  ArrowUpFilledIcon,
  Container,
  JoystickIcon,
  Loading,
  LoadingBackdrop,
  LobbyLineup,
  LobbyPlayButton,
} from '@components'
import { MainLayout } from '@layouts'
import { StorageService } from '@services'
import { addToast } from '@slices/AppSlice'
import { initLobby, updateLobby } from '@slices/LobbySlice'

import style from './LobbyView.module.css'

export default function LobbyView() {
  const user = useSelector((state) => state.user)
  const lobby = useSelector((state) => state.lobby)
  const preMatch = useSelector((state) => state.match.preMatch)
  const match = useSelector((state) => state.match.match)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [fetching, setFetching] = useState(true)

  const isOwner = lobby.owner_id === user.id
  const userPlayer = lobby.players?.find((player) => player.user_id === user.id)
  const otherPlayers = lobby.players?.filter(
    (player) => player.user_id !== user.id
  )

  const handleQueue = async (action) => {
    if (!isOwner || preMatch || match) return

    const userToken = StorageService.get('token')

    let response = null

    if (action === 'start')
      response = await LobbiesAPI.startQueue(userToken, lobby.id)
    else response = await LobbiesAPI.cancelQueue(userToken, lobby.id)

    if (response.errorMsg) {
      dispatch(
        addToast({
          content: response.errorMsg,
          variant: 'error',
        })
      )
    }

    dispatch(updateLobby(response))
  }

  const handleCancelQueue = () => handleQueue('cancel')
  const handleStartQueue = () => handleQueue('start')

  useEffect(() => {
    const userToken = StorageService.get('token')
    const fetch = async () => {
      const response = await LobbiesAPI.detail(userToken, user.lobby_id)
      setFetching(false)
      if (response.errorMsg) navigate('/404')
      else dispatch(initLobby(response))
    }

    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return fetching ? (
    <LoadingBackdrop>
      <Loading />
    </LoadingBackdrop>
  ) : (
    <MainLayout>
      <Container className={style.container} column gap={40} align="center">
        <Container className={style.header} gap={12} fitContent>
          <Icon as={JoystickIcon} color="white" fontSize={30} />
          <Container gap={8}>
            <Text fontSize={22} fontWeight="light" textTransform="uppercase">
              Suba de nível e
            </Text>
            <Text fontSize={22} fontWeight="semibold" textTransform="uppercase">
              fique entre os melhores
            </Text>
          </Container>
        </Container>

        {/*
          TODO: move the following into its own component when
          we have more then one game mode available
        */}
        <Container className={style.gameType} fitContent>
          <Container
            className={style.gameTypeItem}
            justify="center"
            gap={12}
            align="center"
          >
            <Text fontSize={18}>Ranqueada 1x1</Text>
            <Badge>Em breve</Badge>
          </Container>

          <Container
            className={[style.gameTypeItem, style.active].join(' ')}
            justify="center"
            gap={12}
            align="center"
          >
            <Container className={style.arrowUpIcon} justify="center">
              <Icon as={ArrowUpFilledIcon} color="primary.400" />
            </Container>
            <Text fontSize={18}>Ranqueada 5x5</Text>
          </Container>

          <Container
            className={style.gameTypeItem}
            justify="center"
            gap={12}
            align="center"
          >
            <Text fontSize={18}>Personalizada</Text>
            <Badge>Em breve</Badge>
          </Container>
        </Container>

        <Container className={style.lineup}>
          <LobbyLineup
            userPlayer={userPlayer}
            isOwner={lobby.owner_id === user.id}
            otherPlayers={otherPlayers}
            lobbyId={lobby.id}
          />
        </Container>
        <Container className={style.footer} fitContent>
          <LobbyPlayButton
            queueTime={lobby.queue_time === 0 ? 1 : lobby.queue_time}
            countdown={lobby.restriction_countdown}
            onClick={lobby.queue_time ? handleCancelQueue : handleStartQueue}
          />
        </Container>
      </Container>
    </MainLayout>
  )
}
