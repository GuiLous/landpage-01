import { Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'

import {
  CloseIcon,
  Container,
  InviteModal,
  LobbyModeSelector,
  LobbySeat,
  Timer,
  UserCard,
  UserCardMini,
} from '@components'
import { MainLayout } from '@layouts'
import { HttpService, StorageService, Toast } from '@services'
import { updateUser } from '@slices/UserSlice'

import { useEffect, useState } from 'react'
import style from './Lobby.module.css'

export default function LobbyView() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [lineup, setLineup] = useState([])
  const [inviteModalVisible, setInviteModalVisible] = useState(false)

  const lobby = user && user.account.lobby
  const owner = lobby.players.filter(
    (player) => player.id === lobby.owner_id
  )[0]
  const userPlayer = lobby.players.filter((player) => player.id === user.id)[0]
  const nonOwners = lobby.players.filter(
    (player) => player.id !== lobby.owner_id
  )
  const isOwner = userPlayer.id === owner.id

  useEffect(() => {
    renderLineup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lobby])

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

  const handleCancelQueue = async () => {
    const token = StorageService.get('token')
    let response

    response = await HttpService.patch(
      `mm/lobby/${lobby.id}/cancel-queue/`,
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

  const handleStartQueue = async () => {
    const token = StorageService.get('token')
    let response

    response = await HttpService.patch(
      `mm/lobby/${lobby.id}/start-queue/`,
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

  const handleInviteModalClose = () => {
    setInviteModalVisible(false)
  }

  const handleInviteModalShow = () => {
    setInviteModalVisible(true)
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
          className={style.lobbySeat}
          style={{ maxHeight: '95%' }}
          onClick={handleInviteModalShow}
        >
          <LobbySeat />
        </Container>,
        <Container
          align="center"
          justify="center"
          key={`5-pos1`}
          className={style.lobbySeat}
          style={{ maxHeight: '95%' }}
          onClick={handleInviteModalShow}
        >
          <LobbySeat />
        </Container>,
        <Container
          align="center"
          justify="center"
          key={`5-pos2`}
          className={style.lobbySeat}
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
          className={style.lobbySeat}
          style={{ maxHeight: '95%' }}
          onClick={handleInviteModalShow}
        >
          <LobbySeat />
        </Container>,
        <Container
          align="center"
          justify="center"
          key={`5-pos4`}
          className={style.lobbySeat}
          style={{ maxHeight: '95%' }}
          onClick={handleInviteModalShow}
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
            className={style.lobbySeat}
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
          className={style.lobbySeat}
          style={{ maxHeight: '95%' }}
        >
          <LobbySeat disabled />
        </Container>,
        <Container
          align="center"
          justify="center"
          key="pos1"
          className={style.lobbySeat}
          style={{ maxHeight: '95%' }}
        >
          <LobbySeat disabled />
        </Container>,
        <Container
          align="center"
          justify="center"
          key="pos2"
          className={style.lobbySeat}
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
          className={style.lobbySeat}
          style={{ maxHeight: '95%' }}
        >
          <LobbySeat disabled />
        </Container>,
        <Container
          align="center"
          justify="center"
          key="pos4"
          className={style.lobbySeat}
          style={{ maxHeight: '95%' }}
        >
          <LobbySeat disabled />
        </Container>,
      ]
    } else if (lobby.max_players === 20) {
      lineup = Array.from(Array(20)).map((el, idx) => (
        <Container
          key={`20-pos${idx}`}
          className={style.lobbyCustomSeat}
          onClick={handleInviteModalShow}
        >
          <LobbySeat mini />
        </Container>
      ))

      lineup[0] = (
        <Container key={`20-${user.id}`} className={style.lobbyCustomSeat}>
          <UserCardMini
            {...userPlayer}
            onLeave={handleLeave}
            showLeave={true}
          />
        </Container>
      )

      for (let i = 0; i < nonOwners.length; i++) {
        lineup[i + 1] = (
          <Container
            key={`20-${nonOwners[i].id}`}
            className={style.lobbyCustomSeat}
          >
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

  return (
    <MainLayout>
      <InviteModal
        isOpen={inviteModalVisible}
        onClose={handleInviteModalClose}
      />
      <Container column className={style.container}>
        <LobbyModeSelector lobby={lobby} />

        <Container
          align="center"
          justify="between"
          className={[
            style.lineupWrapper,
            lobby.max_players === 20 && style.lineup20,
          ].join(' ')}
          gap={18}
        >
          {lineup}
        </Container>

        <Container
          align="center"
          justify="center"
          column
          fitContent
          className={style.actionBtns}
        >
          {!lobby.queue && (
            <Button onClick={handleStartQueue} size="xl" disabled={!isOwner}>
              Jogar
            </Button>
          )}
          {lobby.queue && (
            <Button
              onClick={handleCancelQueue}
              className={style.cancelQueueBtn}
              size="xl"
            >
              <Container justify="center">
                <Timer initialTime={lobby.queue_time} />
              </Container>

              <Container justify="end" className={style.cancelQueueBtnIcon}>
                <CloseIcon />
              </Container>
            </Button>
          )}
        </Container>
      </Container>
    </MainLayout>
  )
}
