import { Button, Icon, Link, Switch } from '@chakra-ui/react'
import { AiFillCaretUp } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'

import { Container, LobbySeat, Timer, UserCard } from '@components'
import { MainLayout } from '@layouts'
import { HttpService, StorageService, Toast } from '@services'
import { updateUser } from '@slices/UserSlice'

import style from './Lobby.module.css'

export default function LobbyView() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const lobby = user && user.account.lobby
  const owner = lobby.players.filter((player) => player.id === user.id)[0]
  const nonOwners = lobby.players.filter((player) => player.id !== user.id)

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

  const handleToggleVisibilty = async () => {
    const token = StorageService.get('token')
    const endpoint = lobby.is_public ? 'set-private' : 'set-public'
    let response

    response = await HttpService.patch(
      `mm/lobby/${lobby.id}/${endpoint}/`,
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

  const handleToggleMode = async (lobbyType, lobbyMode) => {
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
      const fillOrder = [1, 3, 0, 4]

      lineup = [
        <Container
          align="center"
          justify="center"
          key="pos0"
          className={style.lobbySeat}
        >
          <LobbySeat />
        </Container>,
        <Container
          align="center"
          justify="center"
          key="pos1"
          className={style.lobbySeat}
        >
          <LobbySeat />
        </Container>,
        <Container
          align="center"
          justify="center"
          key="pos2"
          className={style.lobbySeat}
        >
          <UserCard {...owner} />
        </Container>,
        <Container
          align="center"
          justify="center"
          key="pos3"
          className={style.lobbySeat}
        >
          <LobbySeat />
        </Container>,
        <Container
          align="center"
          justify="center"
          key="pos4"
          className={style.lobbySeat}
        >
          <LobbySeat />
        </Container>,
      ]

      for (let i = 0; i < nonOwners.length; i++) {
        lineup[fillOrder[i]] = (
          <Container
            align="center"
            justify="center"
            key={nonOwners[i].id}
            column
          >
            <UserCard {...nonOwners[i]} />
            <Link onClick={() => handleKick(nonOwners[i])}>Remover</Link>
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
        >
          <LobbySeat disabled />
        </Container>,
        <Container
          align="center"
          justify="center"
          key="pos1"
          className={style.lobbySeat}
        >
          <LobbySeat disabled />
        </Container>,
        <Container
          align="center"
          justify="center"
          key="pos2"
          className={style.lobbySeat}
        >
          <UserCard {...owner} />
        </Container>,
        <Container
          align="center"
          justify="center"
          key="pos3"
          className={style.lobbySeat}
        >
          <LobbySeat disabled />
        </Container>,
        <Container
          align="center"
          justify="center"
          key="pos4"
          className={style.lobbySeat}
        >
          <LobbySeat disabled />
        </Container>,
      ]
    } else if (lobby.max_players === 20) {
      lineup = Array.from(Array(20)).map((el, idx) => (
        <Container key={idx} className={style.lobbyCustomSeat}>
          <LobbySeat mini />
        </Container>
      ))

      lineup[0] = <UserCard {...owner} />
    }

    return lineup
  }

  return (
    <MainLayout>
      <Container column className={style.container}>
        <Container fitContent align="center">
          <Container className={style.header} column>
            <Container style={{ fontSize: 24 }}>Selecione um</Container>
            <Container
              style={{ fontSize: 32, fontWeight: 'bold', marginTop: '-8px' }}
            >
              modo de jogo
            </Container>
          </Container>

          <Container className={style.groupType} gap={14} fitContent>
            <Container style={{ whiteSpace: 'nowrap', minWidth: '106px' }}>
              Grupo {lobby.is_public ? 'aberto' : 'fechado'}
            </Container>
            <Container fitContent>
              <Switch
                id="groupType"
                defaultChecked={!lobby.is_public}
                onChange={handleToggleVisibilty}
              />
            </Container>
          </Container>
        </Container>

        <Container
          className={style.typeSelection}
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
          {renderLineup()}
        </Container>

        <Container align="center" justify="center" column fitContent>
          {!lobby.queue && (
            <>
              <Button onClick={handleStartQueue}>Procurar partida</Button>
              {/* <Link onClick={handleLeave}>Sair</Link> */}
            </>
          )}
          {lobby.queue && (
            <Button onClick={handleCancelQueue}>
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
