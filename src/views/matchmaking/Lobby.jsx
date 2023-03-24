import { Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'

import {
  CloseIcon,
  Container,
  InviteModal,
  LobbyLineup,
  LobbyModeSelector,
  MatchFoundModal,
  Timer,
} from '@components'
import { MainLayout } from '@layouts'
import { HttpService, StorageService, Toast } from '@services'
import { removeRestartQueue } from '@slices/UserSlice'

import { useEffect, useState } from 'react'
import style from './Lobby.module.css'

export default function LobbyView() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const preMatch = useSelector((state) => state.match.preMatch)
  const [inviteModalVisible, setInviteModalVisible] = useState(false)

  useEffect(() => {
    const lockIn = async () => {
      const token = StorageService.get('token')
      let response

      response = await HttpService.patch(
        `mm/match/${preMatch.id}/player-lock-in/`,
        token
      )

      if (response && response.errorMsg) {
        Toast({
          title: 'Oops, ocorreu um erro',
          description: response.errorMsg,
          status: 'error',
        })
      }
    }

    if (preMatch && preMatch.countdown === null) lockIn()
  }, [preMatch])

  useEffect(() => {
    const restartQueue = async () => {
      const token = StorageService.get('token')
      let response

      response = await HttpService.patch(
        `mm/lobby/${lobby.id}/start-queue/`,
        token
      )
      if (response && response.errorMsg) {
        Toast({
          title: 'Oops, ocorreu um erro',
          description: response.errorMsg,
          status: 'error',
        })
      }
    }

    if (user.account.lobby && user.account.lobby.restart) {
      restartQueue()
      dispatch(removeRestartQueue())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const lobby = user && user.account.lobby
  const userPlayer = lobby.players.filter((player) => player.id === user.id)[0]
  const owner = lobby.players.filter(
    (player) => player.id === lobby.owner_id
  )[0]
  const isOwner = userPlayer.id === owner.id
  console.log(owner, isOwner, preMatch)

  const handleQueue = async (action) => {
    if (!isOwner) return

    const token = StorageService.get('token')
    let response

    response = await HttpService.patch(
      `mm/lobby/${lobby.id}/${action}-queue/`,
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
  const handleCancelQueue = () => handleQueue('cancel')
  const handleStartQueue = () => handleQueue('start')
  const handleInviteModalShow = () => setInviteModalVisible(true)
  const handleInviteModalClose = () => setInviteModalVisible(false)

  return (
    <MainLayout>
      <InviteModal
        isOpen={inviteModalVisible}
        onClose={handleInviteModalClose}
      />

      {preMatch && preMatch.state === 'lock_in' && (
        <MatchFoundModal preMatch={preMatch} />
      )}

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
          <LobbyLineup
            lobby={lobby}
            onSeatClick={handleInviteModalShow}
            user={user}
            owner={owner}
            userPlayer={userPlayer}
          />
        </Container>

        <Container
          align="center"
          justify="center"
          column
          fitContent
          className={style.actionBtns}
        >
          {!lobby.queue && (
            <Button
              onClick={handleStartQueue}
              size="xl"
              isDisabled={!isOwner || preMatch}
            >
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
                <Timer initialTime={lobby.queue_time} stop={preMatch} />
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
