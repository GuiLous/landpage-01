import { Button, Icon } from '@chakra-ui/react'
import { AiFillCaretUp } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'

import {
  Container,
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

  // Uncomment to allow public and private lobbies
  // const handleToggleVisibilty = async () => {
  //   const token = StorageService.get('token')
  //   const endpoint = lobby.is_public ? 'set-private' : 'set-public'
  //   let response

  //   response = await HttpService.patch(
  //     `mm/lobby/${lobby.id}/${endpoint}/`,
  //     token
  //   )
  //   if (response.errorMsg) {
  //     Toast({
  //       title: 'Oops, ocorreu um erro',
  //       description: response.errorMsg,
  //       status: 'error',
  //     })
  //   }
  // }

  const handleToggleMode = async (lobbyType, lobbyMode) => {
    if (lobby.players_count > 1) return

    const token = StorageService.get('token')
    let response

    response = await HttpService.patch(
      `mm/lobby/${lobby.id}/change-type/${lobbyType}/change-mode/${lobbyMode}`,
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
      console.log(lineup)
      const fillOrder = [1, 3, 0, 4]

      lineup = [
        <Container
          align="center"
          justify="center"
          key={`5-pos0`}
          className={style.lobbySeat}
          style={{ maxHeight: '95%' }}
        >
          <LobbySeat />
        </Container>,
        <Container
          align="center"
          justify="center"
          key={`5-pos1`}
          className={style.lobbySeat}
          style={{ maxHeight: '95%' }}
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
            showLeave={lobby.players_count > 1}
          />
        </Container>,
        <Container
          align="center"
          justify="center"
          key={`5-pos3`}
          className={style.lobbySeat}
          style={{ maxHeight: '95%' }}
        >
          <LobbySeat />
        </Container>,
        <Container
          align="center"
          justify="center"
          key={`5-pos4`}
          className={style.lobbySeat}
          style={{ maxHeight: '95%' }}
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
              showLeave={isOwner && lobby.players_count > 1}
              onLeave={() => handleKick(nonOwners[i])}
            />
          </Container>
        )
      }
    } else if (lobby.max_players === 1) {
      console.log(lineup)
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
            showLeave={lobby.players_count > 1}
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
        <Container key={`20-pos${idx}`} className={style.lobbyCustomSeat}>
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
      <Container column className={style.container}>
        {/* <Container fitContent align="center">
          <Container className={style.header} column>
            <Container style={{ fontSize: 24 }}>Selecione um</Container>
            <Container
              style={{ fontSize: 32, fontWeight: 'bold', marginTop: '-8px' }}
            >
              modo de jogo
            </Container>
          </Container>

          {lobby.max_players === 5 && (
            <Container className={style.groupType} gap={14} fitContent>
              <Container style={{ whiteSpace: 'nowrap', minWidth: '106px' }}>
                <Icon
                  style={{
                    fontSize: '22px',
                    top: '-1px',
                    opacity: lobby.is_public ? '1' : '.7',
                    position: 'relative',
                    marginRight: '8px',
                  }}
                  as={lobby.is_public ? AiFillUnlock : AiFillLock}
                />
                <Text
                  style={{
                    width: '106px',
                    opacity: lobby.is_public ? '1' : '.7',
                  }}
                >
                  Grupo {lobby.is_public ? 'aberto' : 'fechado'}
                </Text>
              </Container>
              <Container fitContent>
                <Switch
                  id="groupType"
                  defaultChecked={lobby.is_public}
                  onChange={handleToggleVisibilty}
                />
              </Container>
            </Container>
          )}
        </Container> */}

        <Container
          className={[
            style.typeSelection,
            lobby.players_count > 1 && style.disabled,
          ].join(' ')}
          align="center"
          justify="between"
          fitContent
        >
          <Container
            justify="center"
            className={[
              style.lobbyMode,
              lobby.mode === 1 && style.activeMode,
            ].join(' ')}
            onClick={() => {
              handleToggleMode('competitive', 1)
            }}
          >
            Ranked 1x1
            <Container
              className={style.modeActiveCaret}
              align="center"
              justify="center"
            >
              <Icon as={AiFillCaretUp} />
            </Container>
          </Container>

          <Container
            justify="center"
            className={[
              style.lobbyMode,
              lobby.mode === 5 && style.activeMode,
            ].join(' ')}
            onClick={() => {
              handleToggleMode('competitive', 5)
            }}
          >
            Ranked 5x5
            <Container
              className={style.modeActiveCaret}
              align="center"
              justify="center"
            >
              <Icon as={AiFillCaretUp} />
            </Container>
          </Container>

          <Container
            justify="center"
            className={[
              style.lobbyMode,
              lobby.mode === 20 && style.activeMode,
            ].join(' ')}
            onClick={() => {
              handleToggleMode('custom', 20)
            }}
          >
            Personalizada
            <Container
              className={style.modeActiveCaret}
              align="center"
              justify="center"
            >
              <Icon as={AiFillCaretUp} />
            </Container>
          </Container>
        </Container>

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
              <Container column align="center">
                <Timer initialTime={lobby.queue_time} />
                <p>X Cancelar</p>
              </Container>
            </Button>
          )}
        </Container>
      </Container>
    </MainLayout>
  )
}
