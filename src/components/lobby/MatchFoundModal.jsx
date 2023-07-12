import { Button, Icon, Text } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'

import { PreMatchesAPI } from '@api'
import { Container, Modal, Timer, UserIcon } from '@components'
import { StorageService } from '@services'
import { addToast } from '@slices/AppSlice'

import style from './MatchFoundModal.module.css'

export default function MatchFoundModal({ isOpen, setIsOpen, preMatch }) {
  const dispatch = useDispatch()

  const handleClose = () => {
    setIsOpen(false)
  }

  const playersLeft = preMatch
    ? preMatch.players_total - preMatch.players_ready_count
    : 0

  const handleAccept = async () => {
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

  return (
    <Modal
      isCentered
      title="PARTIDA ENCONTRADA"
      isOpen={isOpen}
      onClose={handleClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      headerMarginBottom={12}
      maxWidthModal="650px"
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
            isDisabled={preMatch && preMatch.user_ready}
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
            {preMatch && (
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
