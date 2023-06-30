import { Badge, Icon, Text } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { LobbiesAPI, PreMatchesAPI } from '@api'
import {
  ArrowUpFilledIcon,
  Container,
  JoystickIcon,
  LobbyLineup,
  LobbyPlayButton,
  MatchFoundModal,
} from '@components'
import { StorageService } from '@services'
import { addToast } from '@slices/AppSlice'
import { removeRestartQueue } from '@slices/LobbySlice'

import style from './LobbyView.module.css'

export default function LobbyView() {
  const user = useSelector((state) => state.user)
  const lobby = useSelector((state) => state.lobby)
  const preMatch = useSelector((state) => state.preMatch)
  const match = useSelector((state) => state.match)

  const dispatch = useDispatch()

  const [secondsDiff, setSecondsDiff] = useState(null)
  const [openMatchFoundModal, setOpenMatchFoundModal] = useState(false)

  const isOwner = lobby.owner_id === user.id
  const userPlayer = lobby.players?.find((player) => player.user_id === user.id)
  const otherPlayers = lobby.players?.filter(
    (player) => player.user_id !== user.id
  )

  const handleQueue = async (action) => {
    if (preMatch || match) return

    if (action === 'start' && !isOwner) return

    const userToken = StorageService.get('token')

    let response = null

    if (action === 'start') {
      response = await LobbiesAPI.startQueue(userToken, lobby.id)
    } else {
      response = await LobbiesAPI.cancelQueue(userToken, lobby.id)
      setSecondsDiff(null)
    }

    if (response.errorMsg) {
      dispatch(
        addToast({
          content: response.errorMsg,
          variant: 'error',
        })
      )
    }
  }

  const handleCancelQueue = () => handleQueue('cancel')
  const handleStartQueue = () => handleQueue('start')

  useEffect(() => {
    const lockIn = async () => {
      const userToken = StorageService.get('token')
      let response = null

      response = await PreMatchesAPI.playerLockIn(userToken, preMatch.id)

      if (response.errorMsg) {
        dispatch(
          addToast({
            content: response.errorMsg,
            variant: 'error',
          })
        )
      }
    }

    if (preMatch && preMatch.state === 'pre_start') lockIn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preMatch])

  useEffect(() => {
    const restartQueue = async () => {
      const userToken = StorageService.get('token')
      let response

      response = await LobbiesAPI.startQueue(userToken, lobby.id)

      if (response.errorMsg) {
        dispatch(
          addToast({
            content: response.errorMsg,
            variant: 'error',
          })
        )
      }
    }

    if (lobby && lobby.restart) {
      restartQueue()
      dispatch(removeRestartQueue())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lobby])

  useEffect(() => {
    let intervalId

    if (lobby.queue && !preMatch) {
      const date = DateTime.fromISO(lobby.queue)

      const calculateDiffInSeconds = () => {
        const now = DateTime.utc()
        const diff = Math.floor(now.diff(date, 'seconds').seconds)

        setSecondsDiff(diff)
      }

      calculateDiffInSeconds()

      intervalId = setInterval(calculateDiffInSeconds, 1000)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [lobby, preMatch])

  useEffect(() => {
    if (preMatch && preMatch.state === 'lock_in') setOpenMatchFoundModal(true)
    else setOpenMatchFoundModal(false)
  }, [preMatch])

  return (
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
          queue={lobby.queue}
        />
      </Container>

      <Container className={style.footer} fitContent>
        <LobbyPlayButton
          queueTime={lobby.queue && secondsDiff}
          restrictionCountdown={lobby.restriction_countdown}
          restricted={lobby.restriction_countdown}
          disabled={(!isOwner && !lobby.queue) || preMatch || match}
          onClick={
            lobby.queue_time !== null ? handleCancelQueue : handleStartQueue
          }
        />
      </Container>

      <MatchFoundModal
        isOpen={openMatchFoundModal}
        setIsOpen={setOpenMatchFoundModal}
        preMatch={preMatch}
      />
    </Container>
  )
}
