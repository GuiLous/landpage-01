import { Button, Link, Switch } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'

import { Container, Timer, UserCard } from '@components'
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

  const renderLineup = () => {
    let lineup = []

    if (lobby.max_players === 5) {
      const fillOrder = [1, 3, 0, 4]

      lineup = [
        <Container align="center" justify="center" key="pos0">
          Vazio
        </Container>,
        <Container align="center" justify="center" key="pos1">
          Vazio
        </Container>,
        <Container align="center" justify="center" key="pos2">
          <UserCard {...owner} />
        </Container>,
        <Container align="center" justify="center" key="pos3">
          Vazio
        </Container>,
        <Container align="center" justify="center" key="pos4">
          Vazio
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
        <Container align="center" justify="center" key="pos2">
          <UserCard {...owner} />
        </Container>,
      ]
    }

    return lineup
  }

  return (
    <MainLayout>
      <Container column className={style.container}>
        <Container>
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
        >
          <Link variant="active">Ranked 5x5</Link>
          <Link>Ranked 1x1</Link>
        </Container>

        <Container align="center" justify="between">
          {renderLineup()}
        </Container>

        <Container
          align="center"
          justify="center"
          column
          style={{ marginTop: 200 }}
        >
          {!lobby.queue && (
            <>
              <Button onClick={handleStartQueue}>Procurar partida</Button>
              <Link onClick={handleLeave}>Sair</Link>
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
