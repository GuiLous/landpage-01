import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { LobbiesAPI } from '@api'
import { Container, LobbyPlayerCard, LobbySeat } from '@components'
import { StorageService } from '@services'
import { addToast, toggleFriendList } from '@slices/AppSlice'
import { updateLobby } from '@slices/LobbySlice'

import style from './LobbyLineup.module.css'

export default function LobbyLineup({
  userPlayer,
  isOwner,
  lobbyId,
  otherPlayers = [],
  maxPlayers = 5,
}) {
  const [lineup, setLineup] = useState([])

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

  const dispatch = useDispatch()
  const userToken = StorageService.get('token')

  const handleRemove = async (player) => {
    const response = await LobbiesAPI.removePlayer(
      userToken,
      lobbyId,
      player.user_id
    )

    if (response.errorMsg) {
      dispatch(addToast({ variant: 'error', content: response.errorMsg }))
    }

    if (response.id === userPlayer.lobby_id) {
      dispatch(updateLobby(response))
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
        onClose={closeButton}
        closeLabel={closeLabel}
      />
    )
  }

  const handleSeatClick = () => {
    dispatch(toggleFriendList(true))
  }

  return (
    userPlayer && (
      <Container className={style.container} gap={18} align="center">
        {lineup.map((player, index) => (
          <Container
            key={player ? player.user_id : `seat-${index}`}
            style={{ height: index === 2 ? '100%' : '95%' }}
          >
            {player ? (
              renderPlayerCard(player)
            ) : (
              <Container onClick={handleSeatClick} style={{ height: '100%' }}>
                <LobbySeat />
              </Container>
            )}
          </Container>
        ))}
      </Container>
    )
  )
}
