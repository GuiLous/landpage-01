import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Container, LobbySeat, UserCard, UserCardMini } from '@components'
import { HttpService, StorageService } from '@services'
import { addToast } from '@slices/ToastSlice'

import style from './LobbyLineup.module.css'

export default function LobbyLineup({ lobby, onSeatClick, owner, userPlayer }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [lineup, setLineup] = useState([])

  useEffect(() => {
    renderLineup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lobby])

  const isOwner = userPlayer.id === owner.id
  const otherPlayers = lobby.players.filter((player) => player.id !== user.id)

  const handleLeave = async () => {
    const token = StorageService.get('token')
    const response = await HttpService.patch('mm/lobby/leave', token)
    if (response.errorMsg) {
      dispatch(
        addToast({
          title: 'Algo saiu errado...',
          content: response.errorMsg,
          variant: 'error',
        })
      )
    }
  }

  const handleKick = async (user) => {
    const token = StorageService.get('token')
    let response

    response = await HttpService.patch(
      `mm/lobby/${lobby.id}/remove-player/${user.id}/`,
      token
    )
    if (response.errorMsg) {
      dispatch(
        addToast({
          title: 'Algo saiu errado...',
          content: response.errorMsg,
          variant: 'error',
        })
      )
    }
  }

  const renderLineup = () => {
    let lineup = []

    if (lobby.max_players === 5) {
      const fillOrder = [1, 3, 0, 4]

      lineup = [
        <Container
          align="center"
          justify="center"
          key={`5-pos0`}
          className={style.seat}
          style={{ maxHeight: '95%' }}
          onClick={onSeatClick}
        >
          <LobbySeat />
        </Container>,
        <Container
          align="center"
          justify="center"
          key={`5-pos1`}
          className={style.seat}
          style={{ maxHeight: '95%' }}
          onClick={onSeatClick}
        >
          <LobbySeat />
        </Container>,
        <Container
          align="center"
          justify="center"
          key={`5-pos2`}
          className={style.seat}
        >
          <UserCard
            {...userPlayer}
            onLeave={handleLeave}
            showLeave={lobby.players_count > 1 && !lobby.queue}
          />
        </Container>,
        <Container
          align="center"
          justify="center"
          key={`5-pos3`}
          className={style.seat}
          style={{ maxHeight: '95%' }}
          onClick={onSeatClick}
        >
          <LobbySeat />
        </Container>,
        <Container
          align="center"
          justify="center"
          key={`5-pos4`}
          className={style.seat}
          style={{ maxHeight: '95%' }}
          onClick={onSeatClick}
        >
          <LobbySeat />
        </Container>,
      ]

      for (let i = 0; i < otherPlayers.length; i++) {
        lineup[fillOrder[i]] = (
          <Container
            align="center"
            justify="center"
            key={`5-${otherPlayers[i].id}`}
            className={style.seat}
            style={{ maxHeight: '95%' }}
            column
          >
            <UserCard
              {...otherPlayers[i]}
              showLeave={isOwner && lobby.players_count > 1 && !lobby.queue}
              onLeave={() => handleKick(otherPlayers[i])}
            />
          </Container>
        )
      }
    } else if (lobby.max_players === 1) {
      lineup = [
        <Container
          align="center"
          justify="center"
          key="pos0"
          className={style.seat}
          style={{ maxHeight: '95%' }}
        >
          <LobbySeat disabled />
        </Container>,
        <Container
          align="center"
          justify="center"
          key="pos1"
          className={style.seat}
          style={{ maxHeight: '95%' }}
        >
          <LobbySeat disabled />
        </Container>,
        <Container
          align="center"
          justify="center"
          key="pos2"
          className={style.seat}
        >
          <UserCard
            {...owner}
            onLeave={handleLeave}
            showLeave={lobby.players_count > 1 && !lobby.queue}
          />
        </Container>,
        <Container
          align="center"
          justify="center"
          key="pos3"
          className={style.seat}
          style={{ maxHeight: '95%' }}
        >
          <LobbySeat disabled />
        </Container>,
        <Container
          align="center"
          justify="center"
          key="pos4"
          className={style.seat}
          style={{ maxHeight: '95%' }}
        >
          <LobbySeat disabled />
        </Container>,
      ]
    } else if (lobby.max_players === 20) {
      lineup = Array.from(Array(20)).map((el, idx) => {
        if (idx === 0)
          return (
            <Container key={`20-pos0`} className={style.customSeat}>
              <UserCardMini
                {...userPlayer}
                onLeave={handleLeave}
                showLeave={lobby.players_count > 1 && !lobby.queue}
              />
            </Container>
          )
        else {
          if (typeof otherPlayers[idx - 1] !== 'undefined') {
            return (
              <Container key={`20-pos${idx}`} className={style.customSeat}>
                <UserCardMini
                  {...otherPlayers[idx - 1]}
                  showLeave={isOwner && lobby.players_count > 1}
                  onLeave={() => handleKick(otherPlayers[idx - 1])}
                />
              </Container>
            )
          } else {
            return (
              <Container
                key={`20-pos${idx}`}
                className={style.customSeat}
                onClick={onSeatClick}
              >
                <LobbySeat mini />
              </Container>
            )
          }
        }
      })
    }

    setLineup(lineup)
  }

  return lineup
}
