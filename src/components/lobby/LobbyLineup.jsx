import { useDispatch } from 'react-redux'

import { Container, LobbySeat, UserCard, UserCardMini } from '@components'
import { HttpService, StorageService, Toast } from '@services'
import { updateUser } from '@slices/UserSlice'

import React, { useEffect, useState } from 'react'

import style from './LobbyLineup.module.css'

export default function LobbyLineup({
  lobby,
  onSeatClick,
  user,
  owner,
  userPlayer,
}) {
  const dispatch = useDispatch()
  const [lineup, setLineup] = useState([])

  useEffect(() => {
    renderLineup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lobby])

  const isOwner = userPlayer.id === owner.id
  const nonOwners = lobby.players.filter(
    (player) => player.id !== lobby.owner_id
  )

  const handleLeave = async () => {
    const token = StorageService.get('token')
    const response = await HttpService.patch('mm/lobby/leave', token)
    if (response.errorMsg) {
      Toast({
        title: 'Oops, ocorreu um erro',
        description: response.errorMsg,
        status: 'error',
      })
      return
    }

    dispatch(updateUser(response))
  }

  const handleKick = async (user) => {
    const token = StorageService.get('token')
    let response

    response = await HttpService.patch(
      `mm/lobby/${lobby.id}/remove-player/${user.id}/`,
      token
    )
    if (response.errorMsg) {
      Toast({
        title: 'Oops, ocorreu um erro',
        description: response.errorMsg,
        status: 'error',
      })
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

      for (let i = 0; i < nonOwners.length; i++) {
        lineup[fillOrder[i]] = (
          <Container
            align="center"
            justify="center"
            key={`5-${nonOwners[i].id}`}
            className={style.seat}
            style={{ maxHeight: '95%' }}
            column
          >
            <UserCard
              {...nonOwners[i]}
              showLeave={isOwner && lobby.players_count > 1 && !lobby.queue}
              onLeave={() => handleKick(nonOwners[i])}
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
      lineup = Array.from(Array(20)).map((el, idx) => (
        <Container
          key={`20-pos${idx}`}
          className={style.customSeat}
          onClick={onSeatClick}
        >
          <LobbySeat mini />
        </Container>
      ))

      lineup[0] = (
        <Container key={`20-${user.id}`} className={style.customSeat}>
          <UserCardMini
            {...userPlayer}
            onLeave={handleLeave}
            showLeave={lobby.players_count > 1 && !lobby.queue}
          />
        </Container>
      )

      for (let i = 0; i < nonOwners.length; i++) {
        lineup[i + 1] = (
          <Container key={`20-${nonOwners[i].id}`} className={style.customSeat}>
            <UserCardMini
              {...nonOwners[i]}
              showLeave={isOwner && lobby.players_count > 1}
              onLeave={() => handleKick(nonOwners[i])}
            />
          </Container>
        )
      }
    }

    setLineup(lineup)
  }

  return lineup
}
