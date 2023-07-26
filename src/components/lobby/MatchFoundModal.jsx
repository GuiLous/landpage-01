import { Button, Icon, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { PreMatchesAPI } from '@api'
import { Container, Modal, Timer, UserIcon } from '@components'
import { StorageService } from '@services'
import { addToast } from '@slices/AppSlice'

import style from './MatchFoundModal.module.css'

export default function MatchFoundModal({ isOpen, preMatch }) {
  const dispatch = useDispatch()

  const [timeExpired, setTimeExpired] = useState(false)

  const gapTimeout = 3000
  const timeOutMultiplier = 1000

  const playersLeft = preMatch
    ? preMatch.players_total - preMatch.players_ready_count
    : 0

  const handleAccept = async () => {
    if (timeExpired) return

    const userToken = StorageService.get('token')
    let response = null

    response = await PreMatchesAPI.playerReady(userToken)

    if (response.errorMsg) {
      dispatch(
        addToast({
          content: response.errorMsg,
          variant: 'error',
        })
      )
    }
  }

  const renderPlayers = Array(preMatch && preMatch.players_total)
    .fill()
    .map((x, i) => (
      <Container fitContent className={style.userIcon} key={i}>
        <Icon
          data-testid="user-icon"
          as={UserIcon}
          style={{ fontSize: '28px', opacity: i < playersLeft ? 0.5 : 1 }}
        />
      </Container>
    ))
    .reverse()

  useEffect(() => {
    let timeoutId

    if (preMatch?.countdown) {
      timeoutId = setTimeout(() => {
        setTimeExpired(true)
      }, preMatch.countdown * timeOutMultiplier + gapTimeout)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [preMatch?.countdown])

  useEffect(() => {
    if (!isOpen) {
      setTimeExpired(false)
    }
  }, [isOpen])

  return (
    <Modal
      isCentered
      title="PARTIDA ENCONTRADA"
      isOpen={isOpen}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      headerMarginBottom={12}
      maxWidthModal="650px"
      showCloseButton={false}
    >
      <Container justify="center" align="center" column gap={40}>
        <Text color="cyan.400" fontSize={14} textAlign="center">
          Ranqueada · 5x5
        </Text>

        <Container justify="center" gap={12}>
          {renderPlayers}
        </Container>

        <Container align="center" justify="center" column>
          <Button
            isDisabled={(preMatch && preMatch.user_ready) || timeExpired}
            onClick={handleAccept}
          >
            {preMatch && preMatch.user_ready
              ? 'Você está pronto!'
              : 'Aceitar partida'}
          </Button>

          <Container
            justify="center"
            style={{ marginTop: '14px' }}
            testID="countdown-timer"
          >
            {preMatch && preMatch.countdown <= 0
              ? '00:00'
              : preMatch &&
                preMatch.countdown && (
                  <Timer
                    reverse
                    formatted={true}
                    initialTime={preMatch.countdown}
                  />
                )}
          </Container>
        </Container>
      </Container>
    </Modal>
  )
}
