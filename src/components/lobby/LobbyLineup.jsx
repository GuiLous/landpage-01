import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { LobbiesAPI } from '@api'
import {
  Container,
  LobbyPlayButton,
  LobbyPlayerCard,
  LobbySeat,
} from '@components'
import { StorageService } from '@services'
import { addToast, toggleFriendList } from '@slices/AppSlice'

import { useMediaQuery } from '@chakra-ui/react'

import style from './LobbyLineup.module.css'

export default function LobbyLineup({
  userPlayer,
  otherPlayers = [],
  maxPlayers = 5,
  lobby,
  match,
  preMatch,
}) {
  const [isLessThan2xl] = useMediaQuery('(max-width: 1600px)')

  const [lineup, setLineup] = useState([])
  const dispatch = useDispatch()

  const userToken = StorageService.get('token')

  const isOwner = lobby.owner_id === userPlayer.user_id

  const isInMatch = match && match.status !== 'cancelled'

  const handleQueue = async (action) => {
    if (lobby.restriction_countdown || lobby.restriction_countdown === 0) return

    if (preMatch || isInMatch) return

    if (action === 'start' && !isOwner) return

    const userToken = StorageService.get('token')

    let response = null

    if (action === 'start') {
      response = await LobbiesAPI.startQueue(userToken, lobby.id)
    } else {
      response = await LobbiesAPI.cancelQueue(userToken, lobby.id)
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

  const handleRemove = async (player) => {
    if (lobby.queue) return

    const response = await LobbiesAPI.removePlayer(
      userToken,
      lobby.id,
      player.user_id
    )

    if (response.errorMsg) {
      dispatch(addToast({ variant: 'error', content: response.errorMsg }))
    }
  }

  const renderCloseLabel = (player) => {
    if (otherPlayers.length < 1) return null
    else if (player?.user_id === userPlayer?.user_id) return 'Sair'
    else if (isOwner) return 'Expulsar'
    else return null
  }

  const renderCloseButton = (player) => {
    if (otherPlayers.length < 1) return false
    else if (player?.user_id === userPlayer?.user_id || isOwner)
      return () => handleRemove(player)
    else return false
  }

  const renderPlayerCard = (player) => {
    const closeButton = renderCloseButton(player)
    const closeLabel = renderCloseLabel(player)
    return (
      <LobbyPlayerCard
        player={player}
        onClose={!lobby.queue && closeButton}
        closeLabel={closeLabel}
        isLobbyOwner={player.user_id === lobby.id}
      />
    )
  }

  const handleSeatClick = () => {
    dispatch(toggleFriendList(true))
  }

  useEffect(() => {
    if (!userPlayer) return

    const lineupList = Array.from(Array(maxPlayers).keys()).map(() => null)
    const fillOrder = [1, 3, 0, 4]
    lineupList[2] = userPlayer

    for (let index = 0; index < otherPlayers.length; index++) {
      const player = otherPlayers[index]
      lineupList[fillOrder[index]] = player
    }

    setLineup(lineupList)
  }, [maxPlayers, otherPlayers, userPlayer])

  return (
    userPlayer && (
      <Container
        className={style.container}
        gap={isLessThan2xl ? 14 : 18}
        align="center"
      >
        {lineup.map((player, index) => (
          <Container
            key={player ? player.user_id : `seat-${index}`}
            align="center"
            column
            gap={isLessThan2xl ? 28 : 40}
            style={{ height: index === 2 ? '100%' : '95%' }}
          >
            {player ? (
              renderPlayerCard(player)
            ) : (
              <Container onClick={handleSeatClick} style={{ height: '100%' }}>
                <LobbySeat />
              </Container>
            )}

            {index === 2 ? (
              <LobbyPlayButton
                queueTime={lobby.queue && lobby.queue_time}
                restrictionCountdown={lobby.restriction_countdown}
                restricted={lobby.restriction_countdown}
                disabled={(!isOwner && !lobby.queue) || preMatch || isInMatch}
                onClick={
                  lobby.queue_time !== null
                    ? handleCancelQueue
                    : handleStartQueue
                }
              />
            ) : (
              <Container className={style.hiddenBox} />
            )}
          </Container>
        ))}
      </Container>
    )
  )
}
