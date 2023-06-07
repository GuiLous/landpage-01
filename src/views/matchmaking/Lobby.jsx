import { Button, Icon, Text } from '@chakra-ui/react'
import { FaPlay } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

import {
  BlockIcon,
  ClockIcon,
  CloseIcon,
  Container,
  InviteModal,
  JoystickIcon,
  LobbyLineup,
  LobbyModeSelector,
  MatchFoundModal,
  Timer,
} from '@components'
import { MainLayout } from '@layouts'
import { HttpService, StorageService } from '@services'
import { addToast } from '@slices/ToastSlice'
import { removeRestartQueue } from '@slices/UserSlice'

import { useEffect, useRef, useState } from 'react'
import style from './Lobby.module.css'

export default function LobbyView() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const preMatch = useSelector((state) => state.match.preMatch)
  const match = useSelector((state) => state.match.match)

  const buttonRef = useRef()

  const [inviteModalVisible, setInviteModalVisible] = useState(false)
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  const lobby = user && user.account.lobby

  const userPlayer = lobby.players.filter((player) => player.id === user.id)[0]
  const owner = lobby.players.filter(
    (player) => player.id === lobby.owner_id
  )[0]
  const isOwner = userPlayer.id === owner.id
  const is1v1 = lobby.max_players === 1

  const handleQueue = async (action) => {
    if (!isOwner || preMatch || match) return

    const token = StorageService.get('token')
    let response

    response = await HttpService.patch(
      `mm/lobby/${lobby.id}/${action}-queue/`,
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
  const handleCancelQueue = () => handleQueue('cancel')
  const handleStartQueue = () => {
    setIsButtonHovered(false)
    handleQueue('start')
  }
  const handleInviteModalShow = () => setInviteModalVisible(true)
  const handleInviteModalClose = () => setInviteModalVisible(false)

  const renderButtons = () => {
    const showPlayButton =
      !lobby.queue && !match && !lobby.restriction_countdown

    const showQueueButton =
      lobby.queue && !match && !lobby.restriction_countdown

    const showRestrictedButton = lobby.restriction_countdown && !match

    return (
      <>
        {showPlayButton && (
          <Button
            leftIcon={<FaPlay />}
            size="xl"
            onClick={handleStartQueue}
            isDisabled={!isOwner || preMatch || match}
          >
            Jogar
          </Button>
        )}

        {showQueueButton && (
          <Button
            ref={buttonRef}
            leftIcon={
              isButtonHovered ? (
                <CloseIcon />
              ) : (
                <ClockIcon
                  width="26px"
                  height="26px"
                  style={{ marginBottom: '2px' }}
                />
              )
            }
            fontWeight="bold"
            size="xl"
            fontSize={20}
            onClick={isButtonHovered ? handleCancelQueue : null}
            variant={isButtonHovered ? 'restricted' : 'queue'}
          >
            <Text
              fontSize={26}
              fontWeight="bold"
              color="white"
              letterSpacing={0}
              lineHeight={1}
              display={isButtonHovered ? 'initial' : 'none'}
            >
              CANCELAR
            </Text>

            <Text
              w="70px"
              display={isButtonHovered ? 'none' : 'initial'}
              fontSize={28}
              fontWeight="bold"
            >
              <Timer initialTime={lobby.queue_time} stop={preMatch} />
            </Text>
          </Button>
        )}

        {match && (
          <Button
            leftIcon={<JoystickIcon />}
            fontWeight="bold"
            size="xl"
            variant="queue"
          >
            EM PARTIDA
          </Button>
        )}

        {showRestrictedButton && (
          <Button size="xl" variant="restricted" isDisabled>
            <Container column align="center" gap={4}>
              <Text fontSize={12} color="white" fontWeight="semiBold">
                GRUPO COM RESTRIÇÃO
              </Text>

              <Container justify="center" align="center" gap={4}>
                <Icon as={BlockIcon} fill="white" w="24px" h="24px" />
                <Text
                  fontSize={28}
                  fontWeight="bold"
                  w="65px"
                  mt="2px"
                  lineHeight={1}
                  as="span"
                >
                  <Timer initialTime={lobby.restriction_countdown} reverse />
                </Text>
              </Container>
            </Container>
          </Button>
        )}
      </>
    )
  }

  useEffect(() => {
    const lockIn = async () => {
      const token = StorageService.get('token')
      let response

      response = await HttpService.patch(
        `mm/match/${preMatch.id}/player-lock-in/`,
        token
      )

      if (response && response.errorMsg) {
        dispatch(
          addToast({
            title: 'Algo saiu errado...',
            content: response.errorMsg,
            variant: 'error',
          })
        )
      }
    }

    if (preMatch && preMatch.countdown === null) lockIn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        dispatch(
          addToast({
            title: 'Algo saiu errado...',
            content: response.errorMsg,
            variant: 'error',
          })
        )
      }
    }

    if (user.account.lobby && user.account.lobby.restart) {
      restartQueue()
      dispatch(removeRestartQueue())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    if (buttonRef.current) {
      const button = buttonRef.current

      const handleMouseEnter = () => {
        setIsButtonHovered(true)
      }

      const handleMouseLeave = () => {
        setIsButtonHovered(false)
      }

      button.addEventListener('mouseenter', handleMouseEnter)
      button.addEventListener('mouseleave', handleMouseLeave)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonRef.current, lobby.queue])

  return (
    <MainLayout>
      {!is1v1 && (
        <InviteModal
          isOpen={inviteModalVisible}
          onClose={handleInviteModalClose}
        />
      )}

      {preMatch && preMatch.state === 'lock_in' && (
        <MatchFoundModal preMatch={preMatch} />
      )}

      <Container column className={style.container}>
        <LobbyModeSelector lobby={lobby} disabled={match || preMatch} />

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
          {renderButtons()}
        </Container>
      </Container>
    </MainLayout>
  )
}
