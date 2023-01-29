import { Button, Link, useToast } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
// import { useStopwatch } from 'react-timer-hook'

import { Container, Timer, UserCard } from '@components'
import { MainLayout } from '@layouts'
import { HttpService, StorageService } from '@services'

import style from './Lobby.module.css'

export default function LobbyView() {
  const user = useSelector((state) => state.user)
  const toast = useToast()
  const lobby = user && user.account.lobby
  const owner = lobby.players.filter((player) => player.id === user.id)[0]
  const nonOwners = lobby.players.filter((player) => player.id !== user.id)
  // const {
  //   seconds,
  //   minutes,
  //   hours,
  //   isRunning,
  //   start,
  //   pause,
  //   reset,
  // } = useStopwatch({ autoStart: true, offsetTimestamp: lobby.queue_time})
  // const elapsed_time = () => {
  //   // let time = lobby.queue_time
  //   if (seconds > 3600) return new Date(seconds * 1000).toISOString().substr(11, 8)
  //   else return (seconds-(seconds%=60))/60+(9<seconds?':':':0')+seconds
  // }

  const handleKick = async (user) => {
    const token = StorageService.get('token')
    let response

    response = await HttpService.patch(
      `mm/lobby/${lobby.id}/remove-player/${user.id}/`,
      token
    )
    if (response.errorMsg) {
      toast({
        title: 'Oops, ocorreu um erro',
        description: response.errorMsg,
        status: 'error',
        isClosable: true,
        position: 'bottom-right',
        duration: 6000,
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

  const handleCancelQueue = async () => {
    const token = StorageService.get('token')
    let response

    response = await HttpService.patch(
      `mm/lobby/${lobby.id}/cancel-queue/`,
      token
    )
    if (response.errorMsg) {
      toast({
        title: 'Oops, ocorreu um erro',
        description: response.errorMsg,
        status: 'error',
        isClosable: true,
        position: 'bottom-right',
        duration: 6000,
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
      toast({
        title: 'Oops, ocorreu um erro',
        description: response.errorMsg,
        status: 'error',
        isClosable: true,
        position: 'bottom-right',
        duration: 6000,
      })
    }
  }

  return (
    <MainLayout>
      <Container column>
        <Container column>
          <h3>Selecione um</h3>
          <h2>modo de jogo</h2>
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
            <Button onClick={handleStartQueue}>Procurar partida</Button>
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
