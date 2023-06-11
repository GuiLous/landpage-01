import { Button, Icon, Text } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'

import {
  BlockIcon,
  CloseIcon,
  Container,
  LobbyLineup,
  LobbyModeSelector,
  MatchFoundModal,
  Timer,
} from '@components'
import { MainLayout } from '@layouts'
import { HttpService, StorageService } from '@services'
import { addToast, toggleFriendList } from '@slices/AppSlice'
import { removeRestartQueue } from '@slices/UserSlice'

import { useEffect, useRef, useState } from 'react'
import style from './Lobby.module.css'

export default function LobbyView() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const preMatch = useSelector((state) => state.match.preMatch)
  const match = useSelector((state) => state.match.match)

  const buttonRef = useRef()

  const [isButtonHovered, setIsButtonHovered] = useState(false)

  const lobby = user && user.account.lobby

  const userPlayer = lobby.players.filter(
    (player) => player.user_id === user.id
  )[0]
  const owner = lobby.players.filter(
    (player) => player.user_id === lobby.owner_id
  )[0]
  const isOwner = userPlayer.id === owner.id

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
  const handleToggleFriendList = () => dispatch(toggleFriendList(true))

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
            size="xl"
            borderRadius={8}
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
                <CloseIcon style={{ marginBottom: '2px' }} />
              ) : null
            }
            borderRadius={8}
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
              w="65px"
              display={isButtonHovered ? 'none' : 'flex'}
              fontSize={28}
              fontWeight="bold"
            >
              <Timer initialTime={lobby.queue_time} stop={preMatch} />
            </Text>
          </Button>
        )}

        {match && (
          <Button
            fontWeight="bold"
            size="xl"
            variant="queue"
            letterSpacing={0}
            borderRadius={8}
          >
            EM PARTIDA
          </Button>
        )}

        {showRestrictedButton && (
          <Button size="xl" borderRadius={8} variant="restricted" isDisabled>
            <Container column align="center" gap={4}>
              <Text
                fontSize={14}
                color="white"
                fontWeight="semiBold"
                letterSpacing={0}
              >
                GRUPO COM RESTRIÇÃO
              </Text>

              <Container justify="center" align="center" gap={4}>
                <Icon as={BlockIcon} fill="white" w="16px" h="16px" mb="2px" />
                <Text
                  fontSize={18}
                  fontWeight="bold"
                  w="45px"
                  lineHeight={1}
                  display="flex"
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
            onSeatClick={handleToggleFriendList}
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
